const Header = ({ handleToggle }) => {
	return (
		<header>
			<h1>Where in the world?</h1>
			<div className="btn-theme-switcher" onClick={handleToggle}>
				<i className="far fa-moon"></i>
				<i className="fas fa-moon"></i>
				<p>Dark Mode</p>
			</div>
		</header>
	);
};

export default Header;
