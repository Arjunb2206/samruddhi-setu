/**
 * SAMRUDDHI SETU — RAZORPAY TEST MODE CHECKOUT
 * ---------------------------------------------------------------------------
 * Lightweight, dependency-free payment step modelled on the Farm2Fork
 * reference checkout flow (Online via Razorpay vs Cash on Delivery),
 * restyled to match Samruddhi Setu's luxury agricultural palette.
 *
 * ONLINE FLOW: this loads Razorpay's real hosted Checkout.js and opens it
 * with a public TEST key — this is the actual Razorpay widget (the blue
 * "Secure Checkout" shield screen), not a custom-built lookalike. In test
 * mode, use card 4111 1111 1111 1111, any future expiry, any CVV, any OTP.
 *
 * HOW TO GO LIVE FOR REAL:
 *   1. Create the Razorpay order on a server using your own Key Secret
 *      (`POST /orders` via the `razorpay` npm package), never in the browser.
 *   2. Pass your own Key ID + the returned `order_id` into the options below.
 *   3. Verify the payment signature on the server (HMAC SHA256 with your
 *      Key Secret) before marking the order as paid.
 * ---------------------------------------------------------------------------
 */

const SamruddhiPayments = {
  // Your own Razorpay TEST key (generated from your dashboard's Test Mode
  // API Keys page). This replaces Razorpay's public documentation sample
  // key, which has no payment methods configured and always fails.
  RAZORPAY_TEST_KEY: "rzp_test_TbEaQva9et0kFl",

  _scriptLoaded: false,
  _pendingResolve: null,
  _draft: null,
  _selectedMethod: "ONLINE",

  loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        this._scriptLoaded = true;
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        this._scriptLoaded = true;
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  _ensureModal() {
    if (!document.getElementById("paymentModalOverlay")) {
      const overlay = document.createElement("div");
      overlay.className = "payment-modal-overlay";
      overlay.id = "paymentModalOverlay";
      overlay.innerHTML = `<div class="payment-modal-box"></div>`;
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this._close(true);
      });
    }
    // A previous checkout may have left the box on its animated success
    // screen — always rebuild the standard checkout form fresh.
    this._renderCheckoutForm();
  },

  _renderCheckoutForm() {
    const box = document.querySelector("#paymentModalOverlay .payment-modal-box");
    box.innerHTML = `
      <button class="payment-close-btn" id="paymentCloseBtn"><i class="fa-solid fa-xmark"></i></button>

      <div class="payment-modal-eyebrow"><i class="fa-solid fa-lock"></i> Secure Checkout</div>
      <h3 class="payment-modal-title">Complete your payment</h3>

      <div class="payment-order-summary" id="paymentOrderSummary"></div>

      <div id="paymentMethodOptions"></div>

      <div class="payment-test-mode-note" id="paymentTestModeNote">
        <i class="fa-solid fa-flask" style="margin-top:2px;"></i>
        <span><strong>Razorpay Test Mode.</strong> No real money moves. Use card
        <strong>4111 1111 1111 1111</strong>, any future expiry &amp; CVV, and any OTP to simulate a successful payment.</span>
      </div>

      <button class="payment-pay-btn" id="paymentPayBtn"></button>

      <div class="payment-razorpay-badge">
        <i class="fa-solid fa-shield-halved"></i> Payments secured by Razorpay
      </div>
    `;

    document.getElementById("paymentCloseBtn").addEventListener("click", () => this._close(true));
    document.getElementById("paymentPayBtn").addEventListener("click", () => this._handlePayClick());
  },

  _renderMethodOptions() {
    const wrap = document.getElementById("paymentMethodOptions");
    wrap.innerHTML = `
      <label class="payment-method-option ${this._selectedMethod === "ONLINE" ? "selected" : ""}" data-method="ONLINE">
        <input type="radio" name="paySamruddhiMethod" value="ONLINE" ${this._selectedMethod === "ONLINE" ? "checked" : ""} />
        <div class="payment-method-icon"><i class="fa-solid fa-credit-card"></i></div>
        <div style="flex:1;">
          <div class="payment-method-title">Pay online</div>
          <div class="payment-method-sub">UPI, Cards, Netbanking &amp; Wallets via Razorpay</div>
        </div>
        <span class="payment-secure-pill">Test Mode</span>
      </label>

      <label class="payment-method-option ${this._selectedMethod === "COD" ? "selected" : ""}" data-method="COD">
        <input type="radio" name="paySamruddhiMethod" value="COD" ${this._selectedMethod === "COD" ? "checked" : ""} />
        <div class="payment-method-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
        <div style="flex:1;">
          <div class="payment-method-title">Cash on delivery</div>
          <div class="payment-method-sub">Pay when your fresh order arrives</div>
        </div>
      </label>
    `;

    wrap.querySelectorAll(".payment-method-option").forEach((el) => {
      el.addEventListener("click", () => {
        this._selectedMethod = el.dataset.method;
        this._renderMethodOptions();
        this._renderPayButton();
      });
    });

    document.getElementById("paymentTestModeNote").style.display =
      this._selectedMethod === "ONLINE" ? "flex" : "none";
  },

  _renderPayButton() {
    const btn = document.getElementById("paymentPayBtn");
    if (this._selectedMethod === "ONLINE") {
      btn.innerHTML = `<i class="fa-solid fa-lock"></i> Pay ₹${(this._draft.totalAmount || 0).toLocaleString()} securely →`;
    } else {
      btn.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Place COD order →`;
    }
    btn.disabled = false;
  },

  _renderSummary() {
    const el = document.getElementById("paymentOrderSummary");
    const d = this._draft;
    el.innerHTML = `
      <div class="payment-summary-row"><span>Items (${(d.items || []).reduce((s, i) => s + i.quantity, 0)})</span><span>₹${(d.totalAmount || 0).toLocaleString()}</span></div>
      <div class="payment-summary-row"><span>Middleman markup saved</span><span style="color:#15803D; font-weight:700;">₹${(d.savings || 0).toLocaleString()}</span></div>
      <div class="payment-summary-total"><span style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); font-weight:700;">Total payable</span><strong>₹${(d.totalAmount || 0).toLocaleString()}</strong></div>
    `;
  },

  /**
   * Opens the payment method selector for a draft order.
   * draft: { totalAmount, savings, items, buyerName, buyerPhone }
   * Returns a Promise resolving to { paymentMethod: "ONLINE"|"COD", paymentId?: string }
   * or null if the user cancelled.
   */
  openCheckout(draft) {
    this._draft = draft;
    this._selectedMethod = "ONLINE";
    this._ensureModal();
    this._renderSummary();
    this._renderMethodOptions();
    this._renderPayButton();
    document.getElementById("paymentModalOverlay").classList.add("open");

    return new Promise((resolve) => {
      this._pendingResolve = resolve;
    });
  },

  _close(cancelled) {
    document.getElementById("paymentModalOverlay")?.classList.remove("open");
    if (cancelled && this._pendingResolve) {
      this._pendingResolve(null);
      this._pendingResolve = null;
    }
  },

  /**
   * Plays a short "coins flying up and spinning into place" sequence over
   * the current modal content, then calls onDone. Purely visual — nothing
   * here touches the checkout state.
   */
  _playCoinTransition(box, onDone) {
    const flight = document.createElement("div");
    flight.className = "payment-coin-flight";
    flight.innerHTML = `
      <span class="payment-coin" style="--tx:-46px; animation-delay:0s;">₹</span>
      <span class="payment-coin" style="--tx:0px; animation-delay:0.08s;">₹</span>
      <span class="payment-coin" style="--tx:46px; animation-delay:0.16s;">₹</span>
    `;
    box.appendChild(flight);
    box.classList.add("is-transitioning-payment");

    setTimeout(() => {
      flight.remove();
      box.classList.remove("is-transitioning-payment");
      onDone();
    }, 950);
  },

  /**
   * Morphs the modal into an animated success screen — a coin-flip flight
   * sequence followed by a checkmark draw and confetti burst — then
   * resolves the pending checkout promise either when the user taps
   * "Continue" or after a short auto-dismiss timer, whichever comes first.
   */
  _celebrate(result, { title, subtitle, amountLabel }) {
    const box = document.querySelector("#paymentModalOverlay .payment-modal-box");
    if (!box) {
      const resolve = this._pendingResolve;
      this._pendingResolve = null;
      this._close(false);
      resolve && resolve(result);
      return;
    }

    this._playCoinTransition(box, () => {
      box.innerHTML = `
        <div class="payment-success-view">
          <div class="payment-success-confetti" id="paymentConfetti"></div>
          <div class="payment-success-checkmark-wrap">
            <svg viewBox="0 0 96 96" class="payment-success-svg">
              <circle class="payment-success-ring" cx="48" cy="48" r="42" />
              <path class="payment-success-check" d="M29 50 L42 63 L69 33" />
            </svg>
          </div>
          <div class="payment-success-title">${title}</div>
          ${amountLabel ? `<div class="payment-success-amount">${amountLabel}</div>` : ""}
          <div class="payment-success-sub">${subtitle}</div>
          <button class="payment-pay-btn payment-success-continue-btn" id="paymentSuccessContinueBtn">
            Continue <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;

      // Confetti burst in the brand palette
      const confettiHost = document.getElementById("paymentConfetti");
      const colors = ["#2D6A4F", "#52B788", "#D4A373", "#E9C46A", "#74C69D"];
      for (let i = 0; i < 26; i++) {
        const piece = document.createElement("span");
        piece.className = "payment-confetti-piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = `${Math.random() * 0.25}s`;
        piece.style.animationDuration = `${1.1 + Math.random() * 0.9}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiHost.appendChild(piece);
      }

      const finish = () => {
        if (!this._pendingResolve) return; // already finished
        const resolve = this._pendingResolve;
        this._pendingResolve = null;
        document.getElementById("paymentModalOverlay")?.classList.remove("open");
        resolve && resolve(result);
      };

      document.getElementById("paymentSuccessContinueBtn").addEventListener("click", finish);
      setTimeout(finish, 2600);
    });
  },

  async _handlePayClick() {
    if (this._selectedMethod === "COD") {
      const draft = this._draft;
      this._celebrate(
        { paymentMethod: "COD" },
        {
          title: "Order Confirmed!",
          subtitle: "Pay in cash when your fresh produce arrives at your door.",
          amountLabel: `₹${(draft.totalAmount || 0).toLocaleString()} due on delivery`,
        }
      );
      return;
    }

    const btn = document.getElementById("paymentPayBtn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Opening secure payment…`;

    const ok = await this.loadRazorpayScript();
    if (!ok || !window.Razorpay) {
      showToast("Razorpay checkout could not be loaded. Please check your connection.");
      this._renderPayButton();
      return;
    }

    const draft = this._draft;
    const amountPaise = Math.max(100, Math.round((draft.totalAmount || 0) * 100));

    const options = {
      key: this.RAZORPAY_TEST_KEY,
      amount: amountPaise,
      currency: "INR",
      name: "Samruddhi Setu",
      description: "Direct farm & coastal produce order",
      image: "assets/logo.jpg",
      prefill: {
        name: draft.buyerName || "",
        contact: draft.buyerPhone || "",
      },
      notes: {
        platform: "Samruddhi Setu",
        mode: "test",
      },
      theme: { color: "#2D6A4F" },

      handler: (response) => {
        // In test mode Razorpay returns a razorpay_payment_id even without
        // a server-created order_id. A production build should send this
        // response to the backend for signature verification before
        // marking the order as paid.
        this._celebrate(
          {
            paymentMethod: "ONLINE",
            paymentId: response.razorpay_payment_id,
          },
          {
            title: "Payment Successful!",
            subtitle: "Your order goes straight to the producer for dispatch.",
            amountLabel: `₹${(draft.totalAmount || 0).toLocaleString()} paid`,
          }
        );
      },

      modal: {
        // Razorpay's own overlay is now the top layer above our modal, so
        // hide ours behind it while it's open and bring it back if the
        // person closes Razorpay's widget without paying.
        ondismiss: () => {
          showToast("Payment was cancelled. Your order has not been placed.");
          this._renderPayButton();
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      showToast("Payment failed. Please try again or choose Cash on Delivery.");
      this._renderPayButton();
    });
    rzp.open();
  },
};

window.SamruddhiPayments = SamruddhiPayments;
