import React from 'react'
import style from '../Styles/contactus.module.css';
import { IoMdMail } from 'react-icons/io';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ContactUs = () => {
	return (
		<div className='container'>
			<h2 className='heading tx-center'>Contact <span>Us</span></h2>
			<div className={style.contactUs}>
				<div>
					<div>
						<IoMdMail />
						<a href='mailto:robinrwt85@gmail.com'>robinrwt85@gmail.com</a>
					</div>
					<div>
						<FaPhone />
						<span>8988998594</span>
					</div>
					<div>
						<FaLocationDot />
						<span>Dehradun, Uttarakhand</span>
					</div>
				</div>
				<div>
					<h4>Social Media</h4>
					<div>
						<a href={'https://www.github.com/RobinRwt07'} target='_blank'>
							<FaGithub />
						</a>
						<a href='https://www.twitter.com' target='_blank'>
							<FaTwitter />
						</a>
						<a href={'https://in.linkedin.com/in/robin-singh-762359220'} target='_blank'>
							<FaLinkedin />
						</a>
					</div>
				</div>
			</div>
		</div >
	)
}

export default ContactUs