/**
 * SAMRUDDHI SETU — APP SHELL
 * Renders the left sidebar + top bar used by every logged-in dashboard page.
 */

const SHELL_NAV = {
  farmer: [
    { href: "farmer-dashboard.html", icon: "fa-table-columns", label: "Dashboard", i18n: "navDashboard", key: "dashboard" },
    { href: "farmer-produce.html", icon: "fa-seedling", label: "My Produce", i18n: "navMyProduce", key: "produce" },
    { href: "farmer-crop-journal.html", icon: "fa-book-open", label: "Crop Journal", key: "cropjournal" },
    { href: "farmer-orders.html", icon: "fa-truck-fast", label: "Orders & Logistics", i18n: "navOrdersLogistics", key: "orders" },
    { href: "farmer-earnings.html", icon: "fa-sack-dollar", label: "Earnings & Payments", i18n: "navEarningsPayments", key: "earnings" },
    { href: "farmer-insights.html", icon: "fa-lightbulb", label: "Insights & Advisory", i18n: "navInsightsAdvisory", key: "insights" },
    { href: "farmer-community.html", icon: "fa-people-group", label: "Community & Support", i18n: "navCommunitySupport", key: "community" },
  ],
  consumer: [
    { href: "consumer-marketplace.html", icon: "fa-store", label: "Marketplace", i18n: "navMarketplace", key: "marketplace" },
    { href: "consumer-orders.html", icon: "fa-truck-fast", label: "Orders & Deliveries", i18n: "navOrdersDeliveries", key: "orders" },
    { href: "consumer-payments.html", icon: "fa-wallet", label: "Payments & Savings", i18n: "navPaymentsSavings", key: "payments" },
    { href: "consumer-insights.html", icon: "fa-chart-line", label: "Insights & Advisory", i18n: "navInsightsAdvisory", key: "insights" },
    { href: "consumer-community.html", icon: "fa-people-group", label: "Community & Support", i18n: "navCommunitySupport", key: "community" },
  ],
  logistics: [
    { href: "logistics-dashboard.html", icon: "fa-table-columns", label: "Dashboard", i18n: "navDashboard", key: "dashboard" },
    { href: "logistics-orders.html", icon: "fa-box", label: "Available Jobs", key: "orders" },
    { href: "logistics-fleet.html", icon: "fa-truck", label: "Fleet Desk", key: "fleet" },
    { href: "logistics-earnings.html", icon: "fa-wallet", label: "Earnings & Hours", key: "earnings" },
    { href: "logistics-vehicle.html", icon: "fa-gears", label: "Vehicle Info", key: "vehicle" },
    { href: "logistics-sos.html", icon: "fa-headset", label: "Dispatch & SOS", key: "sos" },
  ],};

/* Sidebar-panel toggle icon (matches the app's collapse/expand control) */
const SHELL_TOGGLE_ICON = `
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4.5" width="18" height="15" rx="3.5" stroke="currentColor" stroke-width="1.6"/>
    <line x1="9.3" y1="4.5" x2="9.3" y2="19.5" stroke="currentColor" stroke-width="1.6"/>
  </svg>`;

const SHELL_AVATARS = {
  farmer: "assets/default-avatar.jpg",
  consumer: "assets/default-avatar.jpg",
  logistics: "assets/default-avatar.jpg",
};

function renderAppShell(opts) {
  const { role, active, title, subtitle, searchPlaceholder } = opts;
  const items = SHELL_NAV[role] || [];
  document.body.classList.add("app-shell-active");

  const navHtml = items
    .map(
      (it) => `
      <a href="${it.href}" class="${it.key === active ? "active" : ""}">
        <i class="fa-solid ${it.icon}"></i><span${it.i18n ? ` data-i18n="${it.i18n}"` : ""}>${it.label}</span>
      </a>`
    )
    .join("") + `
      <a href="profile.html" class="${active === "profile" ? "active" : ""}">
        <i class="fa-solid fa-user"></i><span data-i18n="navProfile">Profile</span>
      </a>`;

  const sidebarHtml = `
    <div class="app-sidebar" id="appSidebar">
      <button class="sidebar-close-btn" id="sidebarCloseBtn"><i class="fa-solid fa-xmark"></i></button>
      <a href="${role === "farmer" ? "farmer-dashboard.html" : role === "consumer" ? "consumer-marketplace.html" : "logistics-dashboard.html"}" class="app-sidebar-brand">
        <img src="assets/logo.jpg" alt="Samruddhi Setu" />
        <div>
          <div class="brand-name" data-i18n="brandName">Samruddhi Setu</div>
          <div class="brand-sub">Direct Farm Network</div>
        </div>
      </a>
      <div class="app-sidebar-role"><i class="fa-solid fa-circle-check"></i> <span data-i18n="${role}Short">${role.toUpperCase()}</span> <span data-i18n="roleAccountSuffix">ACCOUNT</span></div>
      <nav class="app-sidebar-nav">${navHtml}</nav>
      <div class="app-sidebar-foot">
        <button id="navLogoutBtn"><i class="fa-solid fa-right-from-bracket"></i> <span data-i18n="logout">Log Out</span></button>
      </div>
    </div>
    <div class="shell-backdrop" id="shellBackdrop"></div>
    <div class="app-topbar">
      <button class="app-topbar-hamburger" id="sidebarOpenBtn" title="Toggle Sidebar" data-i18n-title="toggleSidebar">${SHELL_TOGGLE_ICON}</button>
      <div class="app-topbar-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="${searchPlaceholder || "Search anything..."}" id="shellSearchInput" ${searchPlaceholder ? "" : 'data-i18n-placeholder="searchAnything"'} />
      </div>
      <div class="app-topbar-right">
        <div class="app-topbar-lang">
          <select class="lang-selector-select" onchange="window.i18n && window.i18n.setLanguage(this.value)">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="mr">मराठी</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
        <button class="app-topbar-iconbtn" title="Notifications" data-i18n-title="notifications"><i class="fa-regular fa-bell"></i><span class="dot"></span></button>
        ${role === "consumer" ? `<button class="app-topbar-iconbtn cart-icon-btn" id="cartToggleBtn" title="View Basket" data-i18n-title="viewBasket"><i class="fa-solid fa-basket-shopping"></i><span class="cart-badge dot" style="background:var(--accent-mint,#52B788); width:auto; min-width:16px; height:16px; font-size:0.6rem; display:flex; align-items:center; justify-content:center; color:#fff; border-radius:8px; padding:0 3px;">0</span></button>` : ""}
        <a href="profile.html" class="app-topbar-profile">
          <img src="${SHELL_AVATARS[role]}" id="navUserAvatar" alt="avatar" />
          <div>
            <div class="name" id="navUserName" data-i18n="guestUser">Guest User</div>
            <div class="role" id="navUserRole">${role.toUpperCase()}</div>
          </div>
        </a>
      </div>
    </div>
  `;

  const root = document.getElementById("appShellRoot");
  root.insertAdjacentHTML("beforebegin", sidebarHtml);

  // Page header (optional — pages can render their own instead)
  if (title) {
    const head = document.createElement("div");
    head.className = "page-head";
    head.innerHTML = `<div><h1>${title}</h1><p>${subtitle || ""}</p></div>`;
    const wrap = document.querySelector(".page-wrap");
    if (wrap) wrap.prepend(head);
  }

  // Sidebar toggle button — opens/closes the drawer on mobile,
  // collapses/expands the sidebar (giving full-width content) on desktop.
  const openBtn = document.getElementById("sidebarOpenBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  const backdrop = document.getElementById("shellBackdrop");
  const isDesktopView = () => window.innerWidth > 980;
  openBtn?.addEventListener("click", () => {
    if (isDesktopView()) {
      document.body.classList.toggle("sidebar-desktop-collapsed");
    } else {
      document.body.classList.toggle("sidebar-open");
    }
  });
  closeBtn?.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
  backdrop?.addEventListener("click", () => document.body.classList.remove("sidebar-open"));

  // Populate user info if logged in (SamruddhiAuth comes from app.js)
  try {
    const user = window.SamruddhiAuth ? window.SamruddhiAuth.getStoredUser() : null;
    if (user) {
      const nameEl = document.getElementById("navUserName");
      const avatarEl = document.getElementById("navUserAvatar");
      const roleEl = document.getElementById("navUserRole");
      if (nameEl) {
        nameEl.innerText = user.name || "Guest User";
        // Prevent the i18n engine from overwriting the real user's name
        // back to the "Guest User" placeholder translation.
        nameEl.removeAttribute("data-i18n");
      }
      if (avatarEl && user.avatar) avatarEl.src = user.avatar;
      if (roleEl) roleEl.innerText = (user.role || role).toUpperCase();
    }
  } catch (e) {}

  document.getElementById("navLogoutBtn")?.addEventListener("click", () => {
    if (window.SamruddhiAuth) window.SamruddhiAuth.logout();
    else window.location.href = "index.html";
  });

  // Apply translations to the newly injected shell markup right away (covers
  // pages where renderAppShell() runs after DOMContentLoaded has fired) and
  // sync the language dropdown to whatever language is currently active.
  if (window.i18n) {
    window.i18n.updateDOMTranslations();
    document.querySelectorAll(".lang-selector-select").forEach(el => el.value = window.i18n.getLanguage());
  }
}
