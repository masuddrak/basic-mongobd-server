const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
// medilware
app.use(cors())
app.use(express.json())

// FHxUKPfqLWoNoWEa
// masud24861

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://masud24861:FHxUKPfqLWoNoWEa@cluster0.kaocfbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // await client.connect();
        // Connect the client to the server	(optional starting in v4.7)
        const userCollection = client.db("userDB").collection("users");

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result)
            console.log("user delete id", id)
        })
        app.get("/users", async (req, res) => {
            const cursor = await userCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.post("/users", async (req, res) => {
            const user = req.body
            const result = await userCollection.insertOne(user);
            res.send(result)
            console.log("create success", result)
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World! masud')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})