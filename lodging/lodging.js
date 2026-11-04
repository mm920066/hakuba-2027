/* 白馬 2027 — 住宿比較頁 */
(() => {
  const D = window.LODGING;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nt = n => 'NT$' + Math.round(n).toLocaleString('en-US');
  const RES = Object.fromEntries(D.resorts.map(r => [r.id, r]));
  const RNAME = { cortina: 'Cortina', norikura: '乘鞍', tsugaike: '栂池', iwatake: '岩岳', happo: '八方', kashimayari: '鹿島槍' };
  const L = D.lodgings;
  const byId = Object.fromEntries(L.map(l => [l.id, l]));
  const circled = n => '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳'[n - 1] || n;
  const hasOnsen = l => l.facilities.some(f => /溫泉/.test(f) && !/不是|沒有/.test(f));
  const mealTag = l => l.meals === '早晚' ? '含早晚餐' : l.meals === '早' ? '含早餐' : '不含早餐';
  const ext = { target: '_blank', rel: 'noopener' };
  const extAttr = 'target="_blank" rel="noopener"';

  $('#fx').textContent = D.fx.JPY_TWD;
  $('#fxdate').textContent = D.fx.date;
  $('#upd').textContent = D.updated;

  /* ---------- deadlines ---------- */
  const today = new Date(D.updated + 'T00:00:00+09:00');
  const DL = [
    { date: '2026-11-18', id: 'bettei-shirouma', what: '免費取消截止' },
    { date: '2026-11-19', id: 'eve-plaza', what: '特價方案預訂截止' },
    { date: '2026-12-18', id: 'summer-leaves', what: '免費取消截止' },
  ];
  $('#deadlines').innerHTML = DL.map(d => {
    const days = Math.round((new Date(d.date + 'T00:00:00+09:00') - today) / 864e5);
    const [, m, dd] = d.date.split('-');
    return `<li><b>${+m}/${+dd}</b>${circled(byId[d.id].no)} ${esc(byId[d.id].short)} ${d.what}<span>（還有 ${days} 天）</span></li>`;
  }).join('');

  /* ---------- picks ---------- */
  const PICKS = [
    { id: 'shiroi-terrace', k: 'CP 值最高', why: '含早、掛流溫泉＋3 個免費包場風呂、Booking 8.4' },
    { id: 'eve-plaza', k: '住雪場旁邊', why: '栂池雪道走路 30 秒、乾燥室、じゃらん 4.6；晚餐 4.8 分可加' },
    { id: 'summer-leaves', k: '品質最穩', why: 'Booking 9.3（99 則）、含早、12/18 前免費取消' },
    { id: 'exce-hakuba', k: '住得最寬', why: '20–30㎡ 公寓、每間有廚房和衛浴、Booking 8.5' },
    { id: 'hiyodori', k: '最省錢', why: '栂池雪場走路 1 分、乾燥室；設備陽春、評論只有 2 則' },
    { id: 'bettei-shirouma', k: '大家住一起', why: '整棟 4 房 10 床最便宜，但 Booking 上限 8 人，要先問' },
  ];
  $('#pick-list').innerHTML = PICKS.map(p => {
    const l = byId[p.id];
    return `<a class="lg-pick" href="#c-${l.id}" data-jump="${l.id}">
      <span class="lg-pick__k">${p.k}</span>
      <span class="lg-pick__n">${circled(l.no)} ${esc(l.short)}</span>
      <span class="lg-pick__p">${nt(l.pp)}<small> / 人 / 晚・${mealTag(l)}</small></span>
      <span class="lg-pick__w">${esc(p.why)}</span>
      <span class="lg-pick__go">看詳細 ↓</span></a>`;
  }).join('');

  /* ---------- cards ---------- */
  const maxMin = 70;
  function card(l) {
    const b = l.book[0];
    const dist = Object.keys(RNAME).map(k => {
      const m = l.dist[k]; if (m == null) return '';
      const w = Math.min(100, m / maxMin * 100);
      return `<span>${RNAME[k]}</span><span class="lg-dbar"><i class="${k === l.nearest ? 'is-near' : ''}" style="width:${w}%"></i></span><em>${m} 分</em>`;
    }).join('');
    const tags = [
      `<span class="lg-tag ${l.meals ? 'lg-tag--ok' : ''}">${mealTag(l)}</span>`,
      hasOnsen(l) ? '<span class="lg-tag lg-tag--ok">♨ 溫泉</span>' : '',
      `<span class="lg-tag ${/免費/.test(l.cancel) ? 'lg-tag--ok' : /不可/.test(l.cancel) ? 'lg-tag--warn' : ''}">${esc(l.cancel)}</span>`,
      `<span class="lg-tag">${l.tax ? '含稅' : '未含稅'}</span>`,
      l.out ? '<span class="lg-tag lg-tag--out">建議淘汰</span>' : '',
    ].join('');
    const plans = l.plans.length ? `<details class="lg-more"><summary>其他方案（${l.plans.length}）</summary>
      <table><tbody>${l.plans.map(p => `<tr><td>${esc(p[0])}</td><td class="n">${nt(p[1])}/晚</td><td class="n">${nt(p[2])}</td></tr>`).join('')}</tbody></table>
      <p>${esc(l.note)}</p></details>` : `<details class="lg-more"><summary>價格說明</summary><p>${esc(l.note)}</p></details>`;
    return `<article class="lg-card ${l.out ? 'is-out' : ''}" id="c-${l.id}">
      <a class="lg-card__top" href="${esc(b[1])}" ${extAttr}>
        <div class="lg-card__no">${circled(l.no)}・${esc(l.type)}</div>
        <h3 class="lg-card__name"><span>${esc(l.name)}</span> <small>↗ ${esc(b[0])}</small></h3>
        <div class="lg-card__type">${esc(l.area)}</div>
      </a>
      <div class="lg-card__body">
        <div class="lg-price"><span class="lg-price__v">${nt(l.pp)}</span><span class="lg-price__u">/ 人 / 晚</span>
          <span class="lg-price__t">三晚 4 間總價 ${nt(l.total)}・${esc(l.plan)}${l.meals ? '' : `・含早換算 ${nt(l.ppBreakfast)}`}</span></div>
        <div class="lg-tags">${tags}</div>
        ${l.warn ? `<div class="lg-alert">⚠️ ${esc(l.warn)}</div>` : ''}
        ${l.out ? `<div class="lg-alert lg-alert--out">淘汰原因：${esc(l.out)}</div>` : ''}
        <dl class="lg-kv">
          <dt>評價</dt><dd>${esc(l.ratingText)}${l.ratingNote ? `<br><span class="muted">${esc(l.ratingNote)}</span>` : ''}</dd>
          <dt>4 間</dt><dd>${esc(l.fit)}</dd>
        </dl>
        <div><div class="lg-kv"><dt>車程</dt><dd class="muted">冬天估計，綠色是最近的</dd></div>
          <div class="lg-dist" style="margin-top:6px">${dist}</div></div>
        <div><h4 class="sr-only">設施</h4><div class="lg-tags">${l.facilities.slice(0, 9).map(f => `<span class="lg-tag">${esc(f)}</span>`).join('')}</div></div>
        <div class="lg-pc">
          <div><h4>好</h4><ul class="lg-list">${l.pros.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
          <div><h4>要注意</h4><ul class="lg-list">${[...l.cons, ...l.missing].slice(0, 5).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        </div>
        ${plans}
        <div class="lg-book">${l.book.map(([n, u]) => `<a class="button" href="${esc(u)}" ${extAttr}>去 ${esc(n)} 訂房 ↗</a>`).join('')}</div>
      </div></article>`;
  }

  function tableView(list) {
    return `<table class="lg-table"><thead><tr>
      <th>#</th><th>住宿（點了去訂房）</th><th>每人每晚</th><th>含早換算</th><th>三晚總價</th><th>餐</th><th>評價</th>
      <th>最近雪場</th><th>八方</th><th>栂池</th><th>取消</th></tr></thead><tbody>
      ${list.map(l => `<tr class="${l.out ? 'is-out' : ''}">
        <td>${circled(l.no)}</td>
        <td><a href="${esc(l.book[0][1])}" ${extAttr}>${esc(l.short)} ↗</a><br><span class="small muted">${esc(l.book[0][0])}${l.out ? '・淘汰' : ''}</span></td>
        <td class="n">${nt(l.pp)}</td><td class="n">${nt(l.ppBreakfast)}</td><td class="n">${nt(l.total)}</td>
        <td>${l.meals ? (l.meals === '早晚' ? '早＋晚' : '早') : '—'}</td>
        <td class="n">${l.rating ?? '—'}</td>
        <td>${RNAME[l.nearest] || '—'} ${l.dist[l.nearest] ?? ''} 分</td>
        <td class="n">${l.dist.happo ?? '—'} 分</td><td class="n">${l.dist.tsugaike ?? '—'} 分</td>
        <td>${esc(l.cancel)}${l.tax ? '' : '<br><span class="small muted">未含稅</span>'}</td></tr>`).join('')}
      </tbody></table>`;
  }

  /* ---------- sort / filter ---------- */
  const state = { sort: 'ppBreakfast', f: { hideOut: true }, view: 'cards' };
  try { const s = JSON.parse(localStorage.getItem('lg-state')); if (s) Object.assign(state, s); } catch (e) {}
  const save = () => { try { localStorage.setItem('lg-state', JSON.stringify(state)); } catch (e) {} };

  function current() {
    let list = L.filter(l =>
      (!state.f.hideOut || !l.out) && (!state.f.breakfast || l.meals) && (!state.f.onsen || hasOnsen(l)) &&
      (!state.f.rated || l.rating != null) && (!state.f.cancel || /免費/.test(l.cancel)));
    const k = state.sort;
    const val = l => k === 'rating' ? -(l.rating ?? -1) : (k === 'happo' || k === 'tsugaike') ? (l.dist[k] ?? 999) : l[k];
    return list.sort((a, b) => val(a) - val(b) || a.no - b.no);
  }
  function render() {
    const list = current();
    $('#count').textContent = `顯示 ${list.length} / ${L.length} 間` + (state.f.hideOut ? `（已隱藏 ${L.filter(l => l.out).length} 間淘汰）` : '');
    $('#cards').innerHTML = list.map(card).join('') || '<p>沒有符合的住宿，放寬一下篩選。</p>';
    $('#table').innerHTML = tableView(list);
    $('#cards').hidden = state.view !== 'cards';
    $('#table').hidden = state.view !== 'table';
    document.querySelectorAll('[data-view]').forEach(b => { const on = b.dataset.view === state.view; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    document.querySelectorAll('[data-f]').forEach(b => { const on = !!state.f[b.dataset.f]; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    $('#sort').value = state.sort;
    save();
  }
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
  document.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { state.f[b.dataset.f] = !state.f[b.dataset.f]; render(); }));
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => { state.view = b.dataset.view; render(); }));
  render();

  function jump(id) {
    const l = byId[id];
    if (l.out && state.f.hideOut) { state.f.hideOut = false; }
    if (state.view !== 'cards') state.view = 'cards';
    render();
    const el = document.getElementById('c-' + id);
    if (!el) return;
    el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    el.classList.add('is-flash'); setTimeout(() => el.classList.remove('is-flash'), 1600);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-jump]');
    if (a) { e.preventDefault(); jump(a.dataset.jump); }
  });

  /* ---------- map ---------- */
  if (window.L && L && $('#map')) {
    const map = window.L.map('map', { scrollWheelZoom: false, zoomControl: true });
    window.L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '地理院タイル' }).addTo(map);
    const pts = [];
    D.resorts.forEach(r => {
      window.L.marker([r.lat, r.lng], { icon: window.L.divIcon({ className: '', html: '<div class="lg-peak"></div>', iconSize: [20, 16], iconAnchor: [10, 16] }), keyboard: false })
        .addTo(map).bindTooltip(r.name, { permanent: true, direction: 'right', offset: [8, -8], className: 'lg-peak-label' });
      if (r.id !== 'kashimayari') pts.push([r.lat, r.lng]);
    });
    L.forEach(l => {
      if (l.lat == null) return;
      const m = window.L.marker([l.lat, l.lng], {
        icon: window.L.divIcon({ className: '', html: `<div class="lg-pin ${l.out ? 'lg-pin--out' : ''}">${l.no}</div>`, iconSize: [30, 30], iconAnchor: [15, 15] }),
        title: l.short, zIndexOffset: l.out ? 0 : 500,
      }).addTo(map);
      m.bindPopup(`<div class="lg-pop"><b>${circled(l.no)} ${esc(l.short)}</b><br>${nt(l.pp)} / 人 / 晚・${mealTag(l)}<br>評價 ${esc(l.ratingText)}<br>最近：${RNAME[l.nearest]} 約 ${l.dist[l.nearest]} 分
        ${l.out ? `<br><span style="color:#6d7176">淘汰：${esc(l.out)}</span>` : ''}
        <br><a href="${esc(l.book[0][1])}" ${extAttr}>去 ${esc(l.book[0][0])} 訂房 ↗</a>　<a href="#c-${l.id}" data-jump="${l.id}">看卡片 ↓</a></div>`);
      if (!l.out) pts.push([l.lat, l.lng]);
    });
    map.fitBounds(pts, { padding: [24, 24] });
  }

  /* ---------- scatter: 含早換算價 × 評價 ---------- */
  function chart() {
    const el = $('#chart'), tip = $('#tip');
    const W = Math.max(320, Math.min(1100, Math.round(el.clientWidth || 900)));
    const narrow = W < 640;
    const H = narrow ? 460 : 520, m = { t: 20, r: narrow ? 14 : 120, b: narrow ? 70 : 56, l: narrow ? 40 : 52 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const xs = L.map(l => l.ppBreakfast);
    const x0 = Math.floor((Math.min(...xs) - 150) / 250) * 250, x1 = Math.ceil((Math.max(...xs) + 150) / 250) * 250;
    const yMin = 6.5, yMax = 10, noRateBand = 50; // 無評分那排在 plot 下方
    const ph = ih - noRateBand;
    const X = v => m.l + (v - x0) / (x1 - x0) * iw;
    const Y = v => m.t + (yMax - v) / (yMax - yMin) * ph;
    const yNo = m.t + ph + noRateBand / 2 + 6;
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="含早換算價對評價的散佈圖"><g class="grid">`;
    for (let v = 7; v <= 10; v += 0.5) g += `<line x1="${m.l}" x2="${m.l + iw}" y1="${Y(v)}" y2="${Y(v)}"/>`;
    g += `<line x1="${m.l}" x2="${m.l + iw}" y1="${m.t + ph + 8}" y2="${m.t + ph + 8}" stroke-dasharray="3 4"/></g>`;
    // 「划算」區：便宜一半 + 8 分以上
    const mid = (x0 + x1) / 2;
    g += `<rect class="zone" x="${m.l}" y="${Y(yMax)}" width="${X(mid) - m.l}" height="${Y(8) - Y(yMax)}"/>
      <text class="zone-label" x="${m.l + 8}" y="${Y(yMax) + 18}">${narrow ? '划算區' : '划算區：便宜又 8 分以上'}</text>`;
    g += '<g class="axis">';
    for (let v = 7; v <= 10; v += 1) g += `<text x="${m.l - 10}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
    g += `<text x="${m.l - 10}" y="${yNo + 4}" text-anchor="end">無分</text>`;
    for (let v = x0; v <= x1; v += narrow ? 1000 : 500) g += `<text x="${X(v)}" y="${m.t + ih + 22}" text-anchor="middle">${v.toLocaleString('en-US')}</text>`;
    g += `</g><text class="axis-title" x="${m.l + iw / 2}" y="${H - 8}" text-anchor="middle">含早換算價（NT$ / 人 / 晚）</text>
      <text class="axis-title" x="14" y="${m.t + ph / 2}" transform="rotate(-90 14 ${m.t + ph / 2})" text-anchor="middle">評價（10 分制）</text>`;
    // 無評分的點避免重疊：依價格排序後交錯上下
    const unr = L.filter(l => l.rating == null).sort((a, b) => a.ppBreakfast - b.ppBreakfast);
    const off = {}; unr.forEach((l, i) => off[l.id] = (i % 2 ? 1 : -1) * 9);
    // 位置先算好，太近的點上下推開，避免數字疊在一起
    const P = L.map(l => ({ l, cx: X(l.ppBreakfast), cy: l.rating == null ? yNo + off[l.id] : Y(l.rating) }));
    for (let k = 0; k < 3; k++) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const a = P[i], b = P[j], dx = a.cx - b.cx, dy = a.cy - b.cy, d = Math.hypot(dx, dy);
      if (d < 25) { const push = (25 - d) / 2 + 0.5, s = dy === 0 ? 1 : Math.sign(dy); a.cy += s * push; b.cy -= s * push; }
    }
    const pos = Object.fromEntries(P.map(p => [p.l.id, p]));
    L.forEach(l => {
      const cx = pos[l.id].cx, cy = pos[l.id].cy;
      const right = cx < m.l + iw - 90;
      const LBL = { 'shiroi-terrace': [0, 30, 'middle'], 'exce-hakuba': [0, -18, 'middle'], 'eve-plaza': [-17, 4, 'end'] };
      const [ldx, ldy, la] = LBL[l.id] || [right ? 17 : -17, 4, right ? 'start' : 'end'];
      g += `<g class="dot ${l.out ? 'is-out' : ''}" tabindex="0" data-id="${l.id}" role="button" aria-label="${esc(l.short)} ${nt(l.ppBreakfast)} 評價 ${l.rating ?? '無'}">
        <circle cx="${cx}" cy="${cy}" r="12"/><text x="${cx}" y="${cy + 4}" text-anchor="middle">${l.no}</text>
        ${l.rating != null && !narrow ? `<text class="lbl" x="${cx + ldx}" y="${cy + ldy}" text-anchor="${la}">${esc(l.short)}</text>` : ''}</g>`;
    });
    el.innerHTML = g + '</svg>';
    const sec = $('#chart-sec');
    const show = (node, evt) => {
      const l = byId[node.dataset.id];
      tip.innerHTML = `<b>${circled(l.no)} ${esc(l.short)}</b><br>${nt(l.pp)} / 人 / 晚${l.meals ? '' : `（含早換算 ${nt(l.ppBreakfast)}）`}<br>${mealTag(l)}・${esc(l.cancel)}<br>評價 ${esc(l.ratingText)}<br><span style="opacity:.8">點一下看詳細</span>`;
      tip.hidden = false;
      const r = sec.getBoundingClientRect(), c = node.querySelector('circle').getBoundingClientRect();
      let left = c.right - r.left + 10, top = c.top - r.top - 10;
      if (left + 270 > r.width) left = c.left - r.left - 270;
      tip.style.left = Math.max(8, left) + 'px'; tip.style.top = top + 'px';
    };
    el.querySelectorAll('.dot').forEach(d => {
      d.addEventListener('mouseenter', e => show(d, e));
      d.addEventListener('focus', e => show(d, e));
      d.addEventListener('mouseleave', () => tip.hidden = true);
      d.addEventListener('blur', () => tip.hidden = true);
      d.addEventListener('click', () => jump(d.dataset.id));
      d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(d.dataset.id); } });
    });
  }
  chart();
  let rz, lastW = $('#chart').clientWidth;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { const w = $('#chart').clientWidth; if (Math.abs(w - lastW) > 40) { lastW = w; chart(); } }, 200); });
})();
