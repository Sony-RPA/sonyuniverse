//dependencies
const compression = require("compression")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const passportAuthenticate = require("./config/passport")
const path = require("path")
const Notification = "./models/Notification"
const User = "./models/User"

//DB config
const db = require("./config/keys").mongoURI

//connect to mongoDB
mongoose
	.connect(db)
	.then(() => console.log("mongoDB connected"))
	.catch((error) => console.log(error))

//enable gzip compression
app.use(compression())

//passport middleware
app.use(passport.initialize()) //enables authentication with passport

//passport config
passportAuthenticate(passport)

//define middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
const authRoutes = require("./routes/api/auth")
const postsRoutes = require("./routes/api/posts")
const profileRoutes = require("./routes/api/profile")
const colleagueRoutes = require("./routes/api/colleagues")
const chatKitRoutes = require("./routes/api/chatkit")
const conversationRoutes = require("./routes/api/conversation")
const notificationRoutes = require("./routes/api/notification")

//Use Routes
authRoutes(app)
postsRoutes(app)
profileRoutes(app)
colleagueRoutes(app)
chatKitRoutes(app)
conversationRoutes(app)
notificationRoutes(app)

//serve static assets if in production
if(process.env.NODE_ENV === "production"){
	//set a static folder
	app.use(express.static("client/build"))

	//for any route, load the index.html file
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

if(process.env.NODE_ENV == "production"){
	User.find({})
		.then((foundUsers) => {
			foundUsers.forEach((user) => {
				new Notification({user: user._id}).save()
			})
			res.json({status: "completed"})
		})
		.catch((errors) => {
			return res.status(404).json({ error: "could not create users"})
		})
}


//define ports
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
	console.log("app is running")
})