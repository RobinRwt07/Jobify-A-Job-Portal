import style from './Styles/about.module.css';
import OurMission from './Components/OurMission';
import AboutUs from './Components/AboutUs';
import WhyJobify from './Components/WhyJobify';
import OurTeam from './Components/OurTeam';
import ContactUs from './Components/ContactUs';
import Footer from '../../Component/Footer';

const About = () => {
	return (
		<div className={`${style.aboutContainer}`}>
			<h2 className='heading tx-center'>About <span> Us </span></h2>
			<AboutUs />
			<OurMission />
			<WhyJobify />
			<OurTeam />
			<ContactUs />
			<Footer />
		</div >
	)
}

export default About;