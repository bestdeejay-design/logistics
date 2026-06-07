const App = {
  role: 'picker',
  page: 'dashboard',
  theme: 'dark',
  scannedItems: [],

  orders: [
    { id: "ORD-001", status: "Сборка", client: "Иван П.", items: 5, picked: 2, address: "ул. Ленина 15", priority: "high", timeLeft: "25 мин", shelf: "A-12" },
    { id: "ORD-002", status: "Ожидание", client: "Анна К.", items: 3, picked: 0, address: "пр. Мира 42", priority: "normal", timeLeft: "45 мин", shelf: "B-04" },
    { id: "ORD-003", status: "Упаковка", client: "ООО Ромашка", items: 12, picked: 12, address: "ул. Тверская 8", priority: "high", timeLeft: "15 мин", shelf: "C-07" },
    { id: "ORD-004", status: "Сборка", client: "Сергей М.", items: 8, picked: 5, address: "наб. Канала 3", priority: "low", timeLeft: "60 мин", shelf: "A-03" },
    { id: "ORD-005", status: "Готов", client: "Елена В.", items: 2, picked: 2, address: "ул. Садовая 21", priority: "high", timeLeft: "5 мин", shelf: "B-10" },
  ],

  deliveries: [
    { id: "DEL-001", status: "В пути", client: "Иван П.", address: "ул. Ленина 15", items: 5, distance: "2.3 км", timeLeft: "12 мин", type: "стандарт" },
    { id: "DEL-002", status: "Ожидает", client: "Анна К.", address: "пр. Мира 42", items: 3, distance: "5.1 км", timeLeft: "30 мин", type: "экспресс" },
    { id: "DEL-003", status: "Доставлен", client: "ООО Ромашка", address: "ул. Тверская 8", items: 12, distance: "0 км", timeLeft: "—", type: "стандарт" },
    { id: "DEL-004", status: "У курьера", client: "Сергей М.", address: "наб. Канала 3", items: 8, distance: "1.7 км", timeLeft: "8 мин", type: "экспресс" },
    { id: "DEL-005", status: "Отменён", client: "Елена В.", address: "ул. Садовая 21", items: 2, distance: "—", timeLeft: "—", type: "стандарт" },
  ],

  pickerStats: { today: 24, picked: 187, pending: 8, rating: 4.8 },
  courierStats: { today: 18, delivered: 152, distance: "134 км", rating: 4.9 },

  pickerNav: [
    { id: 'dashboard', label: 'Главная', icon: 'home' },
    { id: 'orders', label: 'Заказы', icon: 'list' },
    { id: 'scanner', label: 'Сканер', icon: 'camera' },
    { id: 'profile', label: 'Профиль', icon: 'user' },
  ],

  courierNav: [
    { id: 'dashboard', label: 'Главная', icon: 'home' },
    { id: 'deliveries', label: 'Доставки', icon: 'list' },
    { id: 'route', label: 'Маршрут', icon: 'map' },
    { id: 'profile', label: 'Профиль', icon: 'user' },
  ],

  icons: {
    home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"/></svg>',
    list: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    camera: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    map: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  },

  init() {
    const savedTheme = localStorage.getItem('logistics-theme') || 'dark';
    this.theme = savedTheme;
    document.body.classList.toggle('light', savedTheme === 'light');
  },

  selectRole(role) {
    this.role = role;
    this.page = 'dashboard';
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('app').style.alignItems = 'center';
    document.getElementById('app').style.justifyContent = 'center';
    document.getElementById('app').style.minHeight = '100vh';
    this.render();
  },

  openDemo() {
    this.selectRole('picker');
  },

  switchRole(role) {
    if (this.role === role) return;
    this.role = role;
    this.page = 'dashboard';
    this.render();
    this.toast(`Переключено на: ${role === 'picker' ? 'Сборщик' : 'Курьер'}`, 'info');
  },

  navigate(page) {
    this.page = page;
    this.render();
  },

  back() {
    this.page = 'dashboard';
    this.render();
  },

  render() {
    this.renderRoleSwitcher();
    this.renderPage();
    this.renderNav();
  },

  renderRoleSwitcher() {
    const tabs = document.querySelectorAll('.role-tab');
    const indicator = document.getElementById('roleIndicator');
    tabs.forEach(t => t.classList.remove('active'));
    tabs.forEach(t => {
      if (t.dataset.role === this.role) t.classList.add('active');
    });
    indicator.className = 'role-indicator ' + this.role;
  },

  renderNav() {
    const nav = document.getElementById('bottomNav');
    const items = this.role === 'picker' ? this.pickerNav : this.courierNav;
    nav.innerHTML = items.map(item => `
      <button class="nav-item${this.page === item.id ? ' active' : ''}" onclick="App.navigate('${item.id}')">
        ${this.icons[item.icon]}
        <span>${item.label}</span>
      </button>
    `).join('');
  },

  renderPage() {
    const content = document.getElementById('appContent');
    const pages = {
      picker: { dashboard: this.renderPickerDashboard, orders: this.renderOrders, scanner: this.renderScanner, profile: this.renderPickerProfile },
      courier: { dashboard: this.renderCourierDashboard, deliveries: this.renderDeliveries, route: this.renderRoute, profile: this.renderCourierProfile },
    };
    const fn = pages[this.role]?.[this.page];
    if (fn) content.innerHTML = fn.call(this);
    else content.innerHTML = this.renderPickerDashboard.call(this);
  },

  statusBadge(status) {
    const map = {
      'Сборка': 'amber', 'Ожидание': 'gray', 'Упаковка': 'blue', 'Готов': 'green',
      'В пути': 'amber', 'Ожидает': 'gray', 'Доставлен': 'green', 'У курьера': 'blue', 'Отменён': 'red',
    };
    const cls = map[status] || 'gray';
    return `<span class="status-badge ${cls}">${status}</span>`;
  },

  priorityBadge(priority) {
    return `<span class="priority-badge ${priority}">${priority === 'high' ? 'Высокий' : priority === 'normal' ? 'Стандарт' : 'Низкий'}</span>`;
  },

  /* ===================== PICKER PAGES ===================== */

  renderPickerDashboard() {
    const s = this.pickerStats;
    const urgent = this.orders.filter(o => o.status === 'Сборка' && o.priority === 'high');
    const active = urgent[0] || this.orders[0];
    const statuses = ['Сборка', 'Ожидание', 'Упаковка', 'Готов'];
    const counts = statuses.map(st => this.orders.filter(o => o.status === st).length);
    const maxCount = Math.max(...counts, 1);
    return `
      <div class="page-header"><h2>Главная</h2></div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${s.today}</div><div class="stat-label">Заказов сегодня</div></div>
        <div class="stat-card green"><div class="stat-value">${s.picked}</div><div class="stat-label">Собрано товаров</div></div>
        <div class="stat-card blue"><div class="stat-value">${s.pending}</div><div class="stat-label">Ожидают сборки</div></div>
        <div class="stat-card purple"><div class="stat-value">${s.rating}</div><div class="stat-label">Рейтинг</div></div>
      </div>
      <div class="active-order-card">
        <div class="card-label">Активный заказ</div>
        <div class="order-title">${active.id} · ${active.client}</div>
        <div class="order-meta">${active.address} · Ячейка ${active.shelf}</div>
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
          <span style="color:var(--text-secondary)">Собрано: ${active.picked}/${active.items}</span>
          <span style="color:var(--warning)">${active.timeLeft}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(active.picked/active.items)*100}%"></div></div>
      </div>
      <div class="quick-actions">
        <button class="quick-action-btn" onclick="App.navigate('orders')">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          Новый заказ
        </button>
        <button class="quick-action-btn secondary" onclick="App.navigate('scanner')">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Сканировать
        </button>
      </div>
      <div class="card">
        <div class="card-title">Статусы заказов</div>
        ${statuses.map((st, i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:12px;width:80px;color:var(--text-secondary)">${st}</span>
            <div class="progress-bar" style="flex:1"><div class="progress-fill ${i === 3 ? 'green' : i === 0 ? '' : 'blue'}" style="width:${(counts[i]/maxCount)*100}%"></div></div>
            <span style="font-size:12px;font-weight:600;width:20px;text-align:right">${counts[i]}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderOrders() {
    const statusFilter = this._orderFilter || 'Все';
    const filtered = this.orders.filter(o => {
      if (statusFilter === 'Все') return true;
      if (statusFilter === 'Высокий приоритет') return o.priority === 'high';
      return o.status === statusFilter;
    });
    const filters = ['Все', 'Сборка', 'Готов', 'Высокий приоритет'];
    return `
      <div class="page-header">
        <button class="back-btn" onclick="App.back()">← Назад</button>
        <h2>Заказы</h2>
        <span style="font-size:12px;color:var(--text-muted)">${this.orders.length}</span>
      </div>
      <div class="filter-bar">
        ${filters.map(f => `<button class="filter-btn${statusFilter === f ? ' active' : ''}" onclick="App._orderFilter='${f}';App.render()">${f}</button>`).join('')}
      </div>
      ${filtered.map(o => `
        <div class="list-item" onclick="App.showOrderDetail('${o.id}')">
          <div class="list-item-top">
            <div>
              <div class="list-item-id">${o.id}</div>
              <div class="list-item-client">${o.client}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
              ${this.statusBadge(o.status)}
              ${this.priorityBadge(o.priority)}
            </div>
          </div>
          <div class="list-item-details">
            <span>📦 ${o.picked}/${o.items}</span>
            <span>📍 ${o.shelf}</span>
            <span>⏱ ${o.timeLeft}</span>
          </div>
        </div>
      `).join('')}
      ${filtered.length === 0 ? '<div class="empty-state"><p>Нет заказов</p></div>' : ''}
    `;
  },

  showOrderDetail(id) {
    const order = this.orders.find(o => o.id === id);
    if (!order) return;
    const items = [];
    for (let i = 0; i < order.items; i++) {
      items.push({ name: `Товар #${i + 1}`, sku: `SKU-${order.id.slice(-3)}-${String(i + 1).padStart(2, '0')}`, checked: i < order.picked });
    }
    const modal = document.getElementById('modal');
    modal.innerHTML = `
      <div class="modal-handle"></div>
      <button class="modal-close" onclick="App.closeModal()">✕</button>
      <div class="modal-title">${order.id}</div>
      <div class="modal-row"><span class="modal-row-label">Клиент</span><span class="modal-row-value">${order.client}</span></div>
      <div class="modal-row"><span class="modal-row-label">Адрес</span><span class="modal-row-value">${order.address}</span></div>
      <div class="modal-row"><span class="modal-row-label">Ячейка</span><span class="modal-row-value">${order.shelf}</span></div>
      <div class="modal-row"><span class="modal-row-label">Статус</span><span class="modal-row-value">${this.statusBadge(order.status)}</span></div>
      <div class="section-label">Товары (${order.picked}/${order.items})</div>
      <div class="progress-bar" style="margin-bottom:8px"><div class="progress-fill" style="width:${(order.picked/order.items)*100}%"></div></div>
      <div class="item-check-list">
        ${items.map((item, i) => `
          <div class="item-check-row">
            <div class="item-checkbox${item.checked ? ' checked' : ''}" onclick="this.classList.toggle('checked')"></div>
            <span style="${item.checked ? 'text-decoration:line-through;opacity:0.5' : ''}">${item.name}</span>
            <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${item.sku}</span>
          </div>
        `).join('')}
      </div>
      <button class="modal-btn primary" onclick="App.confirmPick('${order.id}')">Подтвердить сборку</button>
    `;
    document.getElementById('modalOverlay').classList.add('open');
    modal.classList.add('open');
  },

  confirmPick(id) {
    const order = this.orders.find(o => o.id === id);
    if (!order) return;
    const allChecked = document.querySelectorAll('.item-checkbox.checked').length;
    if (allChecked < order.items) {
      this.toast(`Собрано ${allChecked} из ${order.items} товаров`, 'error');
      return;
    }
    order.status = 'Готов';
    order.picked = order.items;
    this.closeModal();
    this.render();
    this.toast(`Заказ ${id} подтверждён!`, 'success');
  },

  renderScanner() {
    return `
      <div class="page-header">
        <button class="back-btn" onclick="App.back()">← Назад</button>
        <h2>Сканер</h2>
      </div>
      <div class="scanner-frame">
        <div class="scanner-line"></div>
        <div class="scanner-center">
          <div class="scanner-corner tl"></div>
          <div class="scanner-corner tr"></div>
          <div class="scanner-corner bl"></div>
          <div class="scanner-corner br"></div>
        </div>
      </div>
      <div class="scanner-input-group">
        <input class="scanner-input" id="barcodeInput" placeholder="Введите штрих-код" autofocus onkeydown="if(event.key==='Enter')App.scanBarcode()">
        <button class="scanner-btn" onclick="App.scanBarcode()">Сканировать</button>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="quick-action-btn" onclick="App.scanBarcode()" style="flex:1">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
          Имитация сканирования
        </button>
      </div>
      <div class="section-label">Отсканировано: ${this.scannedItems.length}</div>
      <div class="scanned-list">
        ${this.scannedItems.length === 0 ? '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">Нет отсканированных товаров</div>' : ''}
        ${this.scannedItems.map((item, i) => `
          <div class="scanned-item">
            <div>
              <div class="scanned-item-code">${item.code}</div>
              <div style="font-size:11px;color:var(--text-secondary)">${item.name}</div>
            </div>
            <div class="scanned-item-actions">
              <button class="scanned-item-confirm" onclick="App.confirmScan(${i})">✓</button>
              <button class="scanned-item-cancel" onclick="App.removeScan(${i})">✕</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  scanBarcode() {
    const input = document.getElementById('barcodeInput');
    const code = input ? input.value.trim() : '';
    const barcode = code || `BAR-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    const names = ['Болт M8', 'Гайка М10', 'Шайба DIN125', 'Подшипник 6205', 'Уплотнитель', 'Пружина', 'Втулка', 'Клапан', 'Фильтр', 'Ремень'];
    const name = names[Math.floor(Math.random() * names.length)];
    this.scannedItems.unshift({ code: barcode, name, confirmed: false });
    if (input) input.value = '';
    this.render();
    this.toast(`Отсканировано: ${barcode}`, 'success');
  },

  confirmScan(index) {
    this.scannedItems[index].confirmed = true;
    this.render();
    this.toast('Товар подтверждён', 'success');
  },

  removeScan(index) {
    const item = this.scannedItems[index];
    this.scannedItems.splice(index, 1);
    this.render();
    this.toast(`Удалено: ${item.code}`, 'info');
  },

  renderPickerProfile() {
    const s = this.pickerStats;
    return this.renderProfile('Алексей С.', 'Сборщик', [
      { label: 'Смена', value: '09:00 — 18:00' },
      { label: 'Заказов сегодня', value: `${s.today}` },
      { label: 'Собрано товаров', value: `${s.picked}` },
      { label: 'Рейтинг', value: `${s.rating}` },
    ], [
      { icon: '🏆', label: '100 заказов', cls: 'gold' },
      { icon: '⭐', label: '5 звёзд', cls: 'gold' },
      { icon: '📦', label: '500 товаров', cls: 'silver' },
      { icon: '⚡', label: 'Скорость', cls: 'bronze' },
    ]);
  },

  /* ===================== COURIER PAGES ===================== */

  renderCourierDashboard() {
    const s = this.courierStats;
    const active = this.deliveries.filter(d => d.status === 'В пути' || d.status === 'У курьера');
    const current = active[0] || this.deliveries[0];
    const statuses = ['В пути', 'Ожидает', 'Доставлен', 'Отменён'];
    const counts = statuses.map(st => this.deliveries.filter(d => d.status === st).length);
    const maxCount = Math.max(...counts, 1);
    return `
      <div class="page-header"><h2>Главная</h2></div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${s.today}</div><div class="stat-label">Доставок сегодня</div></div>
        <div class="stat-card green"><div class="stat-value">${s.delivered}</div><div class="stat-label">Всего доставлено</div></div>
        <div class="stat-card blue"><div class="stat-value">${s.distance}</div><div class="stat-label">Км проехал</div></div>
        <div class="stat-card purple"><div class="stat-value">${s.rating}</div><div class="stat-label">Рейтинг</div></div>
      </div>
      <div class="active-order-card">
        <div class="card-label">Активная доставка</div>
        <div class="order-title">${current.id} · ${current.client}</div>
        <div class="order-meta">${current.address} · ${current.distance} · ${current.type}</div>
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:4px">
          <span style="color:var(--text-secondary)">Статус: ${current.status}</span>
          <span style="color:var(--warning)">${current.timeLeft !== '—' ? current.timeLeft : ''}</span>
        </div>
      </div>
      <div class="quick-actions">
        <button class="quick-action-btn" onclick="App.navigate('route')">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
          Новый маршрут
        </button>
        <button class="quick-action-btn secondary" onclick="App.toast('Связь с диспетчером...', 'info')">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          Связь с диспетчером
        </button>
      </div>
      <div class="card">
        <div class="card-title">Статусы доставок</div>
        ${statuses.map((st, i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:12px;width:80px;color:var(--text-secondary)">${st}</span>
            <div class="progress-bar" style="flex:1"><div class="progress-fill ${i === 2 ? 'green' : i === 0 ? '' : 'blue'}" style="width:${(counts[i]/maxCount)*100}%"></div></div>
            <span style="font-size:12px;font-weight:600;width:20px;text-align:right">${counts[i]}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderDeliveries() {
    const filter = this._deliveryFilter || 'Все';
    const filtered = this.deliveries.filter(d => {
      if (filter === 'Все') return true;
      return d.status === filter;
    });
    const filters = ['Все', 'В пути', 'Ожидает', 'Доставлен'];
    return `
      <div class="page-header">
        <button class="back-btn" onclick="App.back()">← Назад</button>
        <h2>Доставки</h2>
        <span style="font-size:12px;color:var(--text-muted)">${this.deliveries.length}</span>
      </div>
      <div class="filter-bar">
        ${filters.map(f => `<button class="filter-btn${filter === f ? ' active' : ''}" onclick="App._deliveryFilter='${f}';App.render()">${f}</button>`).join('')}
      </div>
      ${filtered.map(d => `
        <div class="list-item" onclick="App.showDeliveryDetail('${d.id}')">
          <div class="list-item-top">
            <div>
              <div class="list-item-id">${d.id}</div>
              <div class="list-item-client">${d.client}</div>
            </div>
            ${this.statusBadge(d.status)}
          </div>
          <div class="list-item-details">
            <span>📍 ${d.address}</span>
            <span>📏 ${d.distance}</span>
            <span>⏱ ${d.timeLeft}</span>
            <span>📋 ${d.type}</span>
          </div>
        </div>
      `).join('')}
      ${filtered.length === 0 ? '<div class="empty-state"><p>Нет доставок</p></div>' : ''}
    `;
  },

  showDeliveryDetail(id) {
    const d = this.deliveries.find(del => del.id === id);
    if (!d) return;
    const items = [];
    for (let i = 0; i < d.items; i++) items.push(`Товар #${i + 1}`);
    const modal = document.getElementById('modal');
    modal.innerHTML = `
      <div class="modal-handle"></div>
      <button class="modal-close" onclick="App.closeModal()">✕</button>
      <div class="modal-title">${d.id}</div>
      <div class="modal-row"><span class="modal-row-label">Клиент</span><span class="modal-row-value">${d.client}</span></div>
      <div class="modal-row"><span class="modal-row-label">Адрес</span><span class="modal-row-value">${d.address}</span></div>
      <div class="modal-row"><span class="modal-row-label">Статус</span><span class="modal-row-value">${this.statusBadge(d.status)}</span></div>
      <div class="modal-row"><span class="modal-row-label">Расстояние</span><span class="modal-row-value">${d.distance}</span></div>
      <div class="modal-row"><span class="modal-row-label">Тип</span><span class="modal-row-value">${d.type}</span></div>
      <div class="section-label">Товары (${d.items})</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">${items.join(', ')}</div>
      ${d.status !== 'Доставлен' && d.status !== 'Отменён' ? `
        <div class="section-label">Фото подтверждения</div>
        <div class="photo-placeholder" onclick="App.toast('Фото сделано', 'success')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Сделать фото
        </div>
        <div class="section-label">Подпись клиента</div>
        <div class="signature-area" onclick="App.toast('Подпись получена', 'success')">Нажмите для подписи</div>
        <button class="modal-btn success" onclick="App.confirmDelivery('${d.id}')">Подтвердить доставку</button>
      ` : ''}
      ${d.status !== 'Отменён' ? `<button class="call-btn" onclick="App.toast('Звонок клиенту ${d.client}...', 'info')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        Позвонить клиенту
      </button>` : ''}
    `;
    document.getElementById('modalOverlay').classList.add('open');
    modal.classList.add('open');
  },

  confirmDelivery(id) {
    const d = this.deliveries.find(del => del.id === id);
    if (!d) return;
    d.status = 'Доставлен';
    d.distance = '0 км';
    d.timeLeft = '—';
    this.closeModal();
    this.render();
    this.toast(`Доставка ${id} подтверждена!`, 'success');
  },

  renderRoute() {
    const routeStops = [
      { addr: "ул. Ленина 15", client: "Иван П.", status: "completed", desc: "Доставлен 12:15" },
      { addr: "пр. Мира 42", client: "Анна К.", status: "active", desc: "Текущая остановка" },
      { addr: "наб. Канала 3", client: "Сергей М.", status: "pending", desc: "Далее" },
      { addr: "ул. Тверская 8", client: "ООО Ромашка", status: "pending", desc: "Далее" },
    ];
    const routeActive = this.deliveries.filter(d => d.status === 'В пути' || d.status === 'У курьера');
    return `
      <div class="page-header">
        <button class="back-btn" onclick="App.back()">← Назад</button>
        <h2>Маршрут</h2>
      </div>
      <div class="map-placeholder">
        <div class="map-grid"></div>
        <div class="route-line-container">
          <div class="route-line"></div>
          <div class="route-dot start"></div>
          <div class="route-dot mid"></div>
          <div class="route-dot end"></div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="quick-action-btn" onclick="App.toast('Маршрут начат!', 'success')">
          Начать маршрут
        </button>
        <button class="quick-action-btn secondary" onclick="App.toast('Маршрут завершён', 'success')">
          Завершить
        </button>
      </div>
      <div class="section-label">Остановки маршрута</div>
      <div class="route-stops">
        ${routeStops.map((stop, i) => `
          <div class="route-stop ${stop.status}">
            <div class="route-stop-icon ${stop.status === 'completed' ? 'green' : ''}">${i + 1}</div>
            <div class="route-stop-info">
              <div class="route-stop-addr">${stop.addr}</div>
              <div class="route-stop-desc">${stop.client} · ${stop.desc}</div>
            </div>
            ${stop.status === 'completed' ? '<span style="color:var(--success);font-size:12px">✓</span>' : ''}
            ${stop.status === 'active' ? '<span style="color:var(--warning);font-size:10px;font-weight:600">СЕЙЧАС</span>' : ''}
          </div>
        `).join('')}
      </div>
      ${routeActive.length > 0 ? `
        <div class="card" style="margin-top:8px">
          <div class="card-title">Активные доставки</div>
          ${routeActive.map(d => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px">
              <span>${d.id} · ${d.client}</span>
              <span style="color:var(--warning)">${d.timeLeft}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  },

  renderCourierProfile() {
    const s = this.courierStats;
    return this.renderProfile('Дмитрий В.', 'Курьер', [
      { label: 'Транспорт', value: 'Volkswagen Crafter A777AA' },
      { label: 'Смена', value: '08:00 — 20:00' },
      { label: 'Доставок сегодня', value: `${s.today}` },
      { label: 'Всего доставлено', value: `${s.delivered}` },
      { label: 'Пробег', value: `${s.distance}` },
      { label: 'Рейтинг', value: `${s.rating}` },
    ], [
      { icon: '🏆', label: '500 доставок', cls: 'gold' },
      { icon: '⭐', label: '5 звёзд', cls: 'gold' },
      { icon: '🚛', label: '10000 км', cls: 'silver' },
      { icon: '🎯', label: 'Точность', cls: 'bronze' },
    ]);
  },

  renderProfile(name, role, info, achievements) {
    const isLight = this.theme === 'light';
    return `
      <div class="profile-header">
        <div class="profile-avatar">${name.charAt(0)}</div>
        <div class="profile-name">${name}</div>
        <div class="profile-role">${role}</div>
      </div>
      <div class="profile-section">
        <div class="profile-section-title">Информация</div>
        ${info.map(i => `
          <div class="profile-info-row">
            <span class="profile-info-label">${i.label}</span>
            <span class="profile-info-value">${i.value}</span>
          </div>
        `).join('')}
      </div>
      <div class="profile-section">
        <div class="profile-section-title">Достижения</div>
        <div class="achievement-grid">
          ${achievements.map(a => `
            <div class="achievement">
              <div class="achievement-icon ${a.cls}">${a.icon}</div>
              <span>${a.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="profile-section">
        <div class="profile-section-title">Настройки</div>
        <div class="theme-toggle">
          <span style="font-size:13px;flex:1">Тёмная тема</span>
          <div class="toggle-switch${!isLight ? ' active' : ''}" onclick="App.toggleTheme()"></div>
        </div>
      </div>
    `;
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light', this.theme === 'light');
    localStorage.setItem('logistics-theme', this.theme);
    this.render();
    this.toast(this.theme === 'dark' ? 'Тёмная тема' : 'Светлая тема', 'info');
  },

  closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('modal').classList.remove('open');
  },

  toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span>${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
