import BottomPanelCard from './BottomPanelCard';
import candidateImage from '../../../Assest/Images/Candidate.jpg';
import employerImage from '../../../Assest/Images/Employer.jpg';
import style from '../Styles/bottomPanel.module.css';

const BottomPanel = () => {
	return (
		<div className={`container inner-container ${style.bottmPanel} `}>
			<BottomPanelCard type={"candidate"} image={candidateImage}>
				<h2>Became a Candidate</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.
				</p>
			</BottomPanelCard>
			<BottomPanelCard type={"employer"} image={employerImage} >
				<h2>Became a Employer</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.</p>
			</BottomPanelCard >
		</div >
	)
}

export default BottomPanel;