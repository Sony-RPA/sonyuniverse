import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../store/configureStore"
import Banner from "../components/common/Banner"
import Navbar from "../components/layout/Navbar"
import Login from "../components/auth/Login"
import ResetPassword from "../components/auth/ResetPassword"
import Landing from "../components/layout/Landing"
import Footer from "../components/layout/Footer"
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
import ChangePassword from "../components/auth/ChangePassword"
import ChannelsContainer from "../components/channels/ChannelsContainer"
import Videos from "../components/videos/Videos"
import UploadVideo from "../components/upload-video/UploadVideo"
import ConfirmVideo from "../components/upload-video/ConfirmVideo"
import NotFound from "../components/not-found/NotFound"
import jwt_decode from "jwt-decode"
import setAuthToken from "../utils/setAuthToken"
import PrivateRoute from "../components/common/PrivateRoute"
import Video from "../components/video/Video"
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
		const DefaultRoutes = () => {
			return(
				<div>
					<Switch>
						<Route path="/" component={Landing} exact={true}/>
						<Route path="/login" component={Login}/>
						<Route path="/reset-password" component={ResetPassword}/>
						<Route path="/profiles" component={Profiles}/>
						<Route path="/profile/:handle" component={Profile}/>
						<Route path="/change-password/:hash" component={ChangePassword}/>
						<Route path="/videos" component={Videos}/>
						<Route path="/video/:id" component={Video}/>
						<PrivateRoute path="/dashboard" component={Dashboard}/>
						<PrivateRoute path="/create-profile" component={CreateProfile}/>
						<PrivateRoute path="/edit-profile" component={EditProfile}/>
						<PrivateRoute path="/edit-avatar" component={EditAvatar}/>
						<PrivateRoute path="/add-experience" component={AddExperience}/>
						<PrivateRoute path="/add-education" component={AddEducation}/>
						<PrivateRoute path="/feed" component={Posts}/>
						<PrivateRoute path="/posts/:id" component={Post}/>
						<PrivateRoute path="/upload-video/confirm" component={ConfirmVideo}/>
						<PrivateRoute path="/upload-video" component={UploadVideo}/>
						<Route component={NotFound}/>				
					</Switch>																											
					<Footer/>
				</div>
			)
		}

		return(
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Banner/>
						<Navbar/>
						<Switch>
							<PrivateRoute path="/channels" component={ChannelsContainer} exact/>
							<Route component={DefaultRoutes}/>
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App