import API from './APIService'

class ProductsAPI {
    getProducts = () => API.get('products');

    getDiscountProduct = () => API.get('discountProduct');

    getProductsCategories = () => API.get('productsCategories');

    getProduct = (id) => API.get(`products/${id}`)

    getNewProducts = () => API.get('newProducts');

    // auth = (username, password) => API.post('/api/auth/token/', {username, password, api: 'operator.up-line'})
    // checkToken = (payload) => API.post('/api/auth/CheckTokenLifeTime', payload)
    // refreshToken = () => API.get('/api/auth/refreshToken')
}

export default new ProductsAPI();
