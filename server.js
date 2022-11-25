const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const client = new MongoClient('mongodb://localhost:27017');
const dataBase = client.db('db1');
const SECRET_KEY_FOR_JWT = "jsonWebToken12uanjd565";
const app = express();
app.use(cors());
app.use(express.json());

const createJwt = () => {
    const newJwt = jwt.sign(
        {
            username: "aaa",
            password: "aaa123#",
        },
        SECRET_KEY_FOR_JWT,
        { expiresIn: '1h' }
    );
};

const verifyJwt = (token) => {
    const newJwt = jwt.verify(token, SECRET_KEY_FOR_JWT, (error, decode) => {
        if (error) {
            console.log("error");
        } else {
            console.log(decode);
        }
    });
}


app.get("/get-books", async (request, response) => {

    // const token = request.headers.authorization.split("Bearer")[1];
    // // console.log(token);
    // verifyJwt(token);
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
        setTimeout(() => {
            response.json(updatedBooks);
        }, 2000);
    } catch (error) {
        console.log(error)
    }
});


app.get("/get-products", async (request, response) => {
    try {
        const collection = dataBase.collection('products');
        const products = await collection.find().toArray();
        console.log(products);
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
        setTimeout(() => {
            response.json(updatedProducts);
        }, 2000);
    } catch (error) {
        console.log(error)
    }
});


app.post('/register', async (request, response) => {
    try {
        const { username, password, confirmPassword } = request.body;
        if (username.length < 3) {
            response.json({ status: "FAILED", error: "Validation error", message: "Username should have at least 3 characters." });
            return;
        }
        if (password !== confirmPassword) {
            response.json({ status: "FAILED", error: "Validation error", message: "Password and confirm password should be same." });
            return;
        }
        if (password.length < 6) {
            response.json({ status: "FAILED", error: "Validation error", message: "Password should have at least 6 characters." });
            return;
        }

        const collection = dataBase.collection("users");
        const usernameExist = await collection.findOne({ username });

        if (usernameExist) {
            response.json({ status: "FAILED", error: "Validation error", message: "Username already exist." });
            return;
        }

        const hash = await bcrypt.hash(password, saltRounds);

        await collection.insertOne({ username, password: hash });
        response.json({ status: "SUCCESS", message: "Registered successfully."});

    } catch (error) {
        response.json(error);
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




