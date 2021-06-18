import Country from "./Country";
import React, { useEffect, useState } from "react";

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [isFilterToggled, setIsFilterToggled] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = async () => {
		const response = await fetch("https://restcountries.eu/rest/v2/all");
		const data = await response.json();
		setCountries(data);
	};

	const handleFilterToggle = () => {
		setIsFilterToggled(!isFilterToggled);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);

		updateSearchedCountries();
	};

	const updateSearchedCountries = () => {
		// get tag of country name
		const countryName = document.querySelectorAll(".countryName");

		// check every country if it includes some characters from search
		countryName.forEach((cN) => {
			if (cN.innerHTML.toLowerCase().includes(search.toLowerCase())) {
				cN.parentElement.parentElement.parentElement.style.display = "block";
			} else {
				cN.parentElement.parentElement.parentElement.style.display = "none";
			}
		});
	};

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
