import express from "express";
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
      "http://localhost:5173","https://back-end-todo-list.surge.sh",
    ],
  }),
);

app.get("/api/v1/todos", async(request, response) => {

 try {
  const todos = await Todo.find({},
    {ip:0, __v:0, updatedAt: 0 } // projection (0 wale front per nhi ai ga)
    // {todoContent:1} // surf todo content show ho ga frontend per bike kuch show nhi hoga
    // {todoContent:1,_id:0} // advance surf id ma different key add ho sagti hy like 0 or 1
  );
  
    const message = !todos.length ? "todos empty" : "ye lo sub todos";
    response.send({ data: todos, message: message });
 } catch (err) {
  response.status(500).send("internal server error");
 }
});




// naya todo banane ke lia
app.post("/api/v1/todo", async(request, response) => {
  const obj = {
    todoContent: request.body.todo,
    ip: request.ip
  };

const result = await Todo.create(obj)

  response.send({ message: "todo add ho gaya ha", data: result });
});

// ye api ko edit ya update karne ke ha
app.patch("/api/v1/todo/:id", async(request, response) => {
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
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

app.delete("/api/v1/todo/:id", async(request, response) => {
  const id = request.params.id;

 const result = await Todo.findByIdAndDelete(id)

  if (result) {
    response.status(201).send({
      // data:{ todoContent: request.body.todoContent,id: id,},
      message: "todo deleted successfully!",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

//

app.use((request, response) => {
  response.status(404).send({ massage: "no route found!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






// import express from "express";
// import cors from "cors";
// import './database.js'
// import { Todo } from "./models/index.js";


// const app = express();
// const port = process.env.PORT || 5002;



// app.use(express.json()); // To convert body into JSON
// app.use(
//   cors({ origin: ["http://localhost:5173","https://back-end-todo-list.surge.sh"] }),
// );

// app.get("/api/v1/todos", async (request, response) => {
//   try {

//     const todos = await Todo.find({},
//       { ip: 0, __v: 0, updatedAt: 0 } // projection (0 wale front per nhi aaye)


//       // { todoContent: 1 } saruf todoContent show hoga frontend per aur kuxh show nhi hoga
//       // { todoContent: 1, _id: 0 } // advance saruf id ma different keys use ho sagti hy like 0 and 1 

//     )

//     const message = !todos.length ? "todos empty" : "ye lo sab todos";

//     response.send({ data: todos, message: message });
//   } catch (err) {
//     response.status(500).send("Internal server error")
//   }
// });

// // naya todo bannae ko
// app.post("/api/v1/todo", async (request, response) => {
//   const obj = {
//     todoContent: request.body.todo,
//     ip: request.ip,
//   };

//   const result = await Todo.create(obj)

//   response.send({ message: "todo add hogya hy", data: result });
// });

// // ye todo ko update ya edit karne ki api ki
// app.patch("/api/v1/todo/:id", async (request, response) => {
//   const id = request.params.id;

//   const result = await Todo.findByIdAndUpdate(id,
//     { todoContent: request.body.todoContent }
//   )

//   console.log('result=>', result);

//   if (result) {
//     response.status(201).send({
//       data: result,
//       message: "todo updated successfully!",
//     });
//   } else {
//     response.status(200).send({ data: null, message: "todo not found" });
//   }
// });

// app.delete("/api/v1/todo/:id", async (request, response) => {
//   const id = request.params.id;

//   const result = await Todo.findByIdAndDelete(id)

//   if (result) {
//     response.status(201).send({
//       // data: { todoContent: request.body.todoContent, id: id, },
//       message: "todo deleted successfully!",
//     });
//   } else {
//     response.status(200).send({ data: null, message: "todo not found" });
//   }
// });

// //

// app.use((request, response) => {
//   response.status(404).send({ message: "no route found!" });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

