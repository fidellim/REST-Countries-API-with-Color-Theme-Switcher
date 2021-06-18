import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CountryDetails = () => {
	const { name } = useParams();
	const [countryData, setCountryData] = useState([]);

	useEffect(() => {
		getCountryData();
	}, []);

	const getCountryData = async () => {
		const response = await fetch(
			`https://restcountries.eu/rest/v2/name/${name}`
		);
		const data = await response.json();
		setCountryData(data);
	};

	return (
		<div className="countryDetails">
			<Link to="/">
				<div className="btn btn-back">
					<i className="fas fa-arrow-left"></i>
					<h2>Back</h2>
				</div>
			</Link>
			<div className="countryPropsContainer">
				{countryData.map((data) => {
					return (
						<div>
							<img src={data.flag} alt={data.name} />
							<div className="countryProps">
								<h1>{data.name}</h1>
								<div className="countryPropsOne">
									<h2>
										Native Name: <span>{data.nativeName}</span>
									</h2>
									<h2>
										Population: <span>{data.population}</span>
									</h2>
									<h2>
										Region: <span>{data.region}</span>
									</h2>
									<h2>
										Sub Region: <span>{data.subregion}</span>
									</h2>
									<h2>
										Capital: <span>{data.capital}</span>
									</h2>
								</div>
								<div className="countryPropsTwo">
									<h2>
										Top Level Domain: <span>{data.topLevelDomain[0]}</span>
									</h2>
									<h2>
										Currencies: <span>{data.currencies[0].name}</span>
									</h2>
									<h2>
										Languages:
										<span>
											{data.languages.map((lang) => ` | ${lang.name} |`)}
										</span>
									</h2>
								</div>
								<div className="borderCountries">
									<h1>Border Countries:</h1>
									{data.borders.map((border) => {
										return (
											<div className="btn btn-border-country">
												<h2>{border}</h2>
											</div>
										);
									})}
									{/* if there are no border countries */}
									{data.borders.length === 0 && <h3>No Border Countries</h3>}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CountryDetails;
