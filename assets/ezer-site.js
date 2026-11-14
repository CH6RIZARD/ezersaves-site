/* Standalone behaviour for the EZER redesign pages (the canvas versions run the same logic in DCLogic). */
(function () {
  var E = window.EZER;
  var SHOTS = {
    tickets: ['assets/app-tickets.png', 'EZER Top tickets screen ranking subscriptions to cut'],
    dashboard: ['assets/app-dashboard.png', 'EZER app dashboard showing monthly burn, a Pay in 4 card and a November charge calendar']
  };
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  all('[data-shot]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-shot');
      all('[data-shot]').forEach(function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-shot') === key ? 'true' : 'false'); });
      all('[data-shotimg]').forEach(function (img) { img.src = SHOTS[key][0]; img.alt = SHOTS[key][1]; });
    });
  });

  all('[data-step]').forEach(function (b) {
    b.addEventListener('click', function () {
      all('[data-step]').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
    });
  });

  var grids = all('.calgrid'), totals = all('[data-total]');
  var shown = 0, pause = 0;
  function draw() {
    var html = E.cells(shown).map(function (c) {
      var s = '<div class="' + c.cls + '"><div class="cell-n">' + c.label + '</div>';
      if (c.has) s += '<div class="mk" style="' + c.mark + '"><span style="' + c.tile + '"><svg viewBox="0 0 24 24" aria-hidden="true" style="' + c.svg + '"><path fill="' + c.fg + '" d="' + c.d + '"/></svg></span><div class="mk-amt">' + c.amt + '</div></div>';
      return s + '</div>';
    }).join('');
    grids.forEach(function (g) { g.innerHTML = html; });
    totals.forEach(function (t) { t.textContent = E.total(shown); });
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { shown = E.count; draw(); }
  else {
    draw();
    setInterval(function () {
      if (shown < E.count) shown++;
      else if (pause >= 4) { shown = 0; pause = 0; }
      else pause++;
      draw();
    }, 700);
  }
  all('[data-replay]').forEach(function (b) { b.addEventListener('click', function () { shown = 0; pause = 0; draw(); }); });
})();
