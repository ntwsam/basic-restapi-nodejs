const mysql = require('mysql2')
const express = require('express')
const app = express()

app.use(express.json())

require('dotenv').config()

// ⭐️ connect MySQL
db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
})

// ⭐️ get all product
app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to get product:", err })
        } else {
            res.status(200).json({ message: result })
        }
    })
})

// ⭐️ create new product
app.post('/products', (req, res) => {
    const { name, price, discount, review_count, image_url } = req.body
    db.query("INSERT INTO products (name, price, discount, review_count, image_url) VALUE (?, ?, ?, ?, ?)", [name, price, discount, review_count, image_url], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to insert product:", err })
        } else {
            res.status(201).json({
                message: "insert product successfully!",
                product: {
                    id: result.insertId,
                    name: name,
                    price: price,
                    discount: discount,
                    review_count: review_count,
                    image_url: image_url,

                }
            })
        }
    })
})

// ⭐️ delete product
app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to delete product:", err })
        } else {
            res.status(200).json({
                message: "delete product successfully!",
            })
        }
    })
})

// ⭐️ update product
app.put('/products/:id', (req, res) => {
    const id = req.params.id
    const { name, price, discount, review_count, image_url } = req.body
    db.query("UPDATE products SET name = ?,price = ?, discount = ?, review_count=?, image_url=? WHERE id = ?", [name, price, discount, review_count, image_url, id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to update product:", err })
        } else {
            res.status(200).json({
                message: "update product successfully",
                product: {
                    id: id,
                    name: name,
                    price: price,
                    discount: discount,
                    review_count: review_count,
                    image_url: image_url
                }
            })
        }
    })
})

// ⭐️ select product by id
app.get('/products/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to get product:", err })
        } else {
            res.status(200).json(result)
        }
    })
})


app.get('/', (req, res) => {
    res.send('hello world')
})

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})