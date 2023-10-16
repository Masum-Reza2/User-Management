const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mf3nl9y.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Tea Related API's
        const database = client.db("teaDB");
        const teaCollection = database.collection("tea");

        // Create operation
        app.post('/tea', async (req, res) => {
            const newTea = req.body;
            const result = await teaCollection.insertOne(newTea);
            res.send(result);
        })

        // Read operation
        app.get('/teas', async (req, res) => {
            const cursor = teaCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Delete Operation
        app.delete('/teas/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await teaCollection.deleteOne(query);
            res.send(result);
        })

        // Update operation
        // get single
        app.get('/tea/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await teaCollection.findOne(query);
            res.send(result);
        })

        app.patch('/tea/:id', async (req, res) => {
            const id = req.params.id;
            const tobeUpdate = req.body;
            const filter = { _id: new ObjectId(id) };
            console.log(tobeUpdate);
            const updateDoc = {
                $set: {
                    name: tobeUpdate.name,
                    quantity: tobeUpdate.quantity,
                    taste: tobeUpdate.taste,
                    color: tobeUpdate.color,
                    price: tobeUpdate.price,
                    category: tobeUpdate.category,
                    photo: tobeUpdate.photo
                },
            };
            const result = await teaCollection.updateOne(filter, updateDoc);
            res.send(result)
        })



        // Users realted api
        const UserCollection = database.collection("user");

        // craete
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await UserCollection.insertOne(user);
            res.send(result)
        })

        // update
        app.patch('/user', async (req, res) => {
            const user = req.body;
            const filter = { userEmail: user.email };
            const updateDoc = {
                $set: {
                    lastLoginTime: user.lastLoginTime,
                },
            };

            const result = await UserCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // read 
        app.get('/users', async (req, res) => {
            const cursor = UserCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



//  root server
app.get('/', (req, res) => {
    res.send('Tea master server in running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})