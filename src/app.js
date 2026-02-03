let express = require("express")
require("dotenv").config();

// require rxpress path module
const path = require("path");
const http = require("http");
// importing body parser
const bodyParser = require("body-parser");

const { Server } = require('socket.io'); 
const { initializeSocket, getIo } = require("./utilities/io");
const { Port } = require("../config/firebase-auth");

// port
let port = Port || 9090;


let app = express()


const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// this package helps us recieve data from users in json format durring post method
app.use(bodyParser.json()); //application json




// for post requests
app.use(express.json())

app.use("/assets/images", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, "images")));


// this middleware allows CORS (cross origin resource sharing)
// which means api can be shared between different servers running
// on different ports,
app.use((req, res, next) => {
    req.IO = getIo();
    res.setHeader("Access-Control-Allow-Origin", "*");// this can be predictor.com
    res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})


// const io = configureSocket()
// const io = new Server(server, {
    // transports: ["polling", "websocket"],
    // allowEIO3: true, // false by default
    // pingInterval: 9000,
    // pingTimeout: 15000,
// });


 


// Routes
app.use("/api/v1", require("./routes/"))
app.use("//api/v1", require("./routes/"))
app.use("/", (req, res) => {
    res.send({
        message: "Welcome to Guru Logistics serverX",
        status: "success",
        data: {
            name: "Guru Logistics",
            version: "1.0.0",
            author: "Aminigbo",
            email: "aminigbo@gmail.com",
        }
    })
})

server.listen(process.env.PORT || 9090, () => {
    console.log("Server started on port " + port);
})

