function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = [];

            //listen to data sent by client
            req.on("data", (chunk) => {

                // append the string version to the body
                body += chunk.toString();
            });

            //listen till the end of data
            req.on("end", () => {
                if (body == "") {
                    body = JSON.stringify([{ "message": "No data passed" }]);
                }
                //send back the data
                resolve(body);
            });

            // //listen till the end of data
            // req.on("error", (err) => {

            //     //send back the data
            //     resolve(JSON.stringify([{ "message": "Unknown error occured" }]));
            // });


        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { getReqData }