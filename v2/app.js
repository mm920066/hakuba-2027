/* 白馬 2027 v2 — page logic: pinned hero, resort stage, ticket planner, map, dialog. No framework. */
(function () {
  'use strict';
  const D = window.HAKUBA_DATA || (typeof HAKUBA_DATA !== "undefined" ? HAKUBA_DATA : null);
  if (!D) return;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wide = () => window.matchMedia('(min-width: 64em)').matches;
  const yen = (n) => '¥' + n.toLocaleString('ja-JP');
  const num = (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10);

  /* ---- pictures per resort (found, credited in the footer); Norikura has no honest photograph, so it is drawn ---- */
  const PIC = {
    cortina: { src: 'assets/hakuba-cortina-kokusai-ski-resort.jpg', w: 1920, h: 1440, alt: '白馬 Cortina，紅色的 Hotel Green Plaza 立在雪道底下' },
    tsugaike: { src: 'assets/tsugaike-kogen-ski-resort-8353157614.jpg', w: 1920, h: 1440, alt: '栂池高原，寬闊的雪道往白馬山谷下去' },
    iwatake: { src: 'assets/hakuba-iwatake-snow-field.jpg', w: 1920, h: 1440, alt: '岩岳的雪道，一個人滑向白馬三山' },
    happo: { src: 'assets/usagidaira.jpg', w: 1862, h: 990, alt: '八方尾根兔平，雪霧中的山脊與纜車站' },
    kashimayari: { src: 'assets/sun-alpina-kashimayari-ski-resort.jpg', w: 1920, h: 1440, alt: '鹿島槍滑雪場的雪道，上方是鹿島槍岳' },
  };
  const NORIKURA_SVG = '<svg viewBox="0 0 720 540" role="img" aria-label="乘鞍若栗平原的畫：很寬、很緩的雪坡，一條纜車線，兩排針葉林"><rect width="720" height="540" fill="#8d99a3"/><polygon points="0,250 140,120 260,200 380,90 520,180 620,130 720,200 720,540 0,540" fill="#c9d0d5"/><polygon points="0,330 720,290 720,540 0,540" fill="#edf0f2"/><polygon points="0,420 720,380 720,540 0,540" fill="#f6f7f8"/><g fill="#2f4a3f"><polygon points="60,360 80,300 100,360"/><polygon points="110,350 130,286 150,350"/><polygon points="160,344 180,282 200,344"/><polygon points="560,330 580,270 600,330"/><polygon points="610,324 630,262 650,324"/><polygon points="660,320 680,256 700,320"/></g><g fill="#1a1b1d"><rect x="250" y="300" width="6" height="90"/><rect x="420" y="250" width="6" height="110"/><rect x="590" y="200" width="6" height="120"/></g><polyline points="253,300 423,250 593,200" fill="none" stroke="#1a1b1d" stroke-width="3"/><g fill="#1a1b1d"><circle cx="300" cy="288" r="5"/><circle cx="360" cy="270" r="5"/><circle cx="500" cy="228" r="5"/></g></svg>';
  const CARD_TONE = { cortina: '#46525b', norikura: '#3f5250', tsugaike: '#414d59', iwatake: '#46534a', happo: '#3d4851', kashimayari: '#475252' };
  const ZONE_KEY = { beginner: 'beginnerZone', intermediate: 'intermediateZone', advanced: 'advancedZone', scenery: 'sceneryZone' };
  const ZONE_NAME = { beginner: '新手', intermediate: '中級', advanced: '進階', scenery: '看風景' };
  const SHORT = { cortina: 'Cortina', norikura: '乘鞍溫泉', tsugaike: '栂池高原', iwatake: '岩岳', happo: '八方尾根', kashimayari: '鹿島槍' };

  function picture(id, cls) {
    if (id === 'norikura') return '<div class="' + cls + '">' + NORIKURA_SVG + '</div>';
    const p = PIC[id];
    return '<div class="' + cls + '"><img src="' + p.src + '" width="' + p.w + '" height="' + p.h + '" alt="' + p.alt + '" loading="lazy" decoding="async"></div>';
  }
  /* the zone text, stripped of its 【label】 so the card reads as one sentence */
  function zoneText(r, who) {
    const t = r.playbook[ZONE_KEY[who]] || '';
    return t.replace(/^【([^】]+)】[：:]\s*/, '$1：');
  }
  function zoneShort(r, who) {
    const t = zoneText(r, who);
    const cut = t.indexOf('。');
    const first = cut > 0 ? t.slice(0, cut + 1) : t;
    return first.length > 64 ? first.slice(0, 62) + '…' : first;
  }

  /* ---- who am I (the live thing) ---- */
  let who = 'intermediate';
  try { who = localStorage.getItem('hakuba-who') || who; } catch (e) {}
  const whoInput = $('#who input[value="' + who + '"]');
  if (whoInput) whoInput.checked = true;
  $$('#who input').forEach((i) => i.addEventListener('change', () => {
    who = i.value;
    try { localStorage.setItem('hakuba-who', who); } catch (e) {}
    renderZones();
  }));

  /* ---- resort cards ---- */
  const track = $('#track');
  const resorts = D.resorts.slice().sort((a, b) => a.order - b.order);
  resorts.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'card';
    li.style.setProperty('--i', i);
    li.innerHTML = '<button type="button" class="card__btn" style="--card:' + CARD_TONE[r.id] + '" data-id="' + r.id + '" aria-haspopup="dialog">'
      + picture(r.id, 'card__pic')
      + '<div class="card__panel"><h3 class="card__name">' + SHORT[r.id] + '</h3><p class="card__zone" data-zone="' + r.id + '"></p></div></button>';
    track.appendChild(li);
  });
  function renderZones() {
    resorts.forEach((r) => { const el = $('[data-zone="' + r.id + '"]'); if (el) el.textContent = ZONE_NAME[who] + '去：' + zoneShort(r, who); });
  }
  renderZones();

  /* ---- the dialog ---- */
  const sheet = $('#sheet'), inner = $('#sheet-inner');
  function openSheet(id) {
    const r = resorts.find((x) => x.id === id);
    if (!r) return;
    const d = r.difficulty, e = r.elevation;
    inner.innerHTML = ''
      + '<div class="sheet__top"><div><h2 class="sheet__name" id="sheet-h">' + r.name + '</h2><p class="sheet__alt">' + r.jpName + '　' + r.enName + '</p></div><button type="button" class="sheet__close" id="sheet-close" aria-label="關閉">關閉</button></div>'
      + picture(r.id, 'sheet__pic')
      + '<p class="sheet__tag">' + r.tagline + '</p>'
      + '<h3>你該去哪一區</h3><ul class="zones">'
      + Object.keys(ZONE_KEY).map((k) => '<li class="' + (k === who ? 'is-you' : '') + '"><strong>' + ZONE_NAME[k] + '</strong>　' + zoneText(r, k) + '</li>').join('')
      + '</ul><p>' + r.playbook.bestTiming.replace(/^[^一-鿿]+/, '') + '</p>'
      + '<h3>山</h3><table><tr><td>標高</td><td>' + e.base + ' 到 ' + e.top + ' m，落差 ' + e.drop + ' m</td></tr>'
      + '<tr><td>雪道</td><td>' + r.courseCount + ' 條，' + r.areaHa + ' ha，坡度 ' + r.slopeRange + '</td></tr>'
      + '<tr><td>初中高級</td><td>' + d.beginner + ' / ' + d.intermediate + ' / ' + d.advanced + ' %</td></tr>'
      + '<tr><td>平均季最深積雪</td><td>' + r.maxSnowDepth + '（JapowDB 歷年平均）</td></tr></table>'
      + '<h3>開車與停車</h3><p>' + r.playbook.transport + '</p><p>' + r.parking.recommendation + '。停車場約 ' + r.parking.capacity + ' 格，' + r.parking.fee + '。</p>'
      + '<h3>聖嬰年的雪</h3><p><strong>' + r.elNino.status + '</strong></p><p>' + r.elNino.analysis + '</p>'
      + '<h3>大家怎麼說</h3>'
      + Object.keys(r.communitySentiment).filter((k) => k !== 'verdict').map((k) => '<p class="quote">' + r.communitySentiment[k] + '　（' + k.toUpperCase() + '）</p>').join('')
      + '<p class="sheet__verdict">' + r.communitySentiment.verdict + '</p>'
      + '<h3>2026–27 早鳥票</h3><table><tr><td>最低</td><td>' + r.earlyBird.lowestPrice + '（定價 ' + r.earlyBird.regularPrice + '）</td></tr>'
      + '<tr><td>截止</td><td>' + r.earlyBird.deadline + '</td></tr><tr><td>哪裡買</td><td>' + r.earlyBird.bestSources + '</td></tr>'
      + '<tr><td>怎麼換</td><td>' + r.earlyBird.redemption + '</td></tr></table>'
      + '<a class="button sheet__buy" href="#tickets" id="sheet-tickets">排進三天的票</a>';
    if (typeof sheet.showModal === 'function') sheet.showModal(); else sheet.setAttribute('open', '');
    $('#sheet-close').addEventListener('click', closeSheet);
    $('#sheet-tickets').addEventListener('click', closeSheet);
  }
  function closeSheet() { if (sheet.open) sheet.close(); }
  sheet.addEventListener('click', (ev) => { if (ev.target === sheet) closeSheet(); });
  track.addEventListener('click', (ev) => { const b = ev.target.closest('.card__btn'); if (b) openSheet(b.dataset.id); });

  /* ---- ticket planner ---- */
  const PRICE = {}; resorts.forEach((r) => { PRICE[r.id] = num(r.earlyBird.lowestPrice); });
  const PASS = { 1: 11100, 2: 21800, 3: 32200 };
  const picks = $$('.ticket__pick[data-day]');
  const peopleSel = $('#people');
  const DEFAULT = ['tsugaike', 'happo', 'kashimayari'];
  picks.forEach((sel, i) => {
    sel.innerHTML = resorts.map((r) => '<option value="' + r.id + '">' + SHORT[r.id] + '</option>').join('') + '<option value="rest">休息，不滑</option>';
    sel.value = DEFAULT[i];
    sel.addEventListener('change', calc);
  });
  for (let n = 1; n <= 12; n++) { const o = document.createElement('option'); o.value = n; o.textContent = n + ' 人'; if (n === 8) o.selected = true; peopleSel.appendChild(o); }
  peopleSel.addEventListener('change', calc);
  function calc() {
    let per = 0, days = 0;
    picks.forEach((sel, i) => {
      const p = sel.value === 'rest' ? 0 : PRICE[sel.value];
      if (sel.value !== 'rest') days++;
      per += p;
      $('[data-out="' + (i + 1) + '"]').textContent = sel.value === 'rest' ? '¥0' : yen(p);
    });
    const people = parseInt(peopleSel.value, 10);
    const pass = days ? PASS[days] : 0;
    const total = per * people, passTotal = pass * people, saved = passTotal - total;
    $('#per-person').textContent = yen(per);
    $('#sum-line').textContent = people + ' 個人' + (days === 3 ? '三天' : days + ' 天') + '合計 ' + yen(total) + '。同樣的人買 Hakuba Valley ' + (days === 3 ? '三' : days === 2 ? '二' : '一') + '日券要 ' + yen(passTotal) + '。';
    $('#saving-figure').textContent = (saved / 10000).toLocaleString('ja-JP', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
    const names = picks.filter((s) => s.value !== 'rest').map((s) => SHORT[s.value]).join('、');
    $('#saving-caption').textContent = people + ' 人各買' + names + '早鳥票 ' + yen(per) + '，和 Hakuba Valley ' + (days === 3 ? '三' : days === 2 ? '二' : '一') + '日券 ' + yen(pass) + ' 的差。';
  }
  calc();

  /* ---- the map (a real map, inside data-ui) ---- */
  if (window.L && $('#map')) {
    const map = L.map('map', { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '地理院タイル' }).addTo(map);
    const start = D.departure;
    const pts = [[start.lat, start.lng]];
    L.marker([start.lat, start.lng], { icon: L.divIcon({ className: '', html: '<div class="pin pin--start" title="大町">大</div>', iconSize: [30, 30], iconAnchor: [15, 15] }) }).addTo(map).bindPopup('<b>大町</b><br>每天從這裡出發');
    resorts.forEach((r) => {
      pts.push([r.lat, r.lng]);
      L.marker([r.lat, r.lng], { icon: L.divIcon({ className: '', html: '<div class="pin">' + r.order + '</div>', iconSize: [30, 30], iconAnchor: [15, 15] }) })
        .addTo(map).bindPopup('<b>' + r.name + '</b><br>大町 ' + r.driveTime.distanceKm + ' km，雪天 ' + r.driveTime.snow + '<br><a href="#" data-open="' + r.id + '">看這個雪場</a>');
    });
    const route = resorts.slice().sort((a, b) => b.order - a.order).map((r) => [r.lat, r.lng]);
    L.polyline([[start.lat, start.lng]].concat(route), { color: '#1f5c49', weight: 3, opacity: 0.9 }).addTo(map);
    map.fitBounds(pts, { padding: [28, 28] });
    map.on('popupopen', (e) => { const a = e.popup.getElement().querySelector('[data-open]'); if (a) a.addEventListener('click', (ev) => { ev.preventDefault(); map.closePopup(); openSheet(a.dataset.open); }); });
    setTimeout(() => map.invalidateSize(), 400);
  }

  /* ---- rental line-up ---- */
  const lineup = $('#lineup');
  const WHY = { sunshine: '中文 LINE，先拿板', spicy: '八方岩岳栂池，跨店換', rhythm: 'Step On，頂級 Demo', central: '八方纜車站旁', woody: '在地便宜' };
  const WHERE = { sunshine: '白馬站前', spicy: '五間店', rhythm: '八方', central: '八方', woody: '八方' };
  const PRICE3 = { sunshine: '¥16,500', spicy: '¥19,000', rhythm: '約 ¥22,000', central: '約 ¥19,000', woody: '約 ¥15,000' };
  D.rentals.forEach((s) => {
    const a = document.createElement('a');
    a.className = 'lineup__row'; a.href = s.bookingUrl; a.target = '_blank'; a.rel = 'noopener';
    const name = s.name.replace(/（.*$/, '').replace(/\s*\(.*$/, '').replace(/ Rental$/, '');
    a.innerHTML = '<span>' + name + '</span><span>' + WHY[s.id] + '</span><span class="nums">' + PRICE3[s.id] + '</span><span>' + WHERE[s.id] + '</span>';
    lineup.appendChild(a);
  });

  /* ---- motion: reveals ---- */
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('[data-reveal], .card').forEach((el, i) => { if (!el.style.getPropertyValue('--i')) { const sib = Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal')); el.style.setProperty('--i', Math.max(0, sib.indexOf(el))); } io.observe(el); });

  /* ---- the pinned hero: covers swap with scroll, ground follows ---- */
  const heroWrap = $('.hero__wrap'), heroStage = $('#hero-stage');
  const covers = $$('#covers .cover');
  let heroOn = 0;
  function hero() {
    if (reduced.matches) return;
    const rect = heroWrap.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    const idx = Math.min(covers.length - 1, Math.floor(p * covers.length));
    if (idx !== heroOn) {
      covers[heroOn].classList.remove('is-on');
      covers[idx].classList.add('is-on');
      heroOn = idx;
    }
    heroStage.style.setProperty('--ground', covers[idx].dataset.ground);
    if (!reduced.matches) {
      const local = (p * covers.length) - idx; /* 0..1 within this cover */
      covers[idx].style.setProperty('--zoom', (1 + local * 0.05).toFixed(4));
    }
  }
  heroStage.style.setProperty('--ground', covers[0].dataset.ground);

  /* ---- the stage: cards travel right to left ---- */
  const stageWrap = $('#stage-wrap');
  function stage() {
    if (!wide()) { track.style.setProperty('--tx', '0px'); $('#stage-intro').style.setProperty('--tx', '0px'); return; }
    const rect = stageWrap.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    const travel = Math.max(0, track.offsetLeft + track.scrollWidth - window.innerWidth + 300);
    const tx = (-p * travel).toFixed(1) + 'px';
    track.style.setProperty('--tx', tx);
    $('#stage-intro').style.setProperty('--tx', tx);
    if (p > 0.02) $$('.card', track).forEach((c) => c.classList.add('is-in'));
  }

  /* reveals must never depend on the observer alone: anything already on screen is shown on every scroll */
  let pending = $$('[data-reveal], .card');
  function sweep() {
    if (!pending.length) return;
    const limit = window.innerHeight * 0.96;
    pending = pending.filter((el) => { const r = el.getBoundingClientRect(); if (r.top < limit && r.bottom > 0) { el.classList.add('is-in'); return false; } return true; });
  }
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { hero(); stage(); sweep(); ticking = false; });
  }
  window.addEventListener('load', sweep);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
