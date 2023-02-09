//a module imported from the node_modules folder, is always inside double quotes and without slashes or dots
const http = require("http");
const Movie = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

// /api/v1/movies: GET
const server = http.createServer(async (req, res) => {

    //default
    if (req.url === "/api/v1/movies" && req.method === "GET") {

        //get the movies
        const movies = await Movie.getMovies();

        //set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });

        // res.end(JSON.stringify({ message: "Route not found" }));

        //send the data
        res.end(JSON.stringify(movies));
    }


    // /api/v1/movies:id: GET
    else if (req.url.match(/\/api\/v1\/movies\/([0-9]+)/) && req.method === "GET") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //get movie
            const movie = await Movie.getMovie(id);

            //set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });

            //send the data
            res.end(JSON.stringify(movie));
        } catch (error) {

            //set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });

            //send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/v1/movies:id: DELETE
    else if (req.url.match(/\/api\/v1\/movies\/([0-9]+)/) && req.method === "DELETE") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //delete movie
            const message = await Movie.deleteMovie(id);

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

    // /api/v1/movies:id: UPDATE
    else if (req.url.match(/\/api\/v1\/movies\/([0-9]+)/) && req.method === "PATCH") {
        try {

            //get id from url
            const id = req.url.split("/")[4];

            //update movie
            let updatedMovie = await Movie.updateMovie(id);

            //set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });

            //send the data
            res.end(JSON.stringify(updatedMovie));
        } catch (error) {

            //set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });

            //send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/v1/movies:id: POST
    else if (req.url === "/api/v1/movies" && req.method === "POST") {

        //get all data
        let movieData = await getReqData(req);

        //create movie
        let movie = await Movie.createMovie(JSON.parse(movieData));

        //set the status code and content-type
        res.writeHead(201, { "Content-Type": "application/json" });

        //send the data
        res.end(JSON.stringify(movie));

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