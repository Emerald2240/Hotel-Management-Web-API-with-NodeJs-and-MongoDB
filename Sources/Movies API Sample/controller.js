const data = require("./data");
// const data = [{"message": "I'm going to work perfectly. Whether i like it or not."}];

class Controller {

    //getting all moviesA
    async getMovies() {
        return new Promise((resolve, _) => resolve(data));
    }

    //get a single movie
    async getMovie(id) {
        return new Promise((resolve, reject) => {

            //get the single movie
            let movie = data.find((movie) => movie.id === parseInt(id));
            if (movie) {

                //return the movie
                resolve(movie);
            } else {

                //return an error
                reject(`Movie with id: ${id} not found`);
            }
        });
    }

    async createMovie(movie) {
        return new Promise((resolve, _) => {

            //create a movie, with random id and data sent
            let newMovie = {
                id: Math.floor(4 + Math.random() * 10),
                ...movie,
            };

            //return the newly created movie
            resolve(newMovie);
        });
    }

    async updateMovie(id) {
        return new Promise((resolve, reject) => {

            //get the movie
            let movie = data.find((movie) => movie.id === parseInt(id));

            //if no movie, return an error
            if (!movie) {
                reject(movie);
            }

            //else, update it by setting completed to true
            movie["completed"] = true;

            //return the updated movie
            resolve(movie);
        });
    }

    //deleting a movie
    async deleteMovie(id) {
        return new Promise((resolve, reject) => {

            //get the movie
            let movie = data.find((movie) => movie.id === parseInt(id));

            //if no movie, return an error
            if (!movie) {
                reject(`No movie with id ${id} found`);
            }

            //else return a success message
            resolve("Movie deleted successfully");
        });
    }


}

module.exports = new Controller();