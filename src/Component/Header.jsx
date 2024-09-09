import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from '../Styles/Header.module.css';
import Button from './Button';
import Logo from './Logo';
import MenuLogo from '../Assest/Images/menu_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	const [isNavActive, setNavActive] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const navigate = useNavigate();

	function handleMenuToggle() {
		setNavActive(!isNavActive);
	}

	function handleMediaQueryChange(mediaQuery) {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		}
		else {
			setIsSmallScreen(false);
		}
	}

	function handleNavigate(path) {
		setNavActive(false);
		navigate(path);
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 800px)");
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		}
		mediaQuery.addEventListener('change', handleMediaQueryChange);
		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<header className={style.header}>
			<div className="container" >
				<Logo />
				{
					(isNavActive || !isSmallScreen) &&
					<div className={style.navigation}>
						<nav style={style.navbar}>
							<Button type='btn-tertiary' handler={handleMenuToggle}>
								<FontAwesomeIcon icon={faClose} size='xl' />
							</Button>
							<ul>
								<li><NavLink to={'/'} end>Home</NavLink></li>
								<li><NavLink to={'/jobs'} end>Jobs</NavLink></li>
								<li><NavLink to={'/'} end>Employer</NavLink></li>
								<li><NavLink to={'/'} end>Candidate</NavLink></li>
								<li><NavLink to={'/'} end>About Us</NavLink></li>
							</ul>
						</nav>
						<div className={style.btnGroup}>
							<Button type='btn-secondary' handler={() => handleNavigate('/login')} >Login</Button>
							<Button type='btn-primary' handler={() => handleNavigate('/signup')}>Signup</Button>
						</div>
					</div>
				}
				<div className={style.menuBtn} onClick={handleMenuToggle}>
					<img src={MenuLogo} alt="menu-btn" />
				</div>
			</div>
		</header>
	)
}

export default Header;