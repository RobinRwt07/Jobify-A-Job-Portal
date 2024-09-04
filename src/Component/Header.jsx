import { useEffect, useState } from 'react';
import style from '../Styles/Header.module.css';
import Button from './Button';
import Logo from './Logo';
import MenuLogo from '../Assest/Images/menu_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	const [isNavActive, setNavActive] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

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
						<nav>
							<Button type='btn-tertiary' handler={handleMenuToggle}>
								<FontAwesomeIcon icon={faClose} size='xl' />
							</Button>
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">Jobs</a></li>
								<li><a href="#">Employer</a></li>
								<li><a href="#">Candidate</a></li>
								<li><a href="#">About Us</a></li>
							</ul>
						</nav>
					</div>
				}
				<div className={style.btnGroup}>
					<Button type='btn-secondary'>Login</Button>
					<Button type='btn-primary'>Signin</Button>
				</div>
				<div className={style.menuBtn} onClick={handleMenuToggle}>
					<img src={MenuLogo} alt="menu-btn" />
				</div>
			</div>
		</header>
	)
}

export default Header;