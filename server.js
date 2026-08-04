const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'product-service' }));
app.get('/products', (req, res) => res.json([{ id: 1, name: 'Laptop', price: 55000 }, { id: 2, name: 'Mouse', price: 500 }]));

app.listen(PORT, () => console.log(`product-service running on port ${PORT}`));