const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const databaseName = "db1";

const mongoRepository = {
    getDataFromDB: async (collectionName) => {
        try {
            await client.connect();
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
        delete dataToUpdate.status;
        dataToUpdate._id = ObjectId(dataToUpdate._id);
        const query = { _id: dataToUpdate._id };
        try {
            await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.findOneAndReplace(query, dataToUpdate);
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

    insertDataToDB: async (collectionName, dataToInsert) => {
        delete dataToInsert.status;
        dataToInsert._id = ObjectId(dataToInsert._id);
        try {
            
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

    deleteOneDataFromDB: async (collectionName, dataToDelete) => {
        const idToDelete = ObjectId(dataToDelete._id)
        try {
            await client.connect();
            const dataBase = client.db('db1');
            const collection = dataBase.collection(collectionName);
            const data = await collection.deleteOne({ _id: idToDelete });
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    },

}

module.exports = mongoRepository;