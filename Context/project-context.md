# Shopify App - GitHub Pages Integration Context

## Project Goal
Create a GitHub Pages storefront that displays products from a Shopify store (Echo and Era) using a Shopify app API.

## What's Been Built

### Shopify App Location
- **Path:** `c:\Users\aaron\OneDrive\Documents\Shopify\Apps\ene-store`
- **Type:** Shopify Remix app
- **API Endpoint:** `/api/products` - fetches products from Shopify store

### Configuration
- **Scopes configured in `shopify.app.toml`:**
  - `unauthenticated_read_product_listings`
  - `unauthenticated_read_product_inventory`
  - `unauthenticated_read_product_tags`
  - `unauthenticated_write_checkouts`

### Files Created
- **`app/routes/api.products.jsx`** - API endpoint that queries Shopify Admin API and returns product data as JSON
- **`GITHUB_PAGES_EXAMPLE.html`** - Complete example HTML template for GitHub Pages storefront

## Current Status
- App is running with `npm run dev` in the Shopify Apps directory
- Connected to **"EchoNEra dev"** development store (NOT production "Echo and Era" store yet)
- App should have a URL like `https://[something].trycloudflare.com`

## Option 1 - Complete Setup Steps

### 1. Get the API URL
- From the running Shopify app terminal, find the URL (e.g., `https://xyz.trycloudflare.com`)
- API endpoint will be: `[that-url]/api/products`
- Example: `https://abc123.trycloudflare.com/api/products`

### 2. Add Products to Dev Store
- Log into "EchoNEra dev" Shopify admin
- Navigate to Products → Add product
- Add test products with:
  - Title
  - Description
  - Images
  - Prices
  - Inventory quantities
  - Tags (optional, for filtering)

### 3. Test the API
- Open browser and visit: `[your-url]/api/products`
- Should return JSON response like:
```json
{
  "success": true,
  "products": [
    {
      "id": "gid://shopify/Product/...",
      "title": "Product Name",
      "description": "Product description",
      "priceRangeV2": {
        "minVariantPrice": {
          "amount": "29.99",
          "currencyCode": "USD"
        }
      },
      "featuredImage": {
        "url": "https://...",
        "altText": "..."
      },
      "totalInventory": 10,
      "tags": ["tag1", "tag2"]
    }
  ],
  "shop": "echonera-dev.myshopify.com"
}
```

### 4. Update GitHub Pages HTML
In your GitHub repository:
- Open the HTML file (based on `GITHUB_PAGES_EXAMPLE.html`)
- Find the line:
```javascript
const API_URL = 'YOUR_SHOPIFY_APP_URL/api/products';
```
- Replace with actual URL:
```javascript
const API_URL = 'https://[your-cloudflare-url]/api/products';
```

### 5. Deploy to GitHub Pages
- Commit and push the HTML file to your GitHub repository
- Go to repository Settings → Pages
- Enable GitHub Pages (select branch and folder)
- Wait for deployment
- Visit your GitHub Pages URL to test

## API Details

### Endpoint
`GET /api/products`

### Query Parameters (Optional)
- `limit=50` - Number of products to fetch (default: 50)
- `query=tag:featured` - Filter products using Shopify query syntax

### Example Requests
```
https://your-url/api/products
https://your-url/api/products?limit=20
https://your-url/api/products?query=status:active
https://your-url/api/products?query=tag:featured
```

### Response Format
```json
{
  "success": true,
  "products": [...],
  "pageInfo": {
    "hasNextPage": false,
    "hasPreviousPage": false
  },
  "shop": "store-name"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Important Notes

### CORS Enabled
The API has CORS headers configured to allow requests from any origin (GitHub Pages):
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, OPTIONS`

### App Must Stay Running
⚠️ **Critical:** The Shopify app (`npm run dev`) must stay running for the API to work. The Cloudflare tunnel URL is temporary.

### Production Deployment Options

When ready for production:

**Option A: Deploy the Shopify App**
- Deploy app to a hosting service (e.g., Railway, Render, Fly.io)
- Get permanent URL
- Update GitHub Pages with permanent URL

**Option B: Create Custom App (Simpler)**
- Go to "Echo and Era" production store
- Settings → Apps and sales channels → Develop apps
- Create custom app with same scopes
- Use Storefront API access token directly in GitHub Pages
- No need to run/host the Remix app

## Development Store vs Production Store

### Current Setup: "EchoNEra dev" (Development Store)
- ✅ Free to use
- ✅ Good for testing
- ❌ Separate from production data

### Production: "Echo and Era" (Production Store)
- Real store with actual products
- Cannot install development apps directly
- Need to either deploy app or use custom app approach

## Next Steps

1. ✅ App is running
2. ⬜ Add test products to dev store
3. ⬜ Test API endpoint in browser
4. ⬜ Update GitHub Pages HTML with API URL
5. ⬜ Deploy to GitHub Pages
6. ⬜ Test live GitHub Pages site
7. ⬜ Decide on production deployment strategy

## Troubleshooting

### API returns empty products array
- Check that products exist in the dev store
- Verify products are set to "Active" status
- Check terminal for any error messages

### CORS errors on GitHub Pages
- Verify CORS headers are in API response
- Check browser console for specific error
- Ensure using correct API URL

### App not starting
- Run `npm install` to ensure dependencies are installed
- Check for any error messages in terminal
- Verify all required environment variables are set
