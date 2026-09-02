const stats = [
  { label: 'Revenue', value: '¥1,560,000' },
  { label: 'Orders', value: '428' },
  { label: 'Templates', value: '36' }
];

const orders = [
  { id: '#INV-1042', customer: 'Nguyễn Hạnh', product: 'Wedding #01', status: 'Paid' },
  { id: '#INV-1043', customer: 'Lê Anh', product: 'Birthday Card', status: 'Reviewing' },
  { id: '#INV-1044', customer: 'Trần My', product: 'Video Gift', status: 'Paid' },
  { id: '#INV-1045', customer: 'Phạm Khánh', product: 'Event Invitation', status: 'Pending' }
];

const inventory = [
  { name: 'Wedding #01', stock: 12, price: '¥1,800' },
  { name: 'Birthday Card', stock: 28, price: '¥500' },
  { name: 'Video Gift', stock: 9, price: '¥2,500' },
  { name: 'Premium Invitation', stock: 14, price: '¥1,800' }
];

const statsContainer = document.getElementById('stats');
const orderTable = document.getElementById('ordersTable');
const inventoryList = document.getElementById('inventoryList');

if (statsContainer) {
  statsContainer.innerHTML = stats.map(stat => `
    <article class="stat-card">
      <div class="label">${stat.label}</div>
      <span class="value">${stat.value}</span>
    </article>
  `).join('');
}

if (orderTable) {
  orderTable.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.product}</td>
      <td><span class="badge">${order.status}</span></td>
    </tr>
  `).join('');
}

if (inventoryList) {
  inventoryList.innerHTML = inventory.map(item => `
    <div class="summary-row">
      <span>${item.name}</span>
      <span>${item.stock} left • ${item.price}</span>
    </div>
  `).join('');
}

const yearNode = document.getElementById('currentYear');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
