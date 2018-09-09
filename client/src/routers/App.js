import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../store/configureStore"
import Banner from "../components/common/Banner"
import Navbar from "../components/layout/Navbar"
import Landing from "../components/layout/Landing"
import Footer from "../components/layout/Footer"
import Register from "../components/auth/Register"
import Login from "../components/auth/Login"
import Dashboard from "../components/dashboard/Dashboard"
import CreateProfile from "../components/create-profile/CreateProfile"
import EditProfile from "../components/edit-profile/EditProfile"
import EditAvatar from "../components/update-avatar/EditAvatar"
import AddExperience from "../components/add-credentials/AddExperience"
import AddEducation from "../components/add-credentials/AddEducation"
import Profiles from "../components/profiles/Profiles"
import Profile from "../components/profile/Profile"
import Posts from "../components/posts/Posts"
import Post from "../components/post/Post"
import NotFound from "../components/not-found/NotFound"
import jwt_decode from "jwt-decode"
import setAuthToken from "../utils/setAuthToken"
import PrivateRoute from "../components/common/PrivateRoute"
import {setCurrentUser, logoutUser} from "../actions/authActions"
import {clearCurrentProfile} from "../actions/profileActions"
import "../App.css"

//check for token, localStorage is a global variable we use to check the token
if(localStorage.jwtToken){
	//set auth token header auth
	setAuthToken(localStorage.jwtToken)
	//decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken)
	//dispatch our setCurrentUser action creator to get an updated redux state
	store.dispatch(setCurrentUser(decoded))
	//check for expired token
	const currentTime = Date.now() / 1000
	if(decoded.exp < currentTime){
		//Logout user
		store.dispatch(logoutUser())
		//clear current profile
		store.dispatch(clearCurrentProfile())
		//Redirect to login
		window.location.href = "/login"
	}
}

class App extends React.Component{
	render(){
		return(
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Banner/>
						<Navbar/>
						<Route path="/" component={Landing} exact={true}/>
						<div className="container">
							<Route path="/register" component={Register}/>
							<Route path="/login" component={Login}/>
							<Route path="/profiles" component={Profiles} exact={true} />
							<Route path="/profile/:handle" component={Profile}/>
							<Switch>
								<PrivateRoute path="/dashboard" component={Dashboard}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/create-profile" component={CreateProfile}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/edit-profile" component={EditProfile}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/edit-avatar" component={EditAvatar}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/add-experience" component={AddExperience}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/add-education" component={AddEducation}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/feed" component={Posts}/>
							</Switch>
							<Switch>
								<PrivateRoute path="/posts/:id" component={Post}/>
							</Switch>															
							<Route path="/not-found" component={NotFound}/>																													
						</div>
						<Footer/>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App