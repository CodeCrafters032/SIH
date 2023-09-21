import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentLeaderboard from "./pages/StudentLeaderboards";
import UniversityCollabs from "./pages/UniversityCollabs";
import UniversityPopularity from "./pages/UniversityPopularity";
import UniversityUploads from "./pages/UniversityUploads";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

library.add(fas, faTwitter, faFontAwesome);
function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
				<Route path="/student_leaderboards" element={<StudentLeaderboard />} />
				<Route path="/university_popularity" element={<UniversityPopularity />} />
				<Route path="/university_uploads" element={<UniversityUploads />} />
				<Route path="/university_collabs" element={<UniversityCollabs />} />
			</Routes>
		</Router>
	);
export default App;



// return (
// 	<div className="flex ">
// 		<Sidebar />
// 		<Nav />
// 	</div>
// );

		//<Dashboard/>
		//<StudentLeaderboard/>
		//<UniversityPopularity/>
		//<UniversityUploads/>
		//<UniversityCollabs/>
