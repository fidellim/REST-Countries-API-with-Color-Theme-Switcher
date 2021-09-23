import { React, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const CountryDetails = () => {
	const { name } = useParams();
	const [countryData, setCountryData] = useState([]);
	const _isMounted = useRef(true);

	useEffect(() => {
		const getCountryData = async () => {
			const response = await fetch(
				`https://restcountries.com/v3/name/${name}?fullText=true`
			);
			const data = await response.json();

			if (_isMounted.current) {
				setCountryData(data);
			}
		};

		getCountryData();

		return () => {
			// ComponentWillUnmount in Class Component
			_isMounted.current = false;
		};
	});

	return (
		<div className="countryDetails">
			<Link to="/">
				<div className="btn btn-back">
					<i className="fas fa-arrow-left"></i>
					<h2>Back</h2>
				</div>
			</Link>
			<div>
				{countryData.map((data) => {
					return (
						<div className="countryPropsContainer" key={data["name"]["common"]}>
							<img src={data["flags"][0]} alt={data["name"]["common"]} />
							<div className="countryProps">
								<h1>{data["name"]["common"]}</h1>
								<div className="countryPropsDetailsContainer">
									<div className="countryPropsOne">
										<h2>
											Native Name: <span>{data.nativeName}</span>
										</h2>
										{/* <h2>
											Population: <span>{data.population}</span>
										</h2> */}
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
											Top Level Domain: <span>{data.tld[0]}</span>
										</h2>
										<h2>
											Currencies:{" "}
											<span>
												{
													data["currencies"][Object.keys(data.currencies)[0]][
														"name"
													]
												}
											</span>
										</h2>
										<h2>
											Languages:
											<span>
												{Object.keys(data.languages).map((key) => (
													<span
														key={key}
													>{` | ${data.languages[key]} | `}</span>
												))}
											</span>
											{/* {languages && languages.map((lang) => ` | ${lang} |`)} */}
										</h2>
									</div>
								</div>
								<div className="borderCountries">
									<h1>Border Countries:</h1>
									<div className="borderCountriesContainer">
										{data.borders.map((border) => {
											return (
												<div className="btn btn-border-country" key={border}>
													<h2>{border}</h2>
												</div>
											);
										})}
									</div>
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
