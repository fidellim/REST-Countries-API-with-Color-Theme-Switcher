import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";

const App = () => {
	const [isToggled, setIsToggled] = useState(false);

	// toggle for dark/light mode
	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	return (
		<Router>
			<div className={isToggled ? "dark" : null}>
				{/* pass handleToggle func as prop */}
				<Header handleToggle={handleToggle} />
				<Switch>
					<Route exact path="/">
						<Countries />
					</Route>
					<Route path="/:name">
						<CountryDetails />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
