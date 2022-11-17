const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const process = require('node:process');
const cors = require('cors');
const client = new MongoClient('mongodb://localhost:27017');
const dataBase = client.db('db1');
const app = express();
app.use(cors());
app.use(express.json());


app.get("/get-books", async (request, response) => {
    try {
        const collection = dataBase.collection('books');
        const books = await collection.find().toArray();
        setTimeout(() => {
            response.json(books);
        }, 2000);
    } catch (error) {
        console.log(error);
    }

});


app.post('/save-books', async (request, response) => {
    try {
        const books = request.body;
        const collection = dataBase.collection("books");
        for (let book of books) {
            switch (book.status) {
                case "new & updated":
                    delete book.status;
                    book._id = ObjectId(book._id);
                    await collection.insertOne(book);
                    break;
                case "from-server & updated":
                    delete book.status;
                    book._id = ObjectId(book._id);
                    await collection.findOneAndReplace({ _id: book._id }, book);
                    break;
                case "from-server & deleted":
                    delete book.status;
                    book._id = ObjectId(book._id);
                    await collection.deleteOne({ _id: book._id });
                    break;
            }
        }
        const updatedBooks = await collection.find().toArray();
        response.json(updatedBooks);
    } catch (error) {
        console.log(error)
    }
});


app.get("/get-products", async (request, response) => {
    try {
        const collection = dataBase.collection('products');
        const products = await collection.find().toArray();
        setTimeout(() => {
            response.json(products);
        }, 2000);
    } catch (error) {
        console.log(error);
    }
});


app.post('/save-products', async (request, response) => {
    try {
        const products = request.body;
        const collection = dataBase.collection("products");
        for (let product of products) {
            switch (product.status) {
                case "new & updated":
                    delete product.status;
                    product._id = ObjectId(product._id);
                    await collection.insertOne(product);
                    break;
                case "from-server & updated":
                    delete product.status;
                    product._id = ObjectId(product._id);
                    await collection.findOneAndReplace({ _id: product._id }, product);
                    break;
                case "from-server & deleted":
                    delete product.status;
                    product._id = ObjectId(product._id);
                    await collection.deleteOne({ _id: product._id });
                    break;
            }
        }
        const updatedProducts = await collection.find().toArray();
        response.json(updatedProducts);
    } catch (error) {
        console.log(error)
    }
});


app.listen(3001, async () => {
    await client.connect();
    console.log("listening on port 3001");
});


//============================================================================================================================


// const shutdown = async () => {
//     console.log("Shuttdown")
//     await client.close();
//     console.log("After Shutdown")

// }

// process.on('SIGTERM', shutdown);
// process.on('SIGINT', shutdown);




