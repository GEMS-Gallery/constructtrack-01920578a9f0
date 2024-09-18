import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
  const addItemForm = document.getElementById('add-item-form');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const itemsList = document.getElementById('items-list');

  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const iid = document.getElementById('iid').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const unit = document.getElementById('unit').value;
    const avgCost = parseFloat(document.getElementById('avgCost').value);

    try {
      await backend.addItem(iid, title, description, quantity, unit, avgCost);
      alert('Item added successfully!');
      addItemForm.reset();
      displayAllItems();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  });

  searchButton.addEventListener('click', async () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      try {
        const results = await backend.searchItems(searchQuery);
        displayItems(results);
      } catch (error) {
        console.error('Error searching items:', error);
        alert('Failed to search items. Please try again.');
      }
    } else {
      displayAllItems();
    }
  });

  async function displayAllItems() {
    try {
      const items = await backend.getAllItems();
      displayItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items. Please try again.');
    }
  }

  function displayItems(items) {
    itemsList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${item.title} (${item.iid})</h3>
        <p>${item.description}</p>
        <p>Quantity: ${item.quantity} ${item.unit}</p>
        <p>Average Cost: $${item.avgCost.toFixed(2)}</p>
      `;
      itemsList.appendChild(li);
    });
  }

  // Initial display of all items
  displayAllItems();
});
