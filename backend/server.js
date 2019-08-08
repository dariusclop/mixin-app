const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
var Cloudant = require("@cloudant/cloudant");
const port = process.env.PORT || 4000;
const cloudant = Cloudant(
  {
    url:
      "https://c9c2ad42-7a69-4b17-96d5-477ef83263ac-bluemix.cloudantnosqldb.appdomain.cloud",
    plugins: {
      iamauth: {
        iamApiKey: "IVbdQq3lZSow9yfn5SWL-t6iD2TonCKcZkUtlWNmtsN2"
      }
    }
  },
  async (err, client) => {
    const dbList = await client.db.list();
    const dbExists = dbList.indexOf("db_test") !== -1;
    if (!dbExists) {
      client.db.create("db_test");
    }
  }
);
app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/add", async (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  await cloudant.db.use("db_test").insert(todo);
  res.send({ success: true });
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  let index = todos.findIndex(x => x.id === id);
  todos.splice(index, 1);
  console.log("\ntodos", todos);
  res.send({ success: true, deleteId: id });
});

app.post("/checked/:id", (req, res) => {
  const id = req.params.id;
  let index = todos.findIndex(x => x.id === id);
  todos[index] = {
    ...todos[index],
    checked: !todos[index].checked
  };
  res.send({ success: true });
});

app.get("/getTodos", async (req, res) => {
  //const dbTodos=cloudant.db.use('db_test').find();
  res.send({ todos });
});

app.listen(port, (req, res) => {
  console.log("Server is running");
});
