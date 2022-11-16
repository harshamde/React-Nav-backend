const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const databaseName = "db1";

const mongoRepository = {
    getDataFromDB: async (collectionName) => {
        try {
            const connection = await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.find().toArray();
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

    updateDataToDB: async (collectionName, dataToUpdate) => {
        const query = { _id: dataToUpdate._id };
        try {
            const connection = await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.findOneAndReplace(query, dataToUpdate).toArray();
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

    insertDataToDB: async (collectionName, dataToInsert) => {
        try {
            const connection = await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.insertOne(dataToInsert);
            return data;

        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

    deleteOneDataFromDB: async (collectionName, dataToDelete) => {
        const idToDelete = dataToDelete._id;
        try {
            const connection = await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.deleteOne({ _id: idToDelete }).toArray();
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

}

module.exports = mongoRepository;