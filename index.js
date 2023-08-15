const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { dir } = require('console');

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mensWearDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

// Product Schema
const productSchema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    category: String,
    inStock: Boolean,
    url: String
});

const Product = mongoose.model('Product', productSchema);
// const products = [
//     { brand: 'Breitling', model: 'Montbrillant Datora', price: 10000, category: 'Chronograph', inStock: true, url: 'https://watchbox-cdn.imgix.net/posted-product-images/638233640332725600_BREI321527_4679569_87784_43_1.jpg?h=1540&w=1540&auto=compress,format' },
//     { brand: 'Omega', model: 'Speedmaster Professional', price: 7800, category: 'Analog', inStock: true, url: 'https://watchbox-cdn.imgix.net/posted-product-images/638234849902841793_OMEG313631_4621538_82778_42_1.jpg?h=1540&w=1540&auto=compress,format' },
//     { brand: 'Seiko', model: 'Presage', price: 4120, category: 'Chronograph', inStock: true, url: 'https://watchbox-cdn.imgix.net/posted-product-images/638230193198798965_seik307557_4838314_95311_42-82.jpg?h=1540&w=1540&auto=compress,format' },
//     { brand: 'Hubolt', model: 'Big Bang', price: 14100, category: 'Chronograph', inStock: true, url: 'https://watchbox-cdn.imgix.net/posted-product-images/637441463032360068.jpg?h=1540&w=1540&auto=compress,format' },
//     { brand: 'Bremont', model: 'H1 Generation Fury', price: 7400, category: 'Analog', inStock: true, url: 'https://watchbox-cdn.imgix.net/posted-product-images/638104219061749699_brem101232_4784682_40-1.jpg?h=1540&w=1540&auto=compress,format' },
// ];
                  
// Product.insertMany(products)
// .then(() => console.log('Data added'))
// .catch(err => console.error('Insert error', err));



// CRUD Endpoints
app.get('/products', (req, res) => {
    Product.find().then(products => res.json(products));
});

app.post('/products', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save().then(product => res.json(product));
});

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, req.body).then(products => res.json(products));
});

app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body).then(() => res.json({ success: true }));
});

app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(() => res.json({ success: true }));
});

// Endpoint to serve the HTML
app.get('/', (req, res) => {
    res.sendFile('/index.html')
});

app.listen(3000, () => console.log('Server running on port 3000'));