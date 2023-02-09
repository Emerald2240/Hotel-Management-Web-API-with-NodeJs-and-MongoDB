//a module imported from the node_modules folder, is always inside double quotes and without slashes or dots
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

// /api/v1/todos: GET
const server = http.createServer(async (req, res) => {
    
    //default
    if (req.url === "/api/v1/todos" && req.method === "GET") {
        //get the todos
        const todos = await Todo.getTodos();

        //set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });

        //send the data
        res.end(JSON.stringify(todos));
    }


    // /api/v1/todos:id: GET
    else if (req.url.match(/\/api\/v1\/todos\/([0-9]+)/) && req.method === "GET") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //get todo
            const todo = await Todo.getTodo(id);

            //set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });

            //send the data
            res.end(JSON.stringify(todos));
        } catch (error) {

            //set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });

            //send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/v1/todos:id: DELETE
    else if (req.url.match(/\/api\/v1\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //delete todo
            const message = await Todo.deleteTodo(id);

            //set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });

            //send the data
            res.end(JSON.stringify({ message }));
        } catch (error) {

            //set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });

            //send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/v1/todos:id: UPDATE
    else if (req.url.match(/\/api\/v1\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //update todo
            let updatedTodo = await Todo.updateTodo(id);

            //set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });

            //send the data
            res.end(JSON.stringify(updatedTodo));
        } catch (error) {

            //set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });

            //send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/v1/todos:id: POST
    else if (req.url === "/api/v1/todos" && req.method === "POST") {

        //get all data
        let todoData = await getReqData(req);

        //create todo
        let todo = await Todo.createTodo(JSON.parse(todoData));

        //set the status code and content-type
        res.writeHead(201, { "Content-Type": "application/json" });

        //send the data
        res.end(JSON.stringify(todo));

    }


    else {
        //set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });

        //send the error
        res.end(JSON.stringify({ message: "Route not found" }));
    }

})


server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});