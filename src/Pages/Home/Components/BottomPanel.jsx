import BottomPanelCard from './BottomPanelCard';
import candidateImage from '../../../Assest/Images/Candidate.jpg';
import employerImage from '../../../Assest/Images/Employer.jpg';
import style from '../Styles/bottomPanel.module.css';

const BottomPanel = () => {
	return (
		<div className={`container inner-container ${style.bottmPanel} `}>
			<BottomPanelCard type={"candidate"} image={candidateImage}>
				<h2>Became a Candidate</h2>
				<p>Take the first step towards your dream career. Create your profile, explore thousands of job opportunities, and apply with just one click.
				</p>
			</BottomPanelCard>
			<BottomPanelCard type={"employer"} image={employerImage} >
				<h2>Became a Employer</h2>
				<p>Connect with top talent and grow your business. Post job openings, manage applications, and find the perfect candidates for your company.</p>
			</BottomPanelCard >
		</div >
	)
}

export default BottomPanel;