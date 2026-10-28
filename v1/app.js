/**
 * Hakuba Ski Resort Interactive Guide - JavaScript Application
 * Updated: Pixel-perfect card alignment & Resort Playbooks (Transportation & Member Zone Split)
 */

document.addEventListener("DOMContentLoaded", () => {
  let map;
  const markersMap = new Map();
  let currentFilter = "all";
  let currentSort = "north-south";
  let searchQuery = "";
  let activePlaybookResort = "tsugaike";

  // 1. Initialize Leaflet Map (100% Free Base Maps with Zero Blocking)
  function initMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Centered around Hakuba valley
    map = L.map("map", {
      center: [36.65, 137.86],
      zoom: 11,
      scrollWheelZoom: true
    });

    // Layer 1: Esri Dark Gray Canvas (Default - Sleek, Dark, No API Key, No Block)
    const esriDarkBase = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; GIS Community',
        maxZoom: 16
      }
    ).addTo(map);

    const esriDarkRef = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '',
        maxZoom: 16
      }
    ).addTo(map);

    const darkGroup = L.layerGroup([esriDarkBase, esriDarkRef]);

    // Layer 2: GSI Japan Pale Tone (日本國土地理院官方淡色地圖 - 100% 免費無阻擋、日文雪場地名最精準)
    const gsiPale = L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      {
        attribution: '&copy; <a href="https://maps.gsi.go.jp/">國土地理院 (GSI Japan)</a>',
        maxZoom: 18
      }
    );

    // Layer 3: Esri World Imagery (雪山真實高解析衛星空照圖 - 俯瞰北阿爾卑斯雪峰)
    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> Earthstar Geographics',
        maxZoom: 17
      }
    );

    // Free layer toggle control (All 100% free with NO API keys and NO blocking!)
    L.control.layers({
      "🌙 質感暗黑底圖 (Esri 免費版)": darkGroup,
      "🗾 國土地理院地圖 (日本官方無阻擋)": gsiPale,
      "🛰️ 雪山真實衛星空照圖 (高解析度)": esriSatellite
    }, null, { position: "topright" }).addTo(map);

    // Marker for Departure (Omachi)
    const omachi = HAKUBA_DATA.departure;
    const startIcon = L.divIcon({
      className: "custom-pin start-pin",
      html: `★`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });

    const startMarker = L.marker([omachi.lat, omachi.lng], { icon: startIcon }).addTo(map);
    startMarker.bindPopup(`
      <div class="map-popup-wrap">
        <div class="popup-title" style="color: #34d399;">🚗 ${omachi.shortName}</div>
        <div class="popup-desc">${omachi.name}<br><strong>自駕出發點</strong>：${omachi.note}</div>
      </div>
    `);

    // Route coordinates for visual path
    const routeCoordinates = [[omachi.lat, omachi.lng]];

    // Markers for the 6 elite resorts
    HAKUBA_DATA.resorts.forEach((resort) => {
      routeCoordinates.push([resort.lat, resort.lng]);

      const resortIcon = L.divIcon({
        className: "custom-pin",
        html: `<span>${resort.order}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const marker = L.marker([resort.lat, resort.lng], { icon: resortIcon }).addTo(map);
      markersMap.set(resort.id, marker);

      marker.bindPopup(`
        <div class="map-popup-wrap">
          <div class="popup-title">#${resort.order} ${resort.name}</div>
          <div class="popup-desc">${resort.tagline}<br>
            ⏱️ <strong>大町車程（雪地）</strong>：${resort.driveTime.snow}<br>
            🏷️ <strong>最優早鳥</strong>：<span style="color:#34d399; font-weight:700;">${resort.earlyBird.lowestPrice}</span>（截止：${resort.earlyBird.deadline}）<br>
            ❄️ <strong>標高</strong>：${resort.elevation.base}m – ${resort.elevation.top}m
          </div>
          <button class="popup-btn" onclick="window.openResortModal('${resort.id}')">查看玩法與早鳥 ➜</button>
        </div>
      `);
    });

    // Draw visual guiding path along Route 148
    L.polyline(routeCoordinates, {
      color: "#38bdf8",
      weight: 2,
      opacity: 0.35,
      dashArray: "6, 8"
    }).addTo(map);
  }

  // 2. Render Resort Cards with Pixel-Perfect Alignment
  function renderResorts() {
    const grid = document.getElementById("resorts-grid");
    if (!grid) return;

    let list = [...HAKUBA_DATA.resorts];

    // Filter
    if (currentFilter === "beginner") {
      list = list.filter((r) => r.beginnerRating >= 4);
    } else if (currentFilter === "powder") {
      list = list.filter((r) => r.powderRating >= 4.5);
    } else if (currentFilter === "advanced") {
      list = list.filter((r) => r.advancedRating >= 4.5);
    } else if (currentFilter === "scenery") {
      list = list.filter((r) => r.sceneryRating >= 4.5);
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.jpName.toLowerCase().includes(q) ||
          r.enName.toLowerCase().includes(q) ||
          r.tagline.toLowerCase().includes(q) ||
          r.earlyBird.bestSources.toLowerCase().includes(q) ||
          r.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Sort
    if (currentSort === "north-south") {
      list.sort((a, b) => a.order - b.order);
    } else if (currentSort === "distance") {
      list.sort((a, b) => a.driveTime.distanceKm - b.driveTime.distanceKm);
    } else if (currentSort === "elevation") {
      list.sort((a, b) => b.elevation.top - a.elevation.top);
    } else if (currentSort === "beginner") {
      list.sort((a, b) => b.beginnerRating - a.beginnerRating);
    } else if (currentSort === "earlybird") {
      list.sort((a, b) => parseInt(a.earlyBird.lowestPrice.replace(/[^0-9]/g, '')) - parseInt(b.earlyBird.lowestPrice.replace(/[^0-9]/g, '')));
    }

    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
          🔍 未找到符合條件的雪場，請嘗試更換篩選條件或搜尋關鍵字。
        </div>
      `;
      return;
    }

    list.forEach((resort) => {
      const card = document.createElement("div");
      card.className = "resort-card";
      card.id = `card-${resort.id}`;

      // El Nino Badge style
      let elNinoClass = "elnino-med";
      let elNinoLabel = `抗暖 ★${resort.elNino.resilienceRating}`;
      if (resort.elNino.resilienceRating >= 4.5) {
        elNinoClass = "elnino-high";
        elNinoLabel = `抗暖極佳 ★${resort.elNino.resilienceRating}`;
      } else if (resort.elNino.resilienceRating <= 2) {
        elNinoClass = "elnino-low";
        elNinoLabel = `抗暖偏弱 ★${resort.elNino.resilienceRating}`;
      }

      card.innerHTML = `
        <div class="card-top">
          <div class="card-order-badge">#${resort.order}</div>
          <div class="card-tags">
            <span class="tag-badge ${elNinoClass}">❄️ ${elNinoLabel}</span>
            <span class="tag-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">新手 ★${resort.beginnerRating}</span>
            <span class="tag-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">進階 ★${resort.advancedRating}</span>
          </div>
        </div>

        <div class="card-title-group">
          <h3 class="resort-name">${resort.name}</h3>
          <div class="resort-jpName">${resort.jpName} / ${resort.enName}</div>
        </div>

        <p class="resort-tagline">${resort.tagline}</p>

        <!-- Early Bird Highlight Box (Style C Amber Gold Highlight) -->
        <div class="card-earlybird-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.78rem; font-weight: 700; color: #fbbf24;">🏷️ 最便宜早鳥票</span>
            <span style="font-size: 1.15rem; font-weight: 800; color: #fbbf24;">${resort.earlyBird.lowestPrice}</span>
          </div>
          <div style="font-size: 0.76rem; color: var(--text-dim); display: flex; justify-content: space-between;">
            <span>截止：<strong style="color:#f59e0b">${resort.earlyBird.deadline}</strong></span>
            <span>定價：<del>${resort.earlyBird.regularPrice}</del></span>
          </div>
          <div style="font-size: 0.75rem; color: #fde68a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${resort.earlyBird.discountInfo}
          </div>
        </div>

        <!-- Slope bar (Height strictly aligned) -->
        <div class="slope-bar-wrap">
          <div class="slope-bar-labels">
            <span>初級 ${resort.difficulty.beginner}%</span>
            <span>中級 ${resort.difficulty.intermediate}%</span>
            <span>高級 ${resort.difficulty.advanced}%</span>
          </div>
          <div class="slope-bar">
            <div class="slope-segment green" style="width: ${resort.difficulty.beginner}%" title="初級道"></div>
            <div class="slope-segment red" style="width: ${resort.difficulty.intermediate}%" title="中級道"></div>
            <div class="slope-segment black" style="width: ${resort.difficulty.advanced}%" title="高級道"></div>
          </div>
        </div>

        <!-- Stats Grid (Height strictly aligned) -->
        <div class="card-stats-grid">
          <div class="stat-item">
            <span class="stat-label">山頂標高 / 落差</span>
            <span class="stat-val accent">${resort.elevation.top} m <small style="font-size:0.72rem; color:var(--text-muted)">(${resort.elevation.drop}m)</small></span>
          </div>
          <div class="stat-item">
            <span class="stat-label">雪道數 / 面積</span>
            <span class="stat-val">${resort.courseCount} 條 / ${resort.areaHa} ha</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">歷年最深積雪</span>
            <span class="stat-val">${resort.maxSnowDepth}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">早鳥通路</span>
            <span class="stat-val" style="font-size:0.8rem; color:#38bdf8;">${resort.earlyBird.bestSources.split('/')[0]}等</span>
          </div>
        </div>

        <!-- Quick info line (Height strictly aligned) -->
        <div class="card-quick-info">
          <div class="quick-info-line">
            <span class="quick-icon">🚗</span>
            <span>大町雪地：<strong>${resort.driveTime.snow}</strong>（${resort.driveTime.distanceKm}km）</span>
          </div>
          <div class="quick-info-line">
            <span class="quick-icon">🅿️</span>
            <span>停車場：${resort.parking.capacity} 台（${resort.parking.fee}）</span>
          </div>
        </div>

        <!-- Actions (Pinned to bottom) -->
        <div class="card-actions">
          <button class="btn-detail" onclick="window.openResortModal('${resort.id}')">
            <span>分流攻略與早鳥</span>
            <span>➜</span>
          </button>
          <button class="btn-map-locate" title="地圖定位" onclick="window.locateOnMap('${resort.id}')">
            📍 定位
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // 3. Render Resort Playbooks (Replaced old 3-day timetable)
  function renderPlaybooks() {
    const selectorWrap = document.getElementById("playbook-resort-tabs");
    const contentWrap = document.getElementById("playbook-resort-content");
    if (!selectorWrap || !contentWrap) return;

    // Build tabs
    selectorWrap.innerHTML = "";
    HAKUBA_DATA.resorts.forEach((r) => {
      const btn = document.createElement("button");
      btn.className = `nav-btn ${r.id === activePlaybookResort ? "active" : ""}`;
      btn.innerHTML = `#${r.order} ${r.name}`;
      btn.addEventListener("click", () => {
        activePlaybookResort = r.id;
        renderPlaybooks();
      });
      selectorWrap.appendChild(btn);
    });

    // Build content for active resort
    const r = HAKUBA_DATA.resorts.find((item) => item.id === activePlaybookResort);
    if (!r) return;

    contentWrap.innerHTML = `
      <div class="day-card" style="border-color: rgba(56, 189, 248, 0.35);">
        <div class="day-header">
          <div class="day-title-wrap">
            <span class="day-badge">#${r.order}</span>
            <div>
              <h3 class="day-title">${r.name}（${r.jpName}）</h3>
              <span class="day-date" style="color: var(--text-dim);">${r.tagline}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="day-theme" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">
              🏷️ 最優早鳥：${r.earlyBird.lowestPrice}（截止 ${r.earlyBird.deadline}）
            </span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; margin-bottom: 20px;">
          
          <!-- 1. Transport & Parking -->
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px;">
            <div style="font-weight: 700; color: #38bdf8; font-size: 1rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🚗</span> <span>大町交通與停車建議</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              ${r.playbook.transport}
            </p>
          </div>

          <!-- 2. Best Timing -->
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px;">
            <div style="font-weight: 700; color: #fbbf24; font-size: 1rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span> <span>何時推薦挑選這座雪場？</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.6;">
              ${r.playbook.bestTiming}
            </p>
          </div>

        </div>

        <!-- 3. Member Zone Breakdown -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          
          <div style="background: rgba(34, 197, 94, 0.06); border-left: 4px solid #22c55e; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 18px;">
            <div style="font-weight: 700; color: #4ade80; font-size: 0.95rem; margin-bottom: 4px;">
              🔰 初學 / 新手推薦玩樂區域
            </div>
            <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
              ${r.playbook.beginnerZone}
            </div>
          </div>

          <div style="background: rgba(56, 189, 248, 0.06); border-left: 4px solid #38bdf8; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 18px;">
            <div style="font-weight: 700; color: #38bdf8; font-size: 0.95rem; margin-bottom: 4px;">
              🏂 中級巡航 / 雕琢技術區域
            </div>
            <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
              ${r.playbook.intermediateZone}
            </div>
          </div>

          <div style="background: rgba(168, 85, 247, 0.06); border-left: 4px solid #a855f7; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 18px;">
            <div style="font-weight: 700; color: #c084fc; font-size: 0.95rem; margin-bottom: 4px;">
              ⚡ 進階高手 / 奧運賽道與野雪粉雪區域
            </div>
            <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
              ${r.playbook.advancedZone}
            </div>
          </div>

          <div style="background: rgba(245, 158, 11, 0.06); border-left: 4px solid #f59e0b; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 18px;">
            <div style="font-weight: 700; color: #fbbf24; font-size: 0.95rem; margin-bottom: 4px;">
              ☕ 絕景打卡 / 拍照散步 / 溫泉放鬆區域
            </div>
            <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
              ${r.playbook.sceneryZone}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // 4. Modal Details Display
  window.openResortModal = function (resortId) {
    const resort = HAKUBA_DATA.resorts.find((r) => r.id === resortId);
    if (!resort) return;

    const modal = document.getElementById("resort-modal");
    if (!modal) return;

    document.getElementById("modal-resort-name").textContent = `#${resort.order} ${resort.name}`;
    document.getElementById("modal-resort-sub").textContent = `${resort.jpName} | ${resort.enName} | ${resort.tagline}`;

    // Fill Tab 1: Overview & Slopes
    const tabOverview = document.getElementById("tab-overview");
    tabOverview.innerHTML = `
      <div class="modal-stat-grid">
        <div class="modal-stat-box">
          <div class="modal-stat-label">標高範圍</div>
          <div class="modal-stat-val">${resort.elevation.base}m – ${resort.elevation.top}m</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">垂直落差</div>
          <div class="modal-stat-val">${resort.elevation.drop} m</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">面積 / 雪道數</div>
          <div class="modal-stat-val">${resort.areaHa} ha / ${resort.courseCount} 條</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">坡度範圍</div>
          <div class="modal-stat-val">${resort.slopeRange}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">新手友善度</div>
          <div class="modal-stat-val" style="color: #38bdf8;">★ ${resort.beginnerRating} / 5</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">進階挑戰性</div>
          <div class="modal-stat-val" style="color: #c084fc;">★ ${resort.advancedRating} / 5</div>
        </div>
      </div>

      <div class="slope-bar-wrap" style="margin: 20px 0;">
        <div class="slope-bar-labels">
          <span>初級綠線：${resort.difficulty.beginner}%</span>
          <span>中級紅線：${resort.difficulty.intermediate}%</span>
          <span>高級黑線：${resort.difficulty.advanced}%</span>
        </div>
        <div class="slope-bar" style="height: 12px;">
          <div class="slope-segment green" style="width: ${resort.difficulty.beginner}%"></div>
          <div class="slope-segment red" style="width: ${resort.difficulty.intermediate}%"></div>
          <div class="slope-segment black" style="width: ${resort.difficulty.advanced}%"></div>
        </div>
      </div>

      <div class="modal-subtitle">✨ 雪場主要亮點與特色</div>
      <ul class="modal-highlight-list">
        ${resort.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
    `;

    // Fill Tab 2: Drive & Parking
    const tabDrive = document.getElementById("tab-drive");
    tabDrive.innerHTML = `
      <div class="modal-stat-grid">
        <div class="modal-stat-box">
          <div class="modal-stat-label">大町市行車距離</div>
          <div class="modal-stat-val">${resort.driveTime.distanceKm} km</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">冬季雪地車程</div>
          <div class="modal-stat-val" style="color: #f59e0b;">${resort.driveTime.snow}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">乾燥路況車程</div>
          <div class="modal-stat-val">${resort.driveTime.dry}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">停車場容量</div>
          <div class="modal-stat-val">${resort.parking.capacity} 台</div>
        </div>
      </div>

      <div class="modal-subtitle">🅿️ 停車收費與推薦入口</div>
      <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); margin-bottom: 16px;">
        <p style="margin-bottom: 8px;"><strong>收費情況</strong>：<span style="color:#34d399; font-weight:700;">${resort.parking.fee}</span></p>
        <p><strong>推薦停放點</strong>：${resort.parking.recommendation}</p>
      </div>

      <div class="modal-subtitle">🛣️ 大町出發行車備註</div>
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">${resort.driveTime.note}</p>
    `;

    // Fill Tab 3: El Nino Snow Projection
    const tabElnino = document.getElementById("tab-elnino");
    tabElnino.innerHTML = `
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-weight: 700; color: #fbbf24; font-size: 1.1rem;">❄️ 聖嬰年抗暖韌性評級</span>
          <span style="font-size: 1.2rem; font-weight: 800; color: #fbbf24;">★ ${resort.elNino.resilienceRating} / 5</span>
        </div>
        <div style="font-size: 0.95rem; color: #fff; font-weight: 600;">現況推估：${resort.elNino.status}</div>
      </div>

      <div class="modal-subtitle">📊 深度氣候與雪質分析</div>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">
        ${resort.elNino.analysis}
      </p>

      <div class="modal-stat-grid">
        <div class="modal-stat-box">
          <div class="modal-stat-label">歷年最深積雪紀錄</div>
          <div class="modal-stat-val">${resort.maxSnowDepth}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">山頂高度優勢</div>
          <div class="modal-stat-val">${resort.elevation.top} m</div>
        </div>
      </div>
    `;

    // Fill Tab 4: Community Quotes
    const tabCommunity = document.getElementById("tab-community");
    let quotesHtml = "";
    if (resort.communitySentiment.ptt) {
      quotesHtml += `
        <div class="community-quote-box">
          <div class="quote-source">批踢踢實業坊（PTT SkiSnowboard 板友）</div>
          <div class="quote-text">「${resort.communitySentiment.ptt}」</div>
        </div>
      `;
    }
    if (resort.communitySentiment.dcard) {
      quotesHtml += `
        <div class="community-quote-box" style="border-left-color: #006aa6;">
          <div class="quote-source" style="color: #38bdf8;">Dcard 旅遊與滑雪板友</div>
          <div class="quote-text">「${resort.communitySentiment.dcard}」</div>
        </div>
      `;
    }
    if (resort.communitySentiment.threads) {
      quotesHtml += `
        <div class="community-quote-box" style="border-left-color: #a855f7;">
          <div class="quote-source" style="color: #c084fc;">Threads 社群真實回饋</div>
          <div class="quote-text">「${resort.communitySentiment.threads}」</div>
        </div>
      `;
    }
    if (resort.communitySentiment.reddit) {
      quotesHtml += `
        <div class="community-quote-box" style="border-left-color: #ff4500;">
          <div class="quote-source" style="color: #fb923c;">Reddit r/japantravel & r/snowboarding</div>
          <div class="quote-text">"${resort.communitySentiment.reddit}"</div>
        </div>
      `;
    }

    quotesHtml += `
      <div style="margin-top: 18px; padding: 14px; background: rgba(56, 189, 248, 0.1); border-radius: var(--radius-sm); border: 1px solid rgba(56, 189, 248, 0.3);">
        <strong style="color: #38bdf8;">📌 總體綜合結語：</strong>
        <span style="color: #e2e8f0; font-size: 0.92rem;">${resort.communitySentiment.verdict}</span>
      </div>
    `;

    tabCommunity.innerHTML = quotesHtml;

    // Fill Tab 5: Pricing & Early Bird
    const tabPricing = document.getElementById("tab-pricing");
    tabPricing.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(56,189,248,0.15)); border: 1px solid rgba(16,185,129,0.4); border-radius: var(--radius-md); padding: 20px; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:1.15rem; font-weight:800; color:#34d399;">🏷️ 最便宜早鳥票（早割リフト券）</span>
          <span style="font-size:1.6rem; font-weight:800; color:#34d399;">${resort.earlyBird.lowestPrice}</span>
        </div>
        <div style="font-size:0.95rem; color:#fff; font-weight:600; margin-bottom:6px;">
          早鳥截止日期：<span style="color:#fbbf24; font-size:1.05rem;">${resort.earlyBird.deadline}</span>
        </div>
        <div style="font-size:0.88rem; color:#cbd5e1; margin-bottom:10px;">
          ${resort.earlyBird.discountInfo}
        </div>
        <div style="background:rgba(0,0,0,0.3); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.85rem; color:#94a3b8;">
          🌐 <strong>推薦購買平台</strong>：${resort.earlyBird.bestSources}<br>
          📲 <strong>取票方式</strong>：${resort.earlyBird.redemption}
        </div>
      </div>

      <div class="modal-stat-grid">
        <div class="modal-stat-box">
          <div class="modal-stat-label">現場窗口通常價</div>
          <div class="modal-stat-val" style="color: #f87171;">${resort.earlyBird.regularPrice}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">最優惠早鳥價</div>
          <div class="modal-stat-val" style="color: #34d399;">${resort.earlyBird.lowestPrice}</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-label">Hakuba Valley 共通券單日</div>
          <div class="modal-stat-val">¥11,100</div>
        </div>
      </div>

      <div class="modal-subtitle">💡 購買建議</div>
      <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
        <p style="margin-bottom: 8px; color: var(--text-main); font-size: 0.92rem;">
          強烈建議於 <strong>${resort.earlyBird.deadline}</strong> 前在 WAmazing Snow（支援中文與退改）或 SURF&SNOW / Winter Plus 購買早鳥票。
        </p>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          比起昂貴且綁死連續天數的 Hakuba Valley 全山 3 日券（¥32,200），單場購買早鳥票每人 3 天僅需約 ¥20,400，整團現省近 10 萬日圓！
        </p>
      </div>
    `;

    // Reset to tab 1
    switchTab("overview");

    modal.classList.add("active");
  };

  // Switch tabs in modal
  function switchTab(tabName) {
    document.querySelectorAll(".modal-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `tab-${tabName}`);
    });
  }

  // Close modal
  function closeModal() {
    const modal = document.getElementById("resort-modal");
    if (modal) modal.classList.remove("active");
  }

  // Locate on map
  window.locateOnMap = function (resortId) {
    const resort = HAKUBA_DATA.resorts.find((r) => r.id === resortId);
    if (!resort || !map) return;

    // Scroll to map
    const mapCard = document.getElementById("map-section");
    if (mapCard) {
      mapCard.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      map.flyTo([resort.lat, resort.lng], 13, { duration: 1.2 });
      const marker = markersMap.get(resortId);
      if (marker) marker.openPopup();
    }, 400);
  };

  // 5. Setup Event Listeners
  function setupEvents() {
    // Nav smooth scroll
    document.querySelectorAll(".nav-btn[data-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn[data-target]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Filter Chips
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentFilter = chip.dataset.filter;
        renderResorts();
      });
    });

    // Sort Select
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderResorts();
      });
    }

    // Search Input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderResorts();
      });
    }

    // Modal tabs
    document.querySelectorAll(".modal-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchTab(btn.dataset.tab);
      });
    });

    // Modal Close
    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    const overlay = document.getElementById("resort-modal");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    // Keydown ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // Interactive Ticket Calculator
    const calcSlider = document.getElementById("calc-days");
    const calcPeople = document.getElementById("calc-people");
    if (calcSlider && calcPeople) {
      const updateCalc = () => {
        const days = parseInt(calcSlider.value);
        const people = parseInt(calcPeople.value);
        document.getElementById("calc-days-val").textContent = `${days} 天`;
        document.getElementById("calc-people-val").textContent = `${people} 人`;

        // Rates for Hakuba Valley All Valley Pass
        const passPricePerPerson = days === 3 ? 32200 : days === 2 ? 21800 : 11100;
        const passTotal = passPricePerPerson * people;

        // Early Bird tickets: Day 1 Tsugaike (6,500), Day 2 Happo (8,300), Day 3 Cortina/Iwatake (5,600)
        let singlePricePerPerson = 0;
        if (days === 1) singlePricePerPerson = 6500;
        else if (days === 2) singlePricePerPerson = 6500 + 8300; // 14,800
        else if (days === 3) singlePricePerPerson = 6500 + 8300 + 5600; // 20,400

        const singleTotal = singlePricePerPerson * people;
        const savings = passTotal - singleTotal;

        document.getElementById("calc-pass-total").textContent = `¥${passTotal.toLocaleString()}`;
        document.getElementById("calc-single-total").textContent = `¥${singleTotal.toLocaleString()}`;
        document.getElementById("calc-savings-total").textContent = `¥${savings.toLocaleString()}`;
        document.getElementById("calc-savings-twd").textContent = `約 NT$ ${Math.round(savings * 0.215).toLocaleString()}`;
      };

      calcSlider.addEventListener("input", updateCalc);
      calcPeople.addEventListener("input", updateCalc);
    }
  }

  // 6. Render Ski Rentals Guide
  function renderRentals() {
    const grid = document.getElementById("rentals-grid");
    if (!grid || !HAKUBA_DATA.rentals) return;

    grid.innerHTML = "";
    HAKUBA_DATA.rentals.forEach((r) => {
      const card = document.createElement("div");
      card.className = "rental-card";
      card.innerHTML = `
        <span class="rental-badge ${r.badgeType}">${r.badge}</span>
        <h3 class="rental-title">${r.name}</h3>
        <p class="rental-features">${r.tagline}</p>
        
        <div class="rental-price-tag">
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:2px;">3天全套（雪板+雪靴）預估：</div>
          <div class="rental-price-main">${r.price3Day}</div>
        </div>

        <ul class="modal-highlight-list" style="margin-bottom: 14px;">
          ${r.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        ${r.advancedOptions ? `
          <div class="rental-advanced-box">
            <div class="rental-advanced-header">
              <span class="rental-advanced-badge">${r.advancedOptions.title}</span>
            </div>
            <div class="rental-advanced-price">${r.advancedOptions.price}</div>
            <div class="rental-advanced-gear"><strong>升級裝備：</strong>${r.advancedOptions.gear}</div>
            <div class="rental-advanced-feat"><strong>特色說明：</strong>${r.advancedOptions.feature}</div>
          </div>
        ` : ''}

        <div class="rental-pros-cons">
          <div><strong style="color:#fbbf24;">✔ 優勢：</strong>${r.pros}</div>
          <div><strong style="color:#f87171;">✖ 注意：</strong>${r.cons}</div>
        </div>

        <a href="${r.bookingUrl}" target="_blank" rel="noopener" class="rental-link-btn">
          前往官網線上預約 ➜
        </a>
      `;
      grid.appendChild(card);
    });
  }

  // Init application
  initMap();
  renderResorts();
  renderPlaybooks();
  renderRentals();
  setupEvents();
});
