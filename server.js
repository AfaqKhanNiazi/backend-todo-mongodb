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





// // get all todos api
// app.get("/api/v1/todos", async (req, res) => {
//   try {
//     const todos = await Todo.find(
//       {},
//       //ye data base se data fetch karne ka method ha
//       // projection ma hum data ko filter kar sakte ha konsa data front end pe aye ga or konsa nahi

//       // {createdAt:0, updatedAt:0, __v:0, ip:0} //projection (0 wala front end pe nahi aye ga)
//       // {todoContent:1, _id:0} //projection (1 wala front end pa aye ga, _id nahi aye ge sirf id ki exception ha (0, 1) ma)
//       { todoContent: 1 } //projection (1 wala front end pe aye ga)
//     );

//     const message = !todos.length ? "todo empty" : "all todos fetched";

//     res.status(200).send({ data: todos, message: message });
//   } catch (error) {
//     res.status(500).send("Internal server error");
//   }
// }),


//   // add todo api
//   app.post("/api/v1/todo", async (req, res) => {
//     try {
//       const todo = req.body.todo;
//       const obj = {
//         todoContent: todo,
//         ip: req.ip,
//       };

//       // todos.push(obj)
//       const result = await Todo.create(obj);

//       res
//         .status(201)
//         .send({ data: result, message: "todo is added successfully!" });
//     } catch (error) {
//       res.status(400).send("network error");
//     }
//   }),


//   // edit or update todo api
//   app.patch("/api/v1/todo/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const result = await Todo.findByIdAndUpdate(id, {
//         todoContent: req.body.todoContent,
//       });
//       console.log("result=>", result);

//       if (result) {
//         res.status(202).send({
//           data: result,
//           message: "todo is updated successfully!",
//         });
//       } else {
//         res.status(404).send({ data: null, message: "todo not found!" });
//       }
//     } catch (error) {
//       res.status(404).send("id not found");
//     }
//   }),


//   // delete todo api
//   app.delete("/api/v1/todo/:id", async(req, res) => {
//     try {
//       const id = req.params.id;

//       const result = await Todo.findByIdAndDelete(id);

//       if (result) {
//         res.status(200).send({
//           message: "todo is deleted successfully!",
//         });
//       } else {
//         res.status(204).send({ data: null, message: "todo not found!" });
//       }
//     } catch (error) {
//       res.status(204).send("No content found");
//     }
//   }),


//   // no route found api
//   app.use((req, res) => {
//     res.status(404).send({ message: "no route found!" });
//   }),
  
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
