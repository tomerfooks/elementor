//DOTENV FOR USING ENVIRONMENT VARIABLES
require("dotenv").config()
//MONGOCLIENT FOR DB CRUD OPERATIONS
const { MongoClient, ObjectId } = require("mongodb")
//USING EXPRESS
const app = require("express")()
//CORS FOR USING CORS REQUESTS
app.use(require("cors")())
//BODYPARSER FOR PARSING BODY OF REQUESTS
app.use(require("body-parser").json())
//SETTING SOME REQURED HEADERS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
//WELCOME PAGE
app.get("/", (req, res) => res.send("Hello Elementor!"))
//SETTING THE MONGODB URL AND PORT. IF NOT FOUND IN ENVIRONMENT VARIABLES, SETS A STATIC URL
let mongoUrl = process.env.mongourl || "mongodb://mongo:27017"
//WRAPS THE APP INSIDE AN ASYNC FUNCTION, FOR MORE ORGANIZED STRUCTURE AND FOR USING AWAIT
const server = async () => {
  //CREATES A USER CLIENT FOR INTERACTING WITH THE USERS COLLECTIONS IN THE MONGODB
  const Users = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  })
  //IMPORTS ROUTES INTO THE APP. IMPORTING ROUTES LIKE THIS KEEPS THE MAIN INDEX FILE SMALLER AND MAKES MAINTAINING ROUTES MORE EASY.
  require("./routes/users")(app, Users.db("elementor").collection("users"))
}
try {
  //USING TRY AND CATCH TO CAPTURE ANY ERRORS..
  server()
} catch (e) {
  //LOGS ANY ERRORS
  console.log(e)
}
//RUNNING THE SERVER
app.listen(process.env.apiport || 4000, () =>
  console.log("Server running on port ", process.env.apiport || 4000)
)
