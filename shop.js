// Shopify Product Display - Auto-updates from your store
const SHOPIFY_STORE = 'jnrd2z-9w.myshopify.com';

async function loadProducts() {
    try {
        const response = await fetch(`https://${SHOPIFY_STORE}/products.json`);
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
        
        return `
            <div class="product-card">
                <img src="${image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="product-description">${product.body_html?.substring(0, 150) || ''}</p>
                <p class="product-price">$${price}</p>
                <a href="https://${SHOPIFY_STORE}/products/${product.handle}" 
                   class="buy-button" target="_blank">View Product</a>
            </div>
        `;
    }).join('');
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
