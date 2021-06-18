import Country from "./Country";
import React, { useEffect, useRef, useState } from "react";

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [isFilterToggled, setIsFilterToggled] = useState(false);
	const [search, setSearch] = useState("");
	const [searchedCountries, setSearchedCountries] = useState(countries);

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = async () => {
		const response = await fetch("https://restcountries.eu/rest/v2/all");
		const data = await response.json();
		setCountries(data);
	};

	// console.log(searchedCountries.length);

	const isInitialMount = useRef(true);
	// useEffect(() => {
	// 	if (isInitialMount.current) {
	// 		isInitialMount.current = false;
	// 	} else {
	// 		getSearchedCountries();
	// 		//only runs on updates
	// 	}
	// });

	const handleFilterToggle = () => {
		setIsFilterToggled(!isFilterToggled);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	// const getSearchedCountries = () => {
	// 	const newCountries = searchedCountries.filter((country) => {
	// 		return country.name.toLowerCase().includes(search.toLowerCase());
	// 	});
	// 	setSearchedCountries(search === "" ? countries : newCountries);
	// };

	return (
		<div className="countries">
			<div className="searchBar">
				<i className="fas fa-search"></i>
				<input
					type="text"
					value={search}
					placeholder="Search for a country..."
					onChange={updateSearch}
				/>
			</div>

			<div className="filter" onClick={handleFilterToggle}>
				<div>
					<p>Filter by Region</p>
					<i className="fas fa-chevron-down"></i>
				</div>
				<div className={isFilterToggled ? "regions openRegions" : "regions"}>
					<ul>
						<li>Africa</li>
						<li>America</li>
						<li>Asia</li>
						<li>Europe</li>
						<li>Ocenia</li>
					</ul>
				</div>
			</div>

			<div className="countryContainer">
				{countries.map((country) => (
					<Country
						key={`${country.name}${country.flag}`}
						name={country.name}
						population={country.population}
						region={country.region}
						capital={country.capital}
						flag={country.flag}
					/>
				))}
			</div>
		</div>
	);
};

export default Countries;
