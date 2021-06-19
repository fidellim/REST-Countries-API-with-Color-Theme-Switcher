import Country from "./Country";
import React, { useEffect, useState, useRef } from "react";

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [isFilterToggled, setIsFilterToggled] = useState(false);
	const _isMounted = useRef(true);

	useEffect(() => {
		getCountries();
		// _isMounted.current = true;
		return () => {
			// ComponentWillUnmount in Class Component
			_isMounted.current = false;
		};
	}, []);

	const getCountries = async () => {
		const response = await fetch("https://restcountries.eu/rest/v2/all");
		const data = await response.json();
		if (_isMounted.current) {
			setCountries(data);
		}
	};

	const handleFilterToggle = () => {
		setIsFilterToggled(!isFilterToggled);
	};

	// onChange for searching countries
	const updateSearch = (e) => {
		const { value } = e.target;
		// window.addEventListener("DOMContentLoaded", () => {
		// 	updateSearchedCountries();
		// });
		updateSearchedCountries(value);
	};

	const updateSearchedCountries = (value) => {
		// get tag of country name
		const countryName = document.querySelectorAll(".countryName");

		// check every country if it includes some characters from search
		// add hideCountry class is not searched
		countryName.forEach((cN) => {
			if (cN.innerHTML.toLowerCase().includes(value.toLowerCase())) {
				// cN.parentElement.parentElement.parentElement.style.display = "block";
				cN.parentElement.parentElement.parentElement.classList.remove(
					"hideCountry"
				);
			} else {
				// cN.parentElement.parentElement.parentElement.style.display = "none";
				cN.parentElement.parentElement.parentElement.classList.add(
					"hideCountry"
				);
			}
		});
	};

	// onClick for Regions
	const handleSelectedRegion = (e) => {
		const selectedRegion = e.target.innerHTML;

		filterSelectedRegion(selectedRegion);
		// console.log(selectedRegion);
	};

	// filter countries based on region
	const filterSelectedRegion = (selectedRegion) => {
		const countryRegion = document.querySelectorAll(".countryRegion");

		// check every country if it includes some characters from search
		// add hideCountryRegion class is not filtered
		countryRegion.forEach((cR) => {
			if (cR.innerHTML.includes(selectedRegion) || selectedRegion === "All") {
				// cR.parentElement.parentElement.parentElement.parentElement.style.display =
				// 	"block";
				cR.parentElement.parentElement.parentElement.parentElement.classList.remove(
					"hideCountryRegion"
				);
			} else {
				// cR.parentElement.parentElement.parentElement.parentElement.style.display =
				// 	"none";
				cR.parentElement.parentElement.parentElement.parentElement.classList.add(
					"hideCountryRegion"
				);
			}
		});
	};

	return (
		<div className="countries">
			<div className="searchAndFilterContainer">
				<div className="searchBar">
					<i className="fas fa-search"></i>
					<input
						type="text"
						placeholder="Search for a country..."
						onChange={updateSearch}
					/>
				</div>

				<div className="filter" onClick={handleFilterToggle}>
					<div className="filterHeading">
						<p>Filter by Region</p>
						<i className="fas fa-chevron-down"></i>
					</div>
					<div className={isFilterToggled ? "regions openRegions" : "regions"}>
						<ul>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								All
							</li>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								Africa
							</li>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								Americas
							</li>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								Asia
							</li>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								Europe
							</li>
							<li onClick={handleSelectedRegion} className="selectedRegion">
								Oceania
							</li>
						</ul>
					</div>
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
