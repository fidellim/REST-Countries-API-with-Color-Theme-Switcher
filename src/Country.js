import { Link } from "react-router-dom";

const Country = ({ name, population, region, capital, flag }) => {
	return (
		<div className="country">
			<Link to={`/${name}`}>
				<img src={flag} alt={name} />
				<div>
					<h1 className="countryName">{name}</h1>
					<h2>
						Population: <span>{population}</span>
					</h2>
					<h2>
						Region: <span>{region}</span>
					</h2>
					<h2>
						Capital: <span>{capital}</span>
					</h2>
				</div>
			</Link>
		</div>
	);
};

export default Country;
