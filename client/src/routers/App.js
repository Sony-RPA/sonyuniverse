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
import ResetPassword from "../components/auth/ResetPassword"
import ChangePassword from "../components/auth/ChangePassword"
import ChannelsContainer from "../components/channels/ChannelsContainer"
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
						<Switch>
							<Route path="/" component={Landing} exact={true}/>
							<Route path="/register" component={Register}/>
							<Route path="/login" component={Login}/>
							<Route path="/profiles" component={Profiles}/>
							<Route path="/profile/:handle" component={Profile}/>
							<Route path="/reset-password" component={ResetPassword}/>
							<Route path="/change-password/:hash" component={ChangePassword}/>
							<PrivateRoute path="/dashboard" component={Dashboard}/>
							<PrivateRoute path="/create-profile" component={CreateProfile}/>
							<PrivateRoute path="/edit-profile" component={EditProfile}/>
							<PrivateRoute path="/edit-avatar" component={EditAvatar}/>
							<PrivateRoute path="/add-experience" component={AddExperience}/>
							<PrivateRoute path="/add-education" component={AddEducation}/>
							<PrivateRoute path="/feed" component={Posts}/>
							<PrivateRoute path="/posts/:id" component={Post}/>
							<PrivateRoute path="/channels" component={ChannelsContainer}/>					
							<Route component={NotFound}/>
						</Switch>																											
						<Footer/>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App