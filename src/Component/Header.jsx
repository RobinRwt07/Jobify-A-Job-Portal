import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from '../Styles/Header.module.css';
import Button from './Button';
import Logo from './Logo';
import MenuLogo from '../Assest/Images/menu_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCandidateAuth } from '../hooks/useCandidateAuth';
import { useEmployerAuth } from '../hooks/useEmployerAuth';
import avatar from '../Assest/Images/profileAvatar.png';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
	const [isNavActive, setNavActive] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const navigate = useNavigate();
	const { candidateAuthed, candidateLogout } = useCandidateAuth();
	const { employerAuthed, setEmployerAuth } = useEmployerAuth();

	const [anchorEl, setAnchorEl] = useState(null);
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

	const open = Boolean(anchorEl);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

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

	function closeNavBar() {
		setNavActive(false);
	}
	function handleLogout() {
		handleMenuClose();
		candidateLogout();
	}


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
							<div>
								<NavLink to={'/'} end onClick={closeNavBar}>Home</NavLink>
								<NavLink to={'/jobs'} end onClick={closeNavBar}>Jobs</NavLink>
								{
									candidateAuthed ?
										<NavLink to={'/candidate'} end onClick={closeNavBar}>Dashboard</NavLink> :
										(employerAuthed) ?
											<NavLink to={'/employer'} onClick={closeNavBar}>Dashboard</NavLink> :
											<>
												<NavLink to={'/employer'} onClick={closeNavBar} >Employer</NavLink>
												<NavLink to={'/candidate'} end onClick={closeNavBar}>Candidate</NavLink>
											</>
								}
								<NavLink to={''} end onClick={closeNavBar}>About Us</NavLink>
							</div>
						</nav>
						{
							!(candidateAuthed || employerAuthed) &&
							<div className={style.btnGroup}>
								<Button type='btn-secondary' handler={() => handleNavigate('/login')} >Login</Button>
								<Button type='btn-primary' handler={() => handleNavigate('/signup')}>Signup</Button>
							</div>
						}
					</div>
				}
				<div className='flex-justify-center'>
					<div className={style.menuBtn} onClick={handleMenuToggle}>
						<img src={MenuLogo} alt="menu-btn" />
					</div>
					{candidateAuthed &&
						<>
							<div className={style.profileAvatar} onClick={handleMenuOpen}>
								<img src={avatar} alt="profile picture" />
							</div>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleMenuClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={() => navigate('/candidate/profile')}>Profile</MenuItem>
								<MenuItem onClick={handleMenuClose}>My account</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</>
					}
				</div>
			</div>
		</header>
	)
}

export default Header;