import { Link } from 'react-router-dom';
import style from '../Styles/footer.module.css';
import Logo from './Logo';
import metaLogo from '../Assest/Images/meta.svg';
import twitterLogo from '../Assest/Images/twitter.svg';
import instagramLogo from '../Assest/Images/instagram.svg';
import linkedInLogo from '../Assest/Images/LinkedIn.svg';

const Footer = () => {
	return (
		<footer className={style.footer}>
			<div className="container">
				<div className={` ${style.footerContainer} inner-container`} >
					<div>
						<div>
							<Logo />
							<address>
								Kuanwala, Dehradun <br />
								Uttarakhand, 248001, India
							</address>
						</div>
						<div>
							<h3>Quick Links</h3>
							<ul>
								<li><Link to={'/'}>Home </Link></li>
								<li><Link to={'/about'}>Contact </Link></li>
								<li><Link to={'/signup'}>Signup </Link></li>
								<li><Link to={'/login'}>Login </Link></li>
							</ul>
						</div>
						<div>
							<h3>Candidate</h3>
							<ul>
								<li><Link to={'/jobs'}>Browse Jobs </Link></li>
								<li><Link to={'/'}>Candidate Dashboard </Link></li>
								<li><Link to={'/'}>Saved Jobs </Link></li>
							</ul>
						</div>
						<div>
							<h3>Employer</h3>
							<ul>
								<li><Link to={'/employer/add_job'}>Post a Job </Link></li>
								<li><Link to={'/employer'}>Employer Dashboard </Link></li>
								<li><Link to={'/employer'}>Application </Link></li>
							</ul>
						</div>
					</div>
					<div className={style.copyright}>
						<p>2024 @ JobHuntly. All rights reserved</p>
						<div>
							<a href="#">
								<img src={instagramLogo} alt="instagram" />
							</a>
							<a href="#">
								<img src={metaLogo} alt="meta" />
							</a>
							<a href="#">
								<img src={linkedInLogo} alt="linkedIn" />
							</a>
							<a href="#">
								<img src={twitterLogo} alt="twitter" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;