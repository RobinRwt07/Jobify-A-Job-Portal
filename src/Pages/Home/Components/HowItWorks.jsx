import { Link } from 'react-router-dom';
import style from '../Styles/HowItWorks.module.css';
import { FaArrowRight } from 'react-icons/fa6';
const HowItWorks = () => {
	return (
		<div className="container">
			<div className={style.howItWorks}>
				<h2 className='heading tx-center'>Get Hired in<span> 3 Quick Easy Steps</span></h2>
				<p className='block-sub-heading'>The quickest and most effective way to get hired by the top firm working in your career interest areas. </p>
				<div>
					<div>
						<p>Step <span>1</span></p>
						<h3>Register Account</h3>
						<p>Register for the job applicant profile, mention your personal and educational deatils. You're all set to find your dream job. </p>
						<Link to={'/signup/candidate/'}>Register Account <FaArrowRight /></Link>
					</div>
					<div>
						<p>Step <span>2</span></p>
						<h3>Find Job</h3>
						<p>Once you set your job hunting parameter, you will find opening jobs related to your interest. filter out some of the best job opeing</p>
						<Link to={'/jobs'}>Find Jobs <FaArrowRight /></Link>
					</div>
					<div>
						<p>Step <span>3</span></p>
						<h3>Apply</h3>
						<p>Apply for the opening jobs, and wait for some time. Schedule an interview and get hired. </p>
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