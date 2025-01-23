import express, { response } from "express";
import cors from "cors";
import 'dotenv/config'
import './database.js';
import { Todo } from "./models/index.js";


const app = express();
const port = process.env.PORT || 5002;

// to convert body into json
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173","https://todo-list-mongodb.surge.sh",
    ],
  }),
);
 
app.get("/api/v1/todos", async(request, response) => {

 try {
  const todos = await Todo.find(
    {},
    // {ip:0, __v:0, updatedAt: 0 });
    {todoContent:1}
  );
  
    const message = !todos.length ? "todos empty" : "ye lo sub todos";
    response.status(200).send({ data: todos, message: message });
 } catch (error) {
  response.status(500).send("internal server error");
 }
});


// app.post("/api/v1/todo", async (request, response) => {
//   const obj = {
//     todoContent: request.body.todo,
//     ip: request.ip,
//   };

//   const result = await Todo.create(obj)

//   response.send({ message: "todo add hy", data: result });
// });


app.post("/api/v1/todo", async(request, response) => {
  try {
    const { todo } = request.body.todo;
    const obj = {
      todoContent: request.body.todo,
      ip: request.ip
    };
  
    const result = await Todo.create(obj)
    
    response.status(201).send({data:result, message: "todo add ho gaya ha"});
  } catch (error) {
    response.status(501).send("error ha koi tw")
  }
  
});


app.patch("/api/v1/todo/:id", async(request, response) => {

try {
  const id = request.params.id;

  const result = await Todo.findByIdAndUpdate(id,
   {todoContent: request.body.todoContent}
 )
 console.log('result=>',result);
 
 
   if (result) {
     response.status(201).send({
       data: result,
       message: "todo updated successfully!",
     });
   } else {
     response.status(404).send({ data: null, message: "todo not found" });
   }
 } catch (error) {
  response.status(404).send("id not found");
 }
}),



app.delete("/api/v1/todo/:id", async(request, response) => {

  try {
    const id = request.params.id;

 const result = await Todo.findByIdAndDelete(id)

  if (result) {
    response.status(201).send({
      // data:{ todoContent: request.body.todoContent,id: id,},
      message: "todo deleted successfully!",
    });
  } else {
    response.status(204).send({ data: null, message: "todo not found" });
  }

  } catch (error) {
    response.status(204).send("No content found");
  }
});
//

app.use((request, response) => {
  response.status(404).send({ massage: "no route found!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




