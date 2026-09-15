/**
 * SAMRUDDHI SETU - MULTI-PAGE APPLICATION CONTROLLER
 * Cross-Page Session Management, Auth Guards, Firestore Sync, Leaflet GPS Maps & Charts
 */

// Shared State & Session Helper
const SamruddhiAuth = {
  getStoredUser() {
    try {
      const u = localStorage.getItem("samruddhi_active_user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },

  setStoredUser(user) {
    if (user) {
      localStorage.setItem("samruddhi_active_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("samruddhi_active_user");
    }
  },

  isLoggedIn() {
    return !!this.getStoredUser();
  },

  logout() {
    // Sign out of Firebase Authentication too, not just the cached local
    // session, so the Auth SDK stops treating this browser as signed in.
    if (window.AgriSetuAuth) {
      window.AgriSetuAuth.signOutUser().catch(() => {});
    }
    this.setStoredUser(null);
    window.location.href = "index.html";
  },

  login(user, redirect = true) {
    this.setStoredUser(user);
    if (redirect) {
      if (user.role === "farmer") window.location.href = "farmer-dashboard.html";
      else if (user.role === "consumer") {
        if (user.subType === "bulk_buyer") window.location.href = "consumer-marketplace.html?mode=bulk";
        else window.location.href = "consumer-marketplace.html";
      }
      else if (user.role === "logistics") window.location.href = "logistics-dashboard.html";
      else if (user.role === "admin") window.location.href = "admin.html";
      else window.location.href = "index.html";
    }
  },

  /**
   * Creates a real Firebase Authentication account (email + password).
   * Firebase stores and hashes the credential itself — the app never
   * writes a password or password hash anywhere. Returns the Firebase
   * Auth `user` object; `user.uid` is the permanent, unique ID to use
   * as that person's Firestore profile document ID.
   * Throws a Firebase Auth error (e.g. auth/email-already-in-use,
   * auth/weak-password) on failure — callers should catch it and pass
   * it through describeAuthError() for a friendly message.
   */
  async signUpWithFirebase(email, password) {
    if (!window.AgriSetuAuth) throw new Error("Authentication is not available on this page yet.");
    return window.AgriSetuAuth.signUp(email, password);
  },

  /**
   * Signs an existing account into Firebase Authentication. Returns the
   * Firebase Auth `user` object (with `.uid`) on success.
   */
  async signInWithFirebase(email, password) {
    if (!window.AgriSetuAuth) throw new Error("Authentication is not available on this page yet.");
    return window.AgriSetuAuth.signIn(email, password);
  },

  /**
   * Sends a real Firebase "reset your password" email to the given
   * address (no-op success in local demo mode, where there's no mail
   * service — see LocalAuthAdapter in firebase-config.js).
   */
  async sendPasswordReset(email) {
    if (!window.AgriSetuAuth) throw new Error("Authentication is not available on this page yet.");
    return window.AgriSetuAuth.sendPasswordReset(email);
  },

  /** Loads a user's profile document from Firestore's "users" collection by Firebase Auth uid. */
  async getUserProfile(uid) {
    if (!uid || !window.AgriSetuDB || !window.AgriSetuDB.db) return null;
    const snap = await window.AgriSetuDB.db.collection("users").doc(uid).get();
    return snap && snap.exists ? { uid, ...snap.data() } : null;
  },

  /**
   * Turns a Firebase Auth error code into a friendly, user-facing message.
   */
  describeAuthError(err) {
    const code = err && err.code;
    switch (code) {
      case "auth/email-already-in-use":
        return "An account already exists for this email. Please log in instead.";
      case "auth/invalid-email":
        return "That doesn't look like a valid email address.";
      case "auth/weak-password":
        return "Password is too weak — please use at least 6 characters.";
      case "auth/user-not-found":
        return "No account found for that email. Please register first.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":
        return "Incorrect email or password. Please try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error — please check your connection and try again.";
      default:
        return (err && err.message) || "Something went wrong. Please try again.";
    }
  },

  /**
   * Looks up a user document in Firestore's "users" collection by email
   * OR phone number (case-insensitive, whitespace-insensitive) and,
   * optionally, role. Returns the matching user record (with its
   * Firestore doc id as uid) or null if nobody is registered with that
   * identifier/role combination yet.
   */
  async findRegisteredUser(identifier, role = null) {
    const normalizedId = String(identifier || "").trim().toLowerCase();
    const normalizedPhone = normalizedId.replace(/[\s-]/g, "");
    if (!normalizedId || !window.AgriSetuDB || !window.AgriSetuDB.db) return null;

    const snap = await window.AgriSetuDB.db.collection("users").get();
    const match = snap.docs.find(d => {
      const data = d.data();
      const dataEmail = String(data.email || "").trim().toLowerCase();
      const dataPhone = String(data.phone || "").replace(/[\s-]/g, "").toLowerCase();
      const idMatches = dataEmail === normalizedId || (normalizedPhone && dataPhone === normalizedPhone);
      if (!idMatches) return false;
      if (role && data.role !== role) return false;
      return true;
    });

    if (!match) return null;
    return { uid: match.id, ...match.data() };
  }
};

// Global Shopping Cart Helper (Synced across all pages via localStorage)
const SamruddhiCart = {
  getCart() {
    try {
      const c = localStorage.getItem("samruddhi_cart");
      return c ? JSON.parse(c) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem("samruddhi_cart", JSON.stringify(cart));
    this.updateCartBadge();
  },

  addToCart(product) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
    this.renderDrawer();
    this.openDrawer();
    showToast(`Added ${product.title} to your basket!`);
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    this.renderDrawer();
  },

  clearCart() {
    this.saveCart([]);
    this.renderDrawer();
  },

  updateCartBadge() {
    const cart = this.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-badge").forEach(el => el.innerText = totalCount);
  },

  renderDrawer() {
    const container = document.getElementById("cartItemsContainer");
    const totalEl = document.getElementById("cartTotalPrice");
    const savingsEl = document.getElementById("cartTotalSavings");
    const cart = this.getCart();

    let subtotal = 0;
    let savings = 0;

    if (container) {
      if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px 10px; color:var(--text-muted);">Your fresh farm basket is empty.</div>`;
      } else {
        container.innerHTML = cart.map(item => {
          const itemTotal = item.price * item.quantity;
          const itemSavings = (item.mandiPrice - item.price) * item.quantity;
          subtotal += itemTotal;
          savings += itemSavings;

          return `
            <div class="cart-item-row">
              <img src="${item.imageURL}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;" />
              <div style="flex:1;">
                <div style="font-weight:700; font-size:0.88rem; color:var(--primary-deep);">${item.title}</div>
                <div style="font-size:0.78rem; color:var(--text-muted);">₹${item.price}/${item.unit} x ${item.quantity}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:800; color:var(--primary);">₹${itemTotal}</div>
                <button style="background:transparent; color:#EF4444; font-size:0.8rem;" onclick="SamruddhiCart.removeFromCart('${item.id}')">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          `;
        }).join("");
      }
    }

    if (totalEl) totalEl.innerText = `₹${subtotal}`;
    if (savingsEl) savingsEl.innerText = `₹${savings}`;
  },

  openDrawer() {
    const drawer = document.getElementById("cartFlyoutDrawer");
    if (drawer) drawer.classList.add("open");
  },

  closeDrawer() {
    const drawer = document.getElementById("cartFlyoutDrawer");
    if (drawer) drawer.classList.remove("open");
  }
};

// ---------------------------------------------------------------------------
// Order Lifecycle Helper — shared status vocabulary + tracking timeline UI
// used by consumer-marketplace, consumer-orders, farmer-dashboard and
// logistics-dashboard so every page speaks the same order states:
//   pending_pickup -> out_for_delivery -> delivered   (or -> cancelled)
// ---------------------------------------------------------------------------
const SamruddhiOrders = {
  STEPS: [
    { key: "pending_pickup", label: "Order Placed", icon: "fa-receipt" },
    { key: "out_for_delivery", label: "Picked Up by Logistics", icon: "fa-truck-fast" },
    { key: "delivered", label: "Delivered", icon: "fa-box-open" }
  ],

  statusLabel(status) {
    const map = {
      pending_pickup: "Awaiting Logistics Pickup",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    return map[status] || (status || "Processing").toUpperCase().replace(/_/g, " ");
  },

  statusColor(status) {
    const map = {
      pending_pickup: "#B45309",
      out_for_delivery: "#0369A1",
      delivered: "#15803D",
      cancelled: "#B91C1C"
    };
    return map[status] || "#475569";
  },

  /** Renders a small horizontal tracking timeline for an order card. */
  renderTimeline(order) {
    if (order.status === "cancelled") {
      return `<div style="font-size:0.8rem; font-weight:700; color:#B91C1C; margin:10px 0;">
        <i class="fa-solid fa-circle-xmark"></i> This order was cancelled.
      </div>`;
    }

    const currentIdx = this.STEPS.findIndex(s => s.key === order.status);
    const activeIdx = currentIdx === -1 ? 0 : currentIdx;

    return `
      <div class="order-track-timeline">
        ${this.STEPS.map((step, idx) => {
          const done = idx <= activeIdx;
          const isLast = idx === this.STEPS.length - 1;
          return `
            <div class="order-track-step ${done ? 'done' : ''}">
              <div class="order-track-dot"><i class="fa-solid ${step.icon}"></i></div>
              <div class="order-track-label">${step.label}</div>
            </div>
            ${!isLast ? `<div class="order-track-line ${idx < activeIdx ? 'done' : ''}"></div>` : ""}
          `;
        }).join("")}
      </div>
      ${order.driverName && order.status !== "pending_pickup" ? `
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:6px;">
          <i class="fa-solid fa-truck"></i> Handled by <strong>${order.driverName}</strong>
        </div>` : ""}
    `;
  }
};
window.SamruddhiOrders = SamruddhiOrders;

// Global Toast Notifications
function showToast(message) {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(8, 28, 21, 0.95)";
  toast.style.color = "#FFF";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "30px";
  toast.style.fontSize = "0.9rem";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "3000";
  toast.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
  toast.style.border = "1px solid var(--accent-mint)";
  toast.innerHTML = `<i class="fa-solid fa-leaf" style="color:var(--accent-mint); margin-right:8px;"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 3200);
}

// Global Invoice Modal
function showInvoiceModal(order) {
  const modal = document.getElementById("invoiceReceiptModal");
  const container = document.getElementById("invoiceContentContainer");
  if (!modal || !container) return;

  container.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid #E2E8F0; padding-bottom:16px; margin-bottom:16px;">
      <h2 style="color:var(--primary-deep); font-family:'Cinzel', serif;">SAMRUDDHI SETU DIRECT RECEIPT</h2>
      <p style="font-size:0.8rem; color:var(--text-muted);">100% Transparent Direct-from-Producer Trade</p>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:14px;">
      <div><strong>Order ID:</strong> ${order.id}<br><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</div>
      <div style="text-align:right;"><strong>Producer:</strong> ${order.farmerName}<br><strong>Buyer:</strong> ${order.buyerName}</div>
    </div>
    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:16px;">
      <thead>
        <tr style="background:#F1F5F9; border-bottom:2px solid #CBD5E1;">
          <th style="padding:8px; text-align:left;">Item</th>
          <th style="padding:8px; text-align:center;">Qty</th>
          <th style="padding:8px; text-align:right;">Price</th>
          <th style="padding:8px; text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(i => `
          <tr style="border-bottom:1px solid #F1F5F9;">
            <td style="padding:8px;">${i.title}</td>
            <td style="padding:8px; text-align:center;">${i.quantity} ${i.unit}</td>
            <td style="padding:8px; text-align:right;">₹${i.price}</td>
            <td style="padding:8px; text-align:right; font-weight:700;">₹${i.price * i.quantity}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <div style="text-align:right; font-size:1.2rem; font-weight:800; color:var(--primary-deep); margin-bottom:8px;">
      Total ${order.paymentMethod === "COD" ? "Due" : "Paid"}: ₹${order.totalAmount}
    </div>
    ${order.paymentMethod ? `
    <div style="text-align:right; font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">
      Payment: ${order.paymentMethod === "ONLINE" ? `Razorpay (Test Mode)${order.paymentId ? " · " + order.paymentId : ""}` : "Cash on Delivery"}
    </div>` : ""}
    <div style="background:#ECFDF5; padding:10px; border-radius:8px; text-align:center; color:#065F46; font-size:0.82rem;">
      🌱 By buying direct on Samruddhi Setu, you eliminated middleman markups and saved <strong>₹${order.savings}</strong>!
    </div>
  `;

  modal.classList.add("open");
}

// 1-Click Quick Demo Login Helper
window.loginAsPredefinedUser = async function(uid) {
  const userDoc = await window.AgriSetuDB.db.collection("users").doc(uid).get();
  if (userDoc.exists) {
    const user = userDoc.data();
    SamruddhiAuth.login(user, true);
  }
};

// DOM Content Loaded - Page Specific Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  const user = SamruddhiAuth.getStoredUser();

  // Setup common navbar components
  const guestNavActions = document.getElementById("guestNavActions");
  const userNavActions = document.getElementById("userNavActions");
  const navUserAvatar = document.getElementById("navUserAvatar");
  const navUserName = document.getElementById("navUserName");
  const navUserRole = document.getElementById("navUserRole");
  const navLogoutBtn = document.getElementById("navLogoutBtn");

  if (user) {
    if (guestNavActions) guestNavActions.style.display = "none";
    if (userNavActions) userNavActions.style.display = "flex";
    if (navUserAvatar) navUserAvatar.src = user.avatar || "assets/default-avatar.jpg";
    if (navUserName) navUserName.innerText = user.name;
    if (navUserRole) navUserRole.innerText = user.role.toUpperCase();
  } else {
    if (guestNavActions) guestNavActions.style.display = "flex";
    if (userNavActions) userNavActions.style.display = "none";
  }

  navLogoutBtn?.addEventListener("click", () => SamruddhiAuth.logout());

  // Initialize Cart Drawer & Badges
  SamruddhiCart.updateCartBadge();
  SamruddhiCart.renderDrawer();
  document.getElementById("cartToggleBtn")?.addEventListener("click", () => SamruddhiCart.openDrawer());
  document.getElementById("closeCartBtn")?.addEventListener("click", () => SamruddhiCart.closeDrawer());

  // Cart Checkout Action — now routed through the Razorpay (test mode) / COD payment step
  document.getElementById("proceedToCheckoutBtn")?.addEventListener("click", async () => {
    const cart = SamruddhiCart.getCart();
    if (cart.length === 0) {
      showToast("Please add produce to your basket before checkout.");
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = cart.reduce((sum, item) => sum + ((item.mandiPrice - item.price) * item.quantity), 0);
    const activeUser = SamruddhiAuth.getStoredUser();

    if (!window.SamruddhiPayments) {
      showToast("Payment module failed to load. Please refresh the page.");
      return;
    }

    const paymentResult = await window.SamruddhiPayments.openCheckout({
      totalAmount: total,
      savings,
      items: cart,
      buyerName: activeUser?.name || "Guest Buyer",
      buyerPhone: activeUser?.phone || "",
    });

    // User closed the payment sheet without paying / choosing COD
    if (!paymentResult) return;

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const primaryItem = cart[0] || {};

    const newOrder = {
      id: orderId,
      buyerId: activeUser?.uid || `guest-${Date.now()}`,
      buyerName: activeUser?.name || "Guest Buyer",
      farmerId: primaryItem.farmerId || null,
      farmerName: primaryItem.farmerName || "Direct Farmer",
      logisticsId: null,
      driverName: "Awaiting Dispatch Assignment",
      items: cart.map(i => ({ productId: i.id, title: i.title, quantity: i.quantity, unit: i.unit, price: i.price })),
      totalAmount: total,
      savings,
      deliveryType: total > 2000 ? "large_truck" : "instant_bike",
      status: "pending_pickup",
      statusHistory: [
        { status: "pending_pickup", label: "Order placed & payment confirmed", at: new Date().toISOString() }
      ],
      deliveryAddress: activeUser?.location || "",
      paymentMethod: paymentResult.paymentMethod,
      paymentId: paymentResult.paymentId || null,
      paymentStatus: paymentResult.paymentMethod === "ONLINE" ? "paid_test_mode" : "cod_pending",
      createdAt: new Date().toISOString()
    };

    await window.AgriSetuDB.db.collection("orders").add(newOrder);
    SamruddhiCart.clearCart();
    SamruddhiCart.closeDrawer();
    showToast(
      paymentResult.paymentMethod === "ONLINE"
        ? `Payment successful (test mode)! Order ${orderId} placed directly with producer.`
        : `Order ${orderId} placed directly with producer — pay on delivery.`
    );
    showInvoiceModal(newOrder);
  });

  document.getElementById("closeInvoiceModalBtn")?.addEventListener("click", () => {
    document.getElementById("invoiceReceiptModal")?.classList.remove("open");
  });

  // ── Floating AI Chatbot ──────────────────────────────────────────────────
  const aiLauncherBtn = document.getElementById("aiLauncherBtn");
  const aiChatWindow = document.getElementById("aiChatWindow");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const aiChatInput = document.getElementById("aiChatInput");
  const aiSendBtn = document.getElementById("aiSendBtn");
  const aiMicBtn = document.getElementById("aiMicBtn");
  const aiMessagesContainer = document.getElementById("aiChatMessages");
  const aiKeyToggleBtn = document.getElementById("aiKeyToggleBtn");
  const aiKeyPanel = document.getElementById("aiKeyPanel");
  const aiKeyInput = document.getElementById("aiKeyInput");
  const aiKeySaveBtn = document.getElementById("aiKeySaveBtn");
  const aiKeyClearBtn = document.getElementById("aiKeyClearBtn");
  const aiKeyTestBtn = document.getElementById("aiKeyTestBtn");
  const aiKeyTestStatus = document.getElementById("aiKeyTestStatus");

  /** Lightweight Markdown → HTML converter for chat bubbles */
  function markdownToHtml(md) {
    if (!md) return "";
    let html = md
      // Escape HTML entities first
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      // Headings
      .replace(/^### (.+)$/gm, "<h4 style='margin:6px 0 4px;font-size:0.88rem;'>$1</h4>")
      .replace(/^## (.+)$/gm, "<h3 style='margin:8px 0 4px;font-size:0.92rem;'>$1</h3>")
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Horizontal rule
      .replace(/^---$/gm, "<hr style='border:none;border-top:1px solid #E2E8F0;margin:8px 0;'>")
      // Unordered lists (lines starting with • * -)
      .replace(/^[•\-\*] (.+)$/gm, "<li>$1</li>")
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      // Wrap consecutive <li> in <ul>
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
      // Line breaks (double newlines become paragraph breaks)
      .replace(/\n\n/g, "</p><p style='margin:6px 0;'>")
      .replace(/\n/g, "<br>");
    return html;
  }

  /** Update the key button visual state */
  function refreshKeyButtonState() {
    if (!aiKeyToggleBtn) return;
    const hasKey = window.geminiService && window.geminiService.hasApiKey();
    if (hasKey) {
      aiKeyToggleBtn.classList.add("has-key");
      aiKeyToggleBtn.title = "API Key configured ✅ – Click to change";
      aiKeyToggleBtn.innerHTML = `<i class="fa-solid fa-key"></i> Key ✅`;
    } else {
      aiKeyToggleBtn.classList.remove("has-key");
      aiKeyToggleBtn.title = "Add Google AI Studio API Key to enable live Gemini AI";
      aiKeyToggleBtn.innerHTML = `<i class="fa-solid fa-key"></i> Add Key`;
    }
  }

  // Wire up key toggle button
  if (aiKeyToggleBtn && aiKeyPanel) {
    aiKeyToggleBtn.addEventListener("click", () => {
      aiKeyPanel.classList.toggle("open");
      if (aiKeyPanel.classList.contains("open") && aiKeyInput) {
        const existing = window.geminiService ? window.geminiService.getApiKey() : "";
        aiKeyInput.value = existing ? existing.slice(0, 8) + "••••••••••••••••" : "";
        aiKeyInput.placeholder = "Paste your AI Studio API key here…";
        aiKeyInput.focus();
      }
    });
  }

  if (aiKeyTestBtn) {
    aiKeyTestBtn.addEventListener("click", async () => {
      const rawVal = aiKeyInput.value.trim();
      const keyToTest = (rawVal && !rawVal.includes("•")) ? rawVal : window.geminiService.getApiKey();

      if (!keyToTest) {
        if (aiKeyTestStatus) aiKeyTestStatus.textContent = "Paste a key first.";
        return;
      }

      if (aiKeyTestStatus) aiKeyTestStatus.textContent = "Testing key against Google AI Studio…";
      aiKeyTestBtn.disabled = true;

      const result = await window.geminiService.testApiKey(keyToTest);

      if (aiKeyTestStatus) {
        aiKeyTestStatus.textContent = result.message;
        aiKeyTestStatus.style.color = result.valid ? "#4ADE80" : "#F87171";
      }
      aiKeyTestBtn.disabled = false;
    });
  }

  if (aiKeySaveBtn && aiKeyInput) {
    aiKeySaveBtn.addEventListener("click", () => {
      const rawVal = aiKeyInput.value.trim();
      if (!rawVal || rawVal.includes("•")) {
        showToast("Please paste a new API key to save.");
        return;
      }
      window.geminiService.setApiKey(rawVal);
      // Persist the validated key for all signed-in devices/browsers as well as this browser.
      window.AgriMitraGlobal?.saveKey(rawVal);
      aiKeyPanel.classList.remove("open");
      refreshKeyButtonState();
      showToast("✅ Gemini API Key saved! Chat is now powered by live AI.");
      if (aiKeyTestStatus) aiKeyTestStatus.textContent = "";
      // Clear chat history to give a clean start
      window.geminiService.clearHistory();
    });
  }

  if (aiKeyClearBtn) {
    aiKeyClearBtn.addEventListener("click", () => {
      window.geminiService.setApiKey("");
      aiKeyInput.value = "";
      aiKeyPanel.classList.remove("open");
      refreshKeyButtonState();
      showToast("API key cleared. Chatbot will use offline knowledge base.");
    });
  }

  if (aiLauncherBtn && aiChatWindow) {
    aiLauncherBtn.addEventListener("click", () => {
      aiChatWindow.classList.toggle("open");
      if (aiChatWindow.classList.contains("open") && aiMessagesContainer.children.length === 0) {
        const welcomeHtml = `<div class="chat-bubble-source-tag offline">🌱 AgriMitra AI</div><br>
          ${markdownToHtml("Namaste! I am **AgriMitra**, your agricultural &amp; market advisor.\n\nAsk me about:\n• Crop diseases &amp; organic remedies\n• Government schemes (PM-KISAN, PMFBY)\n• Cooperative societies &amp; \\&gt;50kg policy\n• Fair pricing vs Mandi rates\n\n*💡 Add your Google AI Studio key (🔑 Add Key) for live Gemini AI in any language!*")}`;
        appendChatMessage("bot", welcomeHtml);
      }
      refreshKeyButtonState();
    });

    closeChatBtn?.addEventListener("click", () => {
      aiChatWindow.classList.remove("open");
    });
  }

  // Initialize button state on load
  refreshKeyButtonState();

  async function handleSendChatMessage() {
    if (!aiChatInput) return;
    const text = aiChatInput.value.trim();
    if (!text) return;

    appendChatMessage("user", text);
    aiChatInput.value = "";

    const loadingBubble = appendChatMessage("bot", `<i class="fa-solid fa-spinner fa-spin"></i> <em style="color:#64748B">AgriMitra is thinking…</em>`);

    try {
      const response = await window.geminiService.sendQuery(text);
      let sourceTag = "";
      if (response.source === "gemini_live") {
        const modelShort = (response.model || "gemini").replace("gemini-", "Gemini ").replace("-flash", " Flash").replace("-pro", " Pro");
        sourceTag = `<div class="chat-bubble-source-tag gemini">🤖 Live ${modelShort} (AI Studio)</div><br>`;
      } else if (response.source === "gemini_error") {
        sourceTag = `<div class="chat-bubble-source-tag error">⚠️ API Notice</div><br>`;
      } else {
        sourceTag = `<div class="chat-bubble-source-tag offline">🌱 Offline Knowledge Base</div><br>`;
      }
      loadingBubble.innerHTML = sourceTag + markdownToHtml(response.text);
      loadingBubble.scrollIntoView({ behavior: "smooth", block: "end" });
      if (response.source === "gemini_live" && window.speechSynthesis) {
        window.geminiService.speakResponse(response.text);
      }
    } catch (e) {
      loadingBubble.innerHTML = `<div class="chat-bubble-source-tag error">⚠️ Error</div><br>Sorry, there was an issue. Please try again. (${e.message})`;
    }
  }

  aiSendBtn?.addEventListener("click", handleSendChatMessage);
  aiChatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendChatMessage();
  });

  aiMicBtn?.addEventListener("click", () => {
    if (!window.geminiService) return;
    aiMicBtn.classList.add("listening");
    window.geminiService.startVoiceInput(
      (transcript) => {
        aiMicBtn.classList.remove("listening");
        if (aiChatInput) aiChatInput.value = transcript;
        handleSendChatMessage();
      },
      (error) => {
        aiMicBtn.classList.remove("listening");
        showToast("Speech input notice: " + error);
      }
    );
  });

  function appendChatMessage(sender, htmlContent) {
    if (!aiMessagesContainer) return null;
    const msg = document.createElement("div");
    msg.className = `chat-bubble ${sender}`;
    msg.innerHTML = htmlContent;
    aiMessagesContainer.appendChild(msg);
    aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
    return msg;
  }

  // Produce photo upload -> Firebase Storage (live) or compressed local data URL (demo)
  const prodImageFile = document.getElementById("prodImageFile");
  const prodImageUrl = document.getElementById("prodImageUrl");
  const prodImagePreview = document.getElementById("prodImagePreview");
  const prodImageUploadStatus = document.getElementById("prodImageUploadStatus");

  prodImageFile?.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (prodImageUploadStatus) prodImageUploadStatus.textContent = "Uploading… 0%";

    try {
      const { url, storage } = await window.AgriSetuDB.uploadImage(file, "product-images", (pct) => {
        if (prodImageUploadStatus) prodImageUploadStatus.textContent = `Uploading… ${pct}%`;
      });

      if (prodImageUrl) prodImageUrl.value = url;
      if (prodImagePreview) {
        prodImagePreview.src = url;
        prodImagePreview.style.display = "block";
      }
      if (prodImageUploadStatus) {
        prodImageUploadStatus.textContent = storage === "firebase"
          ? "✅ Uploaded to Firebase Storage"
          : "✅ Saved locally (add live Firebase keys to share across devices)";
      }
    } catch (err) {
      if (prodImageUploadStatus) prodImageUploadStatus.textContent = "⚠️ Upload failed: " + err.message;
      showToast("Photo upload failed: " + err.message);
    }
  });

  // ONNX Produce Scanner Modal Handlers
  const scannerModal = document.getElementById("onnxScannerModal");
  const openScannerBtn = document.getElementById("openProduceScannerBtn");
  const closeScannerBtn = document.getElementById("closeScannerModalBtn");
  const scannerFileInput = document.getElementById("scannerFileInput");
  const scannerPreviewImg = document.getElementById("scannerPreviewImg");
  const scanLaserLine = document.getElementById("scanLaserLine");
  const scannerReportCard = document.getElementById("scannerReportCard");

  if (openScannerBtn && scannerModal) {
    openScannerBtn.addEventListener("click", () => {
      scannerModal.classList.add("open");
    });
    closeScannerBtn?.addEventListener("click", () => {
      scannerModal.classList.remove("open");
    });
  }

  document.querySelectorAll(".scanner-sample-img").forEach(img => {
    img.addEventListener("click", () => {
      runProduceScan(img.src, img.getAttribute("data-crop"));
    });
  });

  scannerFileInput?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      runProduceScan(e.target.files[0], "Uploaded Produce");
    }
  });

  async function runProduceScan(imgSource, cropName) {
    if (scannerPreviewImg) {
      if (imgSource instanceof File) {
        scannerPreviewImg.src = URL.createObjectURL(imgSource);
      } else {
        scannerPreviewImg.src = imgSource;
      }
      scannerPreviewImg.style.display = "block";
    }

    if (scanLaserLine) scanLaserLine.style.display = "block";
    if (scannerReportCard) {
      scannerReportCard.innerHTML = `<div style="text-align:center; padding:20px;"><i class="fa-solid fa-microchip fa-spin" style="font-size:2rem; color:var(--accent-mint);"></i><p style="margin-top:8px;">Running ONNX Neural Quality Inference...</p></div>`;
    }

    setTimeout(async () => {
      if (scanLaserLine) scanLaserLine.style.display = "none";
      const result = await window.agriScanner.scanProduceQuality(imgSource, cropName);

      if (scannerReportCard) {
        const methodBadge = result.usedModel
          ? `<span class="role-badge-pill" style="background:#0F766E; color:#FFF; font-size:0.68rem;">🧠 ONNX Model${result.modelConfidence ? ` · ${result.modelConfidence}% confidence` : ""}</span>`
          : `<span class="role-badge-pill" style="background:#92400E; color:#FFF; font-size:0.68rem;">📐 Heuristic Estimate (no trained model loaded)</span>`;

        if (result.isValid === false) {
          // Rejected: human face / selfie / unrelated object detected instead of produce.
          scannerReportCard.innerHTML = `
            <div style="background:#FEF2F2; border:1.5px solid #FCA5A5; border-radius:12px; padding:16px;">
              <div style="margin-bottom:8px;">${methodBadge}</div>
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <i class="fa-solid fa-triangle-exclamation" style="color:#DC2626; font-size:1.4rem;"></i>
                <span class="role-badge-pill" style="background:#DC2626; color:#FFF; font-size:0.85rem;">Invalid Input Detected</span>
              </div>
              <p style="font-size:0.88rem; color:#991B1B; font-weight:600; margin-bottom:12px;">${result.recommendation}</p>
              <button class="btn-luxury-outline" style="width:100%;" onclick="retryProduceScan()">
                <i class="fa-solid fa-rotate-left"></i> Upload a Different Photo
              </button>
            </div>
          `;
          return;
        }

        scannerReportCard.innerHTML = `
          <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:12px; padding:16px;">
            <div style="margin-bottom:8px;">${methodBadge}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="role-badge-pill" style="background:#16A34A; color:#FFF; font-size:0.85rem;">${result.grade}</span>
              <strong style="color:var(--primary-deep); font-size:1.1rem;">${result.freshnessScore}% Freshness Score</strong>
            </div>
            <p style="font-size:0.85rem; color:var(--text-main); margin-bottom:6px;"><strong>Defect / Blemish:</strong> ${result.blemishIndex}</p>
            <p style="font-size:0.85rem; color:var(--text-main); margin-bottom:6px;"><strong>Estimated Shelf Life:</strong> ${result.shelfLife}</p>
            <p style="font-size:0.85rem; color:#15803D; font-weight:600; margin-bottom:12px;">${result.recommendation}</p>
            <button class="btn-luxury-gold" style="width:100%;" onclick="applyAiGradeToForm('${result.grade}')">
              Apply ${result.grade} to Listing Form
            </button>
          </div>
        `;
      }
    }, 1200);
  }

  window.retryProduceScan = function() {
    if (scannerPreviewImg) {
      scannerPreviewImg.style.display = "none";
      scannerPreviewImg.src = "";
    }
    if (scannerReportCard) {
      scannerReportCard.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-solid fa-camera-retro" style="font-size:1.6rem;"></i><p style="margin-top:8px;">Choose a clear photo of the actual produce to scan.</p></div>`;
    }
    if (scannerFileInput) {
      scannerFileInput.value = "";
      scannerFileInput.click();
    }
  };

  window.applyAiGradeToForm = function(grade) {
    const gradeInput = document.getElementById("prodAiGrade");
    if (gradeInput) {
      gradeInput.value = grade;
    }
    scannerModal?.classList.remove("open");
    showToast(`AI Grade '${grade}' linked to produce listing!`);
  };
});
