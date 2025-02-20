require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TaskManager Server....");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("task_db").collection("users");
    const tasksCollection = client.db("task_db").collection("tasks");

    // ➕ Add Users
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

    // ➕ Add Tasks
    app.post("/tasks", async (req, res) => {
      const tasks = req.body;
      const result = await tasksCollection.insertOne(tasks);
      res.send(result);
    });

    // 🔄 Get Tasks by Category
    app.get("/tasks", async (req, res) => {
      const category = req.query.category;
      const query = category ? { category } : {};
      const result = await tasksCollection.find(query).toArray();
      res.send(result);
    });

    // 🟢 Update Task Category
    app.put("/tasks/:id", async (req, res) => {
      const taskId = req.params.id;
      const { category } = req.body;

      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: { category } }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "Task not found or already updated" });
        }

        res.send({ message: "Task updated successfully", result });
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // ❌ Delete Task
    app.delete("/tasks/:id", async (req, res) => {
      const taskId = req.params.id;

      try {
        const result = await tasksCollection.deleteOne({
          _id: new ObjectId(taskId),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Task not found" });
        }

        res.send({ message: "Task deleted successfully", result });
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

   


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Connected to MongoDB!");
  } finally {
    // Keep the connection open for development
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`Server running on port ${port}`));
