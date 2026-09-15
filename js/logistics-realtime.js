/* Shared realtime bindings for the logistics workspace. All values come from Firestore snapshots. */
(function () {
  const db = () => window.AgriSetuDB?.db;
  const user = () => window.SamruddhiAuth?.getStoredUser() || {};
  const text = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value ?? "—"; };
  const money = n => "₹" + Number(n || 0).toLocaleString("en-IN");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  function listenUser() {
    const u = user(); if (!u.uid || String(u.uid).startsWith("guest-")) return;
    db()?.collection("users").doc(u.uid).onSnapshot(s => {
      if (!s.exists) return; const x = s.data();
      text("rtDriverName", x.name || "Logistics partner"); text("vehicleName", x.vehicleType || x.subType || "Not configured");
      text("vehicleMeta", x.vehicleNumber || "Registration not added"); text("vehicleCapacity", x.capacity || "Not configured");
      text("rtVehicleType", x.vehicleType || x.subType || "Not configured"); text("rtVehicleNumber", x.vehicleNumber || "Not configured");
      text("rtVehicleCapacity", x.capacity || "Not configured"); text("rtColdChain", x.coldChainStatus || "Not configured"); text("rtAvailability", x.availability || "Not configured"); text("rtFarmerRating", x.farmerRating ? `${x.farmerRating} / 5` : "—"); text("rtBuyerRating", x.buyerRating ? `${x.buyerRating} / 5` : "—"); text("rtRating", x.rating ? `${x.rating} / 5` : "—");
      text("rtDriverEmail", x.email || "—"); text("rtDriverPhone", x.phone || "—"); text("rtApproval", x.approvalStatus || "pending");
      document.querySelectorAll("[data-user]").forEach(e => e.textContent = x.name || "Logistics partner");
    }, e => console.warn("Realtime user listener:", e));
  }
  function listenOrders() {
    const u = user(); const ref = db()?.collection("orders"); if (!ref) return;
    ref.onSnapshot(s => {
      const all = s.docs.map(d => ({ id: d.id, ...d.data() })); const mine = all.filter(o => o.logisticsId === u.uid);
      const pending = all.filter(o => o.status === "pending_pickup" && !(o.declinedBy || []).includes(u.uid));
      text("rtAvailableJobs", pending.length); text("rtActiveDispatches", mine.filter(o => o.status === "out_for_delivery").length);
      text("rtCompletedTrips", mine.filter(o => o.status === "delivered").length); text("rtTodayEarnings", money(mine.filter(o => o.status === "delivered").reduce((n,o)=>n+(o.logisticsPayout||0),0)));
      text("rtWeekEarnings", money(mine.filter(o => o.status === "delivered").reduce((n,o)=>n+(o.logisticsPayout||0),0))); text("rtWeekEarningsDetail", money(mine.filter(o => o.status === "delivered").reduce((n,o)=>n+(o.logisticsPayout||0),0))); text("rtTodayEarnings", money(mine.filter(o => o.status === "delivered" && String(o.deliveredAt||"").slice(0,10) === new Date().toISOString().slice(0,10)).reduce((n,o)=>n+(o.logisticsPayout||0),0)));
      const row = document.getElementById("rtAvailableRows");
      if (row) row.innerHTML = pending.length ? pending.slice(0,5).map(o => `<div class="lg-row"><span><b>${esc(o.id)}</b><br><small>${esc(o.farmerName || "Farm pickup")} → ${esc(o.buyerName || "Customer")}</small></span><span>${esc(o.deliveryAddress || "Address on file")}</span></div>`).join("") : `<div class="lg-row">No available jobs in Firestore right now.</div>`;
      const deliveries = document.getElementById("rtDeliveryRows");
      if (deliveries) deliveries.innerHTML = mine.length ? mine.slice().sort((a,b)=>String(b.createdAt||"").localeCompare(String(a.createdAt||""))).map(o => `<div class="lg-row"><span><b>${esc(o.id)}</b><br><small>${esc(o.deliveryAddress || "Address on file")}</small></span><span class="lg-ok">${esc(o.status || "assigned")}</span></div>`).join("") : `<div class="lg-row">No deliveries found for this driver.</div>`;
      const dash = document.getElementById("rtDashboardAssignments"); if (dash) dash.innerHTML = pending.length ? pending.slice(0,3).map(o=>`<div class="lg-row"><span><b>${esc(o.id)}</b><br><small>${esc(o.deliveryAddress||"Pickup details in dispatch board")}</small></span><span class="lg-ok">Ready</span></div>`).join("") : `<div class="lg-row">All local dispatches are claimed.</div>`;
    }, e => console.warn("Realtime order listener:", e));
  }
  function listenCollection(name, targetId, empty) {
    const target = document.getElementById(targetId); if (!target || !db()) return;
    db().collection(name).onSnapshot(s => { const rows=s.docs.map(d=>({id:d.id,...d.data()})); target.innerHTML=rows.length?rows.map(x=>`<div class="lg-row"><span><b>${esc(x.name||x.title||x.id)}</b><br><small>${esc(x.location||x.region||x.status||"")}</small></span><span>${esc(x.status||x.activeFleet||"")}</span></div>`).join(""):`<div class="lg-row">${empty}</div>`; }, e => { target.innerHTML=`<div class="lg-row">Unable to read ${name} from Firebase.</div>`; console.warn(name,e); });
  }
  window.LogisticsRealtime = { start() { listenUser(); listenOrders(); listenCollection("logisticsHubs","rtHubRows","No logistics hubs have been added yet."); listenCollection("logisticsIncidents","rtIncidentRows","No SOS incidents recorded."); } };
  document.addEventListener("DOMContentLoaded", () => window.LogisticsRealtime.start());
})();
