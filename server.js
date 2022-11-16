const express = require("express");
const cors = require('cors');
const app = express();
const mongoRepository = require("./mongoRepository");
app.use(cors());

app.use(express.json());

// const books = [
//     {
//         name: "Book-1",
//         author: "Author-1",
//         price: 50,
//     },
//     {
//         name: "Book-2",
//         author: "Author-2",
//         price: 100,
//     },
//     {
//         name: "Book-3",
//         author: "Author-3",
//         price: 80,
//     },
// ];

const products = [
    {
        name: "Product-1",
        quantity: 10,
        price: 50,
    },
    {
        name: "Product-2",
        quantity: 20,
        price: 100,
    },
    {
        name: "Product-3",
        quantity: 30,
        price: 80,
    },
];


const saveDataToDB = async (collectionName, dataToSave) => {
    dataToSave.map(data => {
        switch (data.status) {
            case "new": mongoRepository.insertDataToDB(collectionName, data); break;
            case "updated": mongoRepository.insertDataToDB(collectionName, data); break;
            case "deleted": mongoRepository.insertDataToDB(collectionName, data); break;
            default: break;
        }
    });
}

app.get("/get-books", async (request, response) => {

    const books = await mongoRepository.getDataFromDB("books");
    setTimeout(() => {
        response.json(books);
    }, 2000);
    // console.log(await mongoRepository.updateDataToDB("books"));
    // console.log(await mongoRepository.deleteOneDataFromDB("books"));

    // try {
    //     const connection = await client.connect();
    //     const dataBase = client.db('db1');
    //     const collection = dataBase.collection('books');
    //     const books = await collection.find().toArray();
    //    
    // } catch (error) {
    //     console.log(error);
    // } finally {
    //     client.close();
    // }

});

app.post('/save-books', async (request, response) => {
    const dataToSave = request.body;
    await saveDataToDB("books", dataToSave);
});

app.get("/get-products", async (request, response) => {
    try {
        const connection = await client.connect();
        const dataBase = client.db('db1');
        const collection = dataBase.collection('products');
        const products = await collection.find().toArray();
        setTimeout(() => {
            response.json(products);
        }, 2000);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }

});

app.listen(3001, () => {
    console.log("listening on port 3001");
});