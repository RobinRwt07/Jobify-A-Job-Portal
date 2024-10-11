import style from '../Styles/about.module.css';
import image from '../../../Assest/Images/aboutUsPageImage.jpg';


const AboutUs = () => {
	return (
		<div className={` ${style.aboutWhoWeAre} container`}>
			<div>
				<h3>Who we are</h3>
				<p>Welcome to Jobify, a platform built to revolutionize the way job seekers and employers connect. We believe that finding the right job or the perfect hire should be a smooth, intuitive, and accessible process for everyone. Jobify brings the opportunities directly to you. Our platform offers a vast array of job listings across industries, locations, and experience levels.</p>
			</div>
			<div>
				<img src={image} alt="image" />
			</div>
		</div>
	)
}

export default AboutUs