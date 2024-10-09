import { Link } from 'react-router-dom';
import style from '../Styles/HowItWorks.module.css';
import { FaArrowRight } from 'react-icons/fa6';
const HowItWorks = () => {
	return (
		<div className="container">
			<div className={style.howItWorks}>
				<h2 className='heading tx-center'>How it <span>Work</span></h2>
				<p>Explore the following steps will help you to find job easil3</p>
				<div>
					<div>
						<p>Step <span>1</span></p>
						<h3>Register Account</h3>
						<p>Create Account </p>
						<Link to={'/signup/candidate/'}>Register Account <FaArrowRight /></Link>
					</div>
					<div>
						<p>Step <span>2</span></p>
						<h3>Find Job</h3>
						<p>Search for jobs. according to your interest</p>
						<Link to={'/jobs'}>Find Jobs <FaArrowRight /></Link>
					</div>
					<div>
						<p>Step <span>3</span></p>
						<h3>Apply Job</h3>
						<p>Apply for the jobs</p>
						<Link to={'/jobs'}>Apply
							<FaArrowRight />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowItWorks