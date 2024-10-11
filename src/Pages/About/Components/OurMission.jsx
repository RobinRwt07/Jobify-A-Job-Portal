import style from '../Styles/about.module.css';
import image from '../../../Assest/Images/mission.jpg';

const OurMission = () => {
	return (
		<div className={`${style.ourMission} container`}>
			<div>
				<h3>Our Mission</h3>
				<p>At Jobify, Our mission is to simplify the job search process by providing a user-friendly platform where both candidates and employers can connect efficiently. We believe in fostering an environment where job seekers can grow their careers and employers can find the right talent to drive their success.</p>
			</div>
			<div>
				<img src={image} alt="image" />
			</div>
		</div>
	)
}

export default OurMission