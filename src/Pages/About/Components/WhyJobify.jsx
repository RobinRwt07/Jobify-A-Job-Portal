import { FaClipboardList, FaUser } from 'react-icons/fa6';
import style from '../Styles/whyjobify.module.css';

import { IoIosColorPalette } from "react-icons/io";

const WhyJobify = () => {
	return (
		<div className={`${style.whyJobfifyContainer} container`}>
			<div>
				<h2 className='heading tx-center'>Why Choose <span>Jobify ?</span></h2>
				<p className='block-sub-heading'>When you choose Jobify, you're choosing a platform built with your success in mind. Here's why Jobify stands out:</p>
			</div>
			<div>
				<div>
					<div>
						<FaClipboardList />
					</div>
					<h4>Extensive Job Listings</h4>
					<p>Access thousands of job opportunities across various industries and locations. we cover the full spectrum of career paths.</p>
				</div>
				<div>
					<div>
						<IoIosColorPalette />
					</div>
					<h4>User-Centered Design</h4>
					<p> Our platform is designed to be intuitive and user-friendly, making it easy for you to navigate, apply for jobs.</p>
				</div>
				<div>
					<div>
						<FaUser />
					</div>
					<h4>Trusted by Employers</h4>
					<p>We partner with thousands of companies, from startups to Fortune, helping them connect with the right candidates every day.</p>
				</div>
			</div>
		</div>
	)
}

export default WhyJobify