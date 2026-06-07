// AXIIOM Logistics — Mobile App Data & Render Functions

// Data stored in memory
const appData = {
  profile: {
    picker: {
      name: 'Алексей С.',
      role: 'Сборщик',
      id: 'P-1042',
      phone: '+7 (999) 123-45-67',
      email: 'alexey.s@axiom.ru',
      warehouse: 'Склад №1',
      shift: '08:00 — 18:00',
      avatar: 'АС',
      stats: {
        ordersToday: 47,
        itemsToday: 124,
        accuracy: '99.2%',
        rating: 4.9
      }
    },
    courier: {
      name: 'Дмитрий В.',
      role: 'Курьер',
      id: 'C-2051',
      phone: '+7 (999) 765-43-21',
      email: 'dmitry.v@axiom.ru',
      vehicle: 'Mercedes Sprinter',
      plate: 'A777AA 777',
      zone: 'Центральный р-н',
      avatar: 'ДВ',
      stats: {
        deliveriesToday: 8,
        kmToday: 42,
        rating: 4.8,
        onTime: '97%'
      }
    }
  },

  pickerData: {
    stats: {
      activeOrders: 3,
      todayPicked: 47,
      itemsToday: 124,
      pendingOrders: 2
    },
    orders: [
      {
        id: 'ORD-001',
        status: 'active',
        client: 'Иван Петров',
        items: ['Мышь MX Master 3 x2', 'Клавиатура Logitech x1', 'Коврик для мыши x1'],
        picked: 1,
        address: 'Стеллаж A-12',
        priority: 'high',
        timeLeft: '25 мин',
        shelf: 'A-12'
      },
      {
        id: 'ORD-002',
        status: 'pending',
        client: 'Ольга Смирнова',
        items: ['Ноутбук Dell XPS 15 x1', 'Зарядное устройство x1'],
        picked: 0,
        address: 'Стеллаж B-04',
        priority: 'medium',
        timeLeft: '1 ч 15 мин',
        shelf: 'B-04'
      },
      {
        id: 'ORD-003',
        status: 'completed',
        client: 'Сергей Кузнецов',
        items: ['Наушники Sony x1', 'Веб-камера Logitech x1', 'Микрофон x1'],
        picked: 3,
        address: 'Стеллаж C-08',
        priority: 'low',
        timeLeft: '—',
        shelf: 'C-08'
      },
      {
        id: 'ORD-004',
        status: 'active',
        client: 'Анна Новикова',
        items: ['Монитор 27" x2', 'HDMI кабель x2'],
        picked: 1,
        address: 'Стеллаж A-03',
        priority: 'high',
        timeLeft: '40 мин',
        shelf: 'A-03'
      },
      {
        id: 'ORD-005',
        status: 'pending',
        client: 'Михаил Орлов',
        items: ['Принтер HP x1', 'Бумага A4 x5', 'Тонер x2'],
        picked: 0,
        address: 'Стеллаж D-01',
        priority: 'medium',
        timeLeft: '2 ч',
        shelf: 'D-01'
      }
    ]
  },

  courierData: {
    stats: {
      activeDeliveries: 2,
      todayDeliveries: 8,
      kmToday: 42,
      rating: 4.8
    },
    deliveries: [
      {
        id: 'DEL-001',
        status: 'active',
        client: 'Иван Петров',
        address: 'ул. Ленина, 10, кв. 45',
        items: 3,
        distance: '2.5 км',
        timeLeft: '30 мин',
        type: 'standard'
      },
      {
        id: 'DEL-002',
        status: 'pending',
        client: 'Ольга Смирнова',
        address: 'пр. Мира, 15, оф. 302',
        items: 2,
        distance: '5.1 км',
        timeLeft: '1 ч',
        type: 'express'
      },
      {
        id: 'DEL-003',
        status: 'completed',
        client: 'Сергей Кузнецов',
        address: 'ул. Гагарина, 8, кв. 12',
        items: 3,
        distance: '1.8 км',
        timeLeft: '—',
        type: 'standard'
      },
      {
        id: 'DEL-004',
        status: 'active',
        client: 'Анна Новикова',
        address: 'ул. Пушкина, 22, кв. 7',
        items: 2,
        distance: '3.2 км',
        timeLeft: '45 мин',
        type: 'standard'
      },
      {
        id: 'DEL-005',
        status: 'pending',
        client: 'Михаил Орлов',
        address: 'пр. Советский, 5, оф. 110',
        items: 3,
        distance: '7.0 км',
        timeLeft: '1 ч 30 мин',
        type: 'express'
      }
    ],
    route: [
      { stop: 1, label: 'Склад', address: 'ул. Логистическая, 1', type: 'start' },
      { stop: 2, label: 'Иван Петров', address: 'ул. Ленина, 10, кв. 45', distance: '2.5 км', type: 'mid' },
      { stop: 3, label: 'Анна Новикова', address: 'ул. Пушкина, 22, кв. 7', distance: '3.2 км', type: 'mid' },
      { stop: 4, label: 'Склад', address: 'ул. Логистическая, 1', distance: '4.0 км', type: 'end' }
    ]
  }
};

// Navigation history
let history = ['home'];

// Current role: 'picker' or 'courier'
let currentRole = localStorage.getItem('logistics_role') || 'picker';

// Theme management
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  updateThemeIcons(newTheme);
  localStorage.setItem('logistics-theme', newTheme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle .icon, .theme-toggle-small .icon-sm').forEach(icon => {
    const use = icon.querySelector('use');
    if (use) {
      use.setAttribute('href', theme === 'light' ? '#icon-moon' : '#icon-sun');
    }
  });
}

function loadTheme() {
  const saved = localStorage.getItem('logistics-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcons(saved);
}

// Role management: picker or courier
function toggleRole() {
  const toggle = document.getElementById('roleToggle');
  currentRole = currentRole === 'picker' ? 'courier' : 'picker';
  localStorage.setItem('logistics_role', currentRole);
  if (toggle) {
    toggle.style.left = currentRole === 'courier' ? '30px' : '2px';
  }
}

function switchRole(role) {
  currentRole = role;
  localStorage.setItem('logistics_role', role);
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });
  updateNav();
  if (history[history.length - 1] === 'home') {
    renderContent('home');
  } else {
    showPage('home');
  }
}

function initRole() {
  currentRole = localStorage.getItem('logistics_role') || 'picker';
  const toggle = document.getElementById('roleToggle');
  if (toggle) {
    toggle.style.left = currentRole === 'courier' ? '30px' : '2px';
  }
  const roleBtns = document.querySelectorAll('.role-btn');
  roleBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === currentRole);
  });
  updateNav();
}

function updateNav() {
  const pickerNav = document.querySelectorAll('.picker-nav');
  const courierNav = document.querySelectorAll('.courier-nav');
  if (currentRole === 'courier') {
    pickerNav.forEach(el => el.style.display = 'none');
    courierNav.forEach(el => el.style.display = '');
  } else {
    pickerNav.forEach(el => el.style.display = '');
    courierNav.forEach(el => el.style.display = 'none');
  }
}

function handleScanClick() {
  if (currentRole === 'picker') {
    showPage('scan');
  }
}

function handleProfileClick() {
  showPage('profile');
}

// Navigation
function openApp() {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  localStorage.setItem('logistics_appOpen', 'true');
  initRole();
  showPage('home');
}

function closeApp() {
  document.getElementById('landing').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  history = ['home'];
  localStorage.setItem('logistics_appOpen', 'false');
}

function showPage(pageName, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
  history.push(pageName);
  updateHeader(pageName);
  renderContent(pageName);
  localStorage.setItem('logistics_lastPage', pageName);
  localStorage.setItem('logistics_history', JSON.stringify(history));
  document.getElementById('backBtn').classList.toggle('hidden', history.length <= 1);
}

function goBack() {
  if (history.length > 1) {
    history.pop();
    const prevPage = history[history.length - 1];
    updateHeader(prevPage);
    renderContent(prevPage);
    localStorage.setItem('logistics_lastPage', prevPage);
    localStorage.setItem('logistics_history', JSON.stringify(history));
    if (history.length === 1) {
      localStorage.removeItem('logistics_lastPage');
      localStorage.removeItem('logistics_history');
      localStorage.setItem('logistics_appOpen', 'false');
    }
    document.getElementById('backBtn').classList.toggle('hidden', history.length <= 1);
  }
}

function updateHeader(pageName) {
  const titles = {
    home: 'Главная',
    orders: 'Заказы',
    scan: 'Сканер',
    deliveries: 'Доставки',
    route: 'Маршрут',
    profile: 'Профиль'
  };
  document.getElementById('appTitle').textContent = titles[pageName] || 'Главная';
}

function renderContent(pageName) {
  const content = document.getElementById('content');
  if (pageName === 'home') {
    if (currentRole === 'courier') {
      content.innerHTML = renderCourierHome();
    } else {
      content.innerHTML = renderPickerHome();
    }
  } else if (pageName === 'orders') {
    content.innerHTML = renderPickerOrders();
  } else if (pageName === 'scan') {
    content.innerHTML = renderPickerScan();
  } else if (pageName === 'deliveries') {
    content.innerHTML = renderCourierDeliveries();
  } else if (pageName === 'route') {
    content.innerHTML = renderCourierRoute();
  } else if (pageName === 'profile') {
    if (currentRole === 'courier') {
      content.innerHTML = renderCourierProfile();
    } else {
      content.innerHTML = renderPickerProfile();
    }
  }
}

// ========== PICKER PAGES ==========

function renderPickerHome() {
  const s = appData.pickerData.stats;
  const activeOrders = appData.pickerData.orders.filter(o => o.status === 'active');
  const activeOrder = activeOrders[0];

  return `
    <div class="page-content">
      <div class="dashboard-grid">
        <div class="dashboard-card wide accent" onclick="showPage('orders')">
          <div style="display:flex;align-items:center;gap:16px">
            <div style="flex:1">
              <svg class="icon" style="margin-bottom:8px"><use href="#icon-box"/></svg>
              <h4>Активные заказы</h4>
              <p style="font-size:24px;font-weight:700">${s.activeOrders} <span style="font-size:14px;font-weight:400">шт.</span></p>
            </div>
            <div style="flex:1;border-left:1px solid rgba(255,255,255,0.1);padding-left:16px">
              <svg class="icon" style="margin-bottom:8px"><use href="#icon-check"/></svg>
              <h4>Собрано сегодня</h4>
              <p style="font-size:24px;font-weight:700">${s.todayPicked} <span style="font-size:14px;font-weight:400">шт.</span></p>
            </div>
          </div>
        </div>

        <div class="dashboard-card" onclick="showPage('orders')">
          <svg class="icon"><use href="#icon-target"/></svg>
          <h4>Товаров</h4>
          <p>${s.itemsToday} шт.</p>
        </div>

        <div class="dashboard-card" onclick="showPage('orders')">
          <svg class="icon"><use href="#icon-clock"/></svg>
          <h4>Ожидают</h4>
          <p>${s.pendingOrders} заказа</p>
        </div>
      </div>

      ${activeOrder ? `
        <div class="dashboard-card wide accent" style="margin-top:12px" onclick="showPage('orders')">
          <div style="display:flex;align-items:center;gap:12px">
            <svg class="icon" style="font-size:32px"><use href="#icon-clipboard"/></svg>
            <div>
              <h4>Активный заказ</h4>
              <div style="font-size:22px;font-weight:700;color:var(--primary)">${activeOrder.id}</div>
              <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0">${activeOrder.client} &bull; Осталось: ${activeOrder.timeLeft}</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1)">
            <div style="text-align:center">
              <div style="font-size:18px;font-weight:600">${activeOrder.picked}/${activeOrder.items.length}</div>
              <div style="font-size:10px;color:var(--text-muted)">собрано</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:18px;font-weight:600">${activeOrder.shelf}</div>
              <div style="font-size:10px;color:var(--text-muted)">стеллаж</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="margin-top:16px">
        <h3 style="margin-bottom:12px">Все заказы</h3>
        ${appData.pickerData.orders.map(o => `
          <div class="order-card ${o.status}-border" onclick="showOrderDetail('${o.id}')">
            <div class="order-header">
              <span class="order-id">${o.id}</span>
              <span class="status-badge ${o.status}">${o.status === 'active' ? 'Активен' : o.status === 'pending' ? 'Ожидает' : 'Готов'}</span>
            </div>
            <div class="order-client">${o.client}</div>
            <div class="order-items">${o.items.join(', ')}</div>
            <div class="progress-bar">
              <div class="progress-fill ${o.status}" style="width:${(o.picked / o.items.length) * 100}%"></div>
            </div>
            <div class="order-meta">
              <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-location"/></svg> ${o.shelf}</span>
              <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-clock"/></svg> ${o.timeLeft}</span>
              <span class="priority-badge ${o.priority}">${o.priority === 'high' ? 'Высокий' : o.priority === 'medium' ? 'Средний' : 'Низкий'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPickerOrders() {
  let html = '<div class="page-content"><h3><svg class="icon" style="width:18px;height:18px;margin-right:8px;vertical-align:middle"><use href="#icon-list"/></svg>Все заказы на сборку</h3>';

  appData.pickerData.orders.forEach(o => {
    html += `
      <div class="order-card ${o.status}-border" onclick="showOrderDetail('${o.id}')">
        <div class="order-header">
          <span class="order-id">${o.id}</span>
          <span class="status-badge ${o.status}">${o.status === 'active' ? 'Активен' : o.status === 'pending' ? 'Ожидает' : 'Готов'}</span>
        </div>
        <div class="order-client">${o.client}</div>
        <div class="order-items">${o.items.join(', ')}</div>
        <div class="progress-bar">
          <div class="progress-fill ${o.status}" style="width:${(o.picked / o.items.length) * 100}%"></div>
        </div>
        <div class="order-meta">
          <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-location"/></svg> ${o.shelf}</span>
          <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-clock"/></svg> ${o.timeLeft}</span>
          <span class="priority-badge ${o.priority}">${o.priority === 'high' ? 'Высокий' : o.priority === 'medium' ? 'Средний' : 'Низкий'}</span>
        </div>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

function showOrderDetail(orderId) {
  const order = appData.pickerData.orders.find(o => o.id === orderId);
  if (!order) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">${order.id}</span>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>

      <div class="modal-section">
        <h4>Клиент</h4>
        <p style="font-size:16px;font-weight:600">${order.client}</p>
      </div>

      <div class="modal-section">
        <h4>Статус</h4>
        <span class="status-badge ${order.status}">${order.status === 'active' ? 'Активен' : order.status === 'pending' ? 'Ожидает' : 'Готов'}</span>
        <span class="priority-badge ${order.priority}" style="margin-left:8px">${order.priority === 'high' ? 'Высокий приоритет' : order.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}</span>
      </div>

      <div class="modal-section">
        <h4>Товары (${order.picked}/${order.items.length} собрано)</h4>
        ${order.items.map((item, i) => `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
            <svg class="icon-sm" style="width:16px;height:16px;color:${i < order.picked ? 'var(--success)' : 'var(--text-muted)'}"><use href="#icon-${i < order.picked ? 'check' : 'clock'}"/></svg>
            <span style="font-size:13px;${i < order.picked ? 'color:var(--text);text-decoration:line-through;opacity:0.6' : ''}">${item}</span>
          </div>
        `).join('')}
      </div>

      <div class="modal-section">
        <h4>Расположение</h4>
        <p style="font-size:14px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-location"/></svg> Стеллаж: <strong>${order.shelf}</strong></p>
        <p style="font-size:14px;margin-top:4px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-clock"/></svg> Осталось: <strong>${order.timeLeft}</strong></p>
      </div>

      <button style="width:100%;padding:14px;background:var(--primary);border:none;border-radius:12px;color:#fff;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px" onclick="this.closest('.modal-overlay').remove()">
        ${order.status === 'active' ? 'Продолжить сборку' : order.status === 'pending' ? 'Начать сборку' : 'Закрыть'}
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
}

function renderPickerScan() {
  const scanned = [
    { sku: 'MX-MASTER-3', name: 'Мышь MX Master 3', status: 'ok' },
    { sku: 'LOGITECH-KB', name: 'Клавиатура Logitech', status: 'ok' },
    { sku: 'DELL-XPS-15', name: 'Ноутбук Dell XPS 15', status: 'ok' }
  ];

  return `
    <div class="page-content">
      <div class="scanner-frame">
        <div class="scanner-viewport">
          <div class="scan-line"></div>
          <div class="scanner-icon">
            <svg class="icon" style="width:64px;height:64px"><use href="#icon-scan"/></svg>
          </div>
        </div>
        <p class="scanner-hint">Наведите камеру на штрихкод товара</p>
      </div>

      <h3><svg class="icon" style="width:18px;height:18px;margin-right:8px;vertical-align:middle"><use href="#icon-check"/></svg>Отсканировано</h3>
      ${scanned.map(s => `
        <div class="scan-result">
          <div>
            <div class="sku">${s.sku}</div>
            <div style="font-size:12px;color:var(--text-muted)">${s.name}</div>
          </div>
          <span class="status"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle"><use href="#icon-check"/></svg> OK</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPickerProfile() {
  const p = appData.profile.picker;
  return `
    <div class="page-content">
      <div class="profile-card">
        <div class="profile-avatar">${p.avatar}</div>
        <h3>${p.name}</h3>
        <p class="profile-group">${p.role} &bull; ${p.id}</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--primary)">${p.stats.ordersToday}</div>
          <div class="stat-label-sm">заказов</div>
        </div>
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--success)">${p.stats.itemsToday}</div>
          <div class="stat-label-sm">товаров</div>
        </div>
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--primary)">${p.stats.accuracy}</div>
          <div class="stat-label-sm">точность</div>
        </div>
      </div>

      <div class="profile-info">
        <div class="info-row">
          <span class="info-label">Склад</span>
          <span class="info-value">${p.warehouse}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Смена</span>
          <span class="info-value">${p.shift}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Телефон</span>
          <span class="info-value">${p.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${p.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Рейтинг</span>
          <span class="info-value"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;color:var(--warning)"><use href="#icon-star"/></svg> ${p.stats.rating}</span>
        </div>
      </div>
    </div>
  `;
}

// ========== COURIER PAGES ==========

function renderCourierHome() {
  const s = appData.courierData.stats;
  const activeDeliveries = appData.courierData.deliveries.filter(d => d.status === 'active');
  const nextDelivery = activeDeliveries[0];

  return `
    <div class="page-content">
      <div class="dashboard-grid">
        <div class="dashboard-card wide accent" onclick="showPage('deliveries')">
          <div style="display:flex;align-items:center;gap:16px">
            <div style="flex:1">
              <svg class="icon" style="margin-bottom:8px"><use href="#icon-truck"/></svg>
              <h4>Активные</h4>
              <p style="font-size:24px;font-weight:700">${s.activeDeliveries} <span style="font-size:14px;font-weight:400">дост.</span></p>
            </div>
            <div style="flex:1;border-left:1px solid rgba(255,255,255,0.1);padding-left:16px">
              <svg class="icon" style="margin-bottom:8px"><use href="#icon-route"/></svg>
              <h4>Сегодня</h4>
              <p style="font-size:24px;font-weight:700">${s.todayDeliveries} <span style="font-size:14px;font-weight:400">дост.</span></p>
            </div>
          </div>
        </div>

        <div class="dashboard-card" onclick="showPage('route')">
          <svg class="icon"><use href="#icon-map"/></svg>
          <h4>Пробег</h4>
          <p>${s.kmToday} км</p>
        </div>

        <div class="dashboard-card" onclick="showPage('profile')">
          <svg class="icon"><use href="#icon-star"/></svg>
          <h4>Рейтинг</h4>
          <p>${s.rating}</p>
        </div>
      </div>

      ${nextDelivery ? `
        <div class="dashboard-card wide accent" style="margin-top:12px" onclick="showPage('route')">
          <div style="display:flex;align-items:center;gap:12px">
            <svg class="icon" style="font-size:32px"><use href="#icon-location"/></svg>
            <div>
              <h4>Следующая доставка</h4>
              <div style="font-size:22px;font-weight:700;color:var(--primary)">${nextDelivery.id}</div>
              <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0">${nextDelivery.address}</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1)">
            <div style="text-align:center">
              <div style="font-size:18px;font-weight:600">${nextDelivery.distance}</div>
              <div style="font-size:10px;color:var(--text-muted)">расстояние</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:18px;font-weight:600">${nextDelivery.timeLeft}</div>
              <div style="font-size:10px;color:var(--text-muted)">осталось</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="margin-top:16px">
        <h3 style="margin-bottom:12px">Все доставки</h3>
        ${appData.courierData.deliveries.map(d => `
          <div class="delivery-card" onclick="showDeliveryDetail('${d.id}')">
            <div class="delivery-header">
              <span class="delivery-id">${d.id}</span>
              <span class="status-badge ${d.status}">${d.status === 'active' ? 'В пути' : d.status === 'pending' ? 'Ожидает' : 'Доставлен'}</span>
            </div>
            <div class="delivery-client">${d.client}</div>
            <div class="delivery-address">
              <svg class="icon-sm" style="width:14px;height:14px;flex-shrink:0"><use href="#icon-location"/></svg>
              ${d.address}
            </div>
            <div class="delivery-meta">
              <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-box"/></svg> ${d.items} товара</span>
              <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-map"/></svg> ${d.distance}</span>
              <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-clock"/></svg> ${d.timeLeft}</span>
              <span class="status-badge ${d.type}">${d.type === 'express' ? 'Экспресс' : 'Стандарт'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCourierDeliveries() {
  let html = '<div class="page-content"><h3><svg class="icon" style="width:18px;height:18px;margin-right:8px;vertical-align:middle"><use href="#icon-truck"/></svg>Мои доставки</h3>';

  appData.courierData.deliveries.forEach(d => {
    html += `
      <div class="delivery-card" onclick="showDeliveryDetail('${d.id}')">
        <div class="delivery-header">
          <span class="delivery-id">${d.id}</span>
          <span class="status-badge ${d.status}">${d.status === 'active' ? 'В пути' : d.status === 'pending' ? 'Ожидает' : 'Доставлен'}</span>
        </div>
        <div class="delivery-client">${d.client}</div>
        <div class="delivery-address">
          <svg class="icon-sm" style="width:14px;height:14px;flex-shrink:0"><use href="#icon-location"/></svg>
          ${d.address}
        </div>
        <div class="delivery-meta">
          <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-box"/></svg> ${d.items} товара</span>
          <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-map"/></svg> ${d.distance}</span>
          <span><svg class="icon-sm" style="width:14px;height:14px;vertical-align:middle"><use href="#icon-clock"/></svg> ${d.timeLeft}</span>
          <span class="status-badge ${d.type}">${d.type === 'express' ? 'Экспресс' : 'Стандарт'}</span>
        </div>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

function showDeliveryDetail(deliveryId) {
  const delivery = appData.courierData.deliveries.find(d => d.id === deliveryId);
  if (!delivery) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">${delivery.id}</span>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>

      <div class="modal-section">
        <h4>Клиент</h4>
        <p style="font-size:16px;font-weight:600">${delivery.client}</p>
      </div>

      <div class="modal-section">
        <h4>Статус</h4>
        <span class="status-badge ${delivery.status}">${delivery.status === 'active' ? 'В пути' : delivery.status === 'pending' ? 'Ожидает' : 'Доставлен'}</span>
        <span class="status-badge ${delivery.type}" style="margin-left:8px">${delivery.type === 'express' ? 'Экспресс' : 'Стандарт'}</span>
      </div>

      <div class="modal-section">
        <h4>Адрес доставки</h4>
        <p style="font-size:14px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-location"/></svg> ${delivery.address}</p>
        <p style="font-size:14px;margin-top:4px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-box"/></svg> Товаров: <strong>${delivery.items}</strong></p>
      </div>

      <div class="modal-section">
        <h4>Маршрут</h4>
        <p style="font-size:14px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-map"/></svg> Расстояние: <strong>${delivery.distance}</strong></p>
        <p style="font-size:14px;margin-top:4px"><svg class="icon-sm" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><use href="#icon-clock"/></svg> Осталось: <strong>${delivery.timeLeft}</strong></p>
      </div>

      <button style="width:100%;padding:14px;background:var(--primary);border:none;border-radius:12px;color:#fff;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px" onclick="this.closest('.modal-overlay').remove()">
        ${delivery.status === 'active' ? 'Проложить маршрут' : delivery.status === 'pending' ? 'Взять в доставку' : 'Закрыть'}
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
}

function renderCourierRoute() {
  const route = appData.courierData.route;

  let html = `
    <div class="page-content">
      <div class="route-map">
        <div class="route-map-placeholder">
          <svg class="icon"><use href="#icon-map"/></svg>
          <span>Карта маршрута</span>
          <span style="font-size:11px">4 остановки &bull; 9.7 км</span>
        </div>
      </div>

      <h3><svg class="icon" style="width:18px;height:18px;margin-right:8px;vertical-align:middle"><use href="#icon-route"/></svg>Остановки маршрута</h3>
  `;

  route.forEach((stop, index) => {
    const typeClass = stop.type === 'start' ? 'start' : stop.type === 'end' ? 'end' : 'mid';
    html += `
      <div class="route-stop">
        <div class="stop-dot ${typeClass}">${stop.stop}</div>
        <div class="stop-info">
          <h4>${stop.label}</h4>
          <p>${stop.address}</p>
          ${stop.distance ? `<span class="stop-distance">${stop.distance}</span>` : ''}
        </div>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

function renderCourierProfile() {
  const p = appData.profile.courier;
  return `
    <div class="page-content">
      <div class="profile-card">
        <div class="profile-avatar">${p.avatar}</div>
        <h3>${p.name}</h3>
        <p class="profile-group">${p.role} &bull; ${p.id}</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--primary)">${p.stats.deliveriesToday}</div>
          <div class="stat-label-sm">доставок</div>
        </div>
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--success)">${p.stats.kmToday}</div>
          <div class="stat-label-sm">км</div>
        </div>
        <div class="dashboard-card" style="text-align:center;padding:16px">
          <div class="stat-value-lg" style="color:var(--primary)">${p.stats.rating}</div>
          <div class="stat-label-sm">рейтинг</div>
        </div>
      </div>

      <div class="profile-info">
        <div class="info-row">
          <span class="info-label">Транспорт</span>
          <span class="info-value">${p.vehicle}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Госномер</span>
          <span class="info-value">${p.plate}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Зона</span>
          <span class="info-value">${p.zone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Телефон</span>
          <span class="info-value">${p.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${p.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Вовремя</span>
          <span class="info-value" style="color:var(--success)">${p.stats.onTime}</span>
        </div>
      </div>
    </div>
  `;
}

// Status bar
function updateStatus() {
  const battery = Math.floor(Math.random() * 10) + 90;
  document.querySelector('.status-bar').textContent = battery + '%';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initRole();
  setInterval(updateStatus, 60000);
  updateStatus();

  const wasAppOpen = localStorage.getItem('logistics_appOpen');
  if (wasAppOpen === 'true') {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    const lastPage = localStorage.getItem('logistics_lastPage');
    const savedHistory = localStorage.getItem('logistics_history');
    if (lastPage && savedHistory) {
      try {
        history = JSON.parse(savedHistory);
        if (history.length > 0) {
          updateHeader(lastPage);
          renderContent(lastPage);
          document.getElementById('backBtn').classList.toggle('hidden', history.length <= 1);
        }
      } catch (e) {
        showPage('home');
      }
    } else {
      showPage('home');
    }
  }
});
