import Country from "./Country";
import React, { useEffect, useState, useRef } from "react";

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [isFilterToggled, setIsFilterToggled] = useState(false);
	const _isMounted = useRef(true);
	// const [isLoading, setIsLoading] = useState(true);
	const filterByRegion = document.getElementById("filterByRegion");
	const regionsData = [
		{
			name: "All",
		},
		{
			name: "Africa",
		},
		{
			name: "Americas",
		},
		{
			name: "Asia",
		},
		{
			name: "Europe",
		},
		{
			name: "Oceania",
		},
	];
	useEffect(() => {
		const getCountries = async () => {
			const response = await fetch("https://restcountries.com/v3/all");
			const data = await response.json();
			setCountries(data);
			if (_isMounted.current) {
				// setCountries(data);
			}
			// console.log(data.map((d) => d.flags[0]));
			// console.log(countries.map((d) => d["name"]["common"]));
		};

		getCountries();
		_isMounted.current = true;
		return () => {
			// ComponentWillUnmount in Class Component
			_isMounted.current = false;
		};
	}, [countries]);

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
		setIsFilterToggled(false);

		// set heading of filter by region to selected region
		filterByRegion.innerHTML = selectedRegion;

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
						<p id="filterByRegion">Filter by Region</p>
						<i className="fas fa-chevron-down"></i>
					</div>
					<div className={isFilterToggled ? "regions openRegions" : "regions"}>
						<ul>
							{regionsData.map((region) => {
								return (
									<li
										key={region.name}
										onClick={handleSelectedRegion}
										className="selectedRegion"
									>
										{region.name}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>

			<div className="countryContainer">
				{countries
					.sort((a, b) =>
						a["name"]["common"].localeCompare(b["name"]["common"])
					)
					.map((country) => {
						return (
							<Country
								key={`${country["name"]["common"]}${country["flags"][0]}`}
								name={country["name"]["common"]}
								// population={country.population}
								population="hihi"
								region={country.region}
								// region="asdsadsadss"
								capital={country["capital"]}
								flag={country["flags"][0]}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Countries;
