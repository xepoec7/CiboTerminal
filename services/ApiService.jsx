import axios from 'axios';

export default class Api {

    constructor() {
        this.api_url = process.env.BASE_URL;
        this.client = null;
    }

    init = () => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    }


    getTables = () => {
        return this.init().get('/table/');
    }

    getCategories = () => {
        return this.init().get('/category/');
    }

    getProduct = (product_id) => {
        return this.init().get(`product/${product_id}`);
    }

    getProducts = () => {
        return this.init().get('/product');
    }

    getProductByCategory = (cat_id) => {
        return this.init().get(`/category/${cat_id}`);
    }

    getOrders = () => {
        return this.init().get('/order/');
    }

    getOpenOrders = () => {
        return this.init().get('/order/open/');
    }

    getOrder = (order_id) => {
        return this.init().get(`/order/${order_id}`);
    }

    acceptOrder = (order_id) => {
        return this.init().get(`/order/${order_id}/accept`);
    }

    completeOrder = (order_id) => {
        return this.init().get(`/order/${order_id}/done`);
    }

    sendOrder = (order) => {
        return this.init().post('/order/', order);
    }

    doneOrder = (order_id) => {
        return this.init().get(`/order/${order_id}/done`);
    }

    deleteOrder = (order_id) => {
        return this.init().get(`/order/${order_id}/delete`);
    }

    getInvoices = () => {
        return this.init().get('/invoice/');
    }

    getInvoice = (invoice_id) => {
        return this.init().get(`/invoice/${invoice_id}`);
    }

    payInvoice = (invoice_id) => {
        return this.init().get(`/invoice/${invoice_id}/paid/`);
    }

    getAdditions = () => {
        return this.init().get('/addition');
    }
}