// Fetch directly from Shopify store's public API
const SHOPIFY_STORE = 'echonera.myshopify.com';
const API_URL = `https://${SHOPIFY_STORE}/products.json`;

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
            '<p>Products coming soon! Please check back later.</p>';
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (!products || products.length === 0) {
        container.innerHTML = '<p>No products available yet.</p>';
        return;
    }
    
    container.innerHTML = products.map(product => {
        const image = product.images[0]?.src || 'placeholder.jpg';
        const price = product.variants[0]?.price || '0.00';
        const inventory = product.variants.reduce((sum, v) => sum + (v.inventory_quantity || 0), 0);
        
        return `
            <div class="product-card">
                <img src="${image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="product-description">${product.body_html?.substring(0, 150) || ''}</p>
                <p class="product-price">$${parseFloat(price).toFixed(2)}</p>
                ${inventory !== undefined ? `<p class="product-inventory">${inventory > 0 ? `${inventory} in stock` : 'Out of stock'}</p>` : ''}
                <a href="https://${SHOPIFY_STORE}/products/${product.handle}" 
                   class="buy-button" target="_blank">View Product</a>
            </div>
        `;
    }).join('');
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
