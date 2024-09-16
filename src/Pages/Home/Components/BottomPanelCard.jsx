import Button from "../../../Component/Button";
import style from '../Styles/bottomPanel.module.css';
import { useNavigate } from "react-router-dom";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";

const BottomPanelCard = ({ heading, image, children, type }) => {
	const navigate = useNavigate();
	const { candidateAuthed, setCandidateAuth } = useCandidateAuth();
	function handleClick() {
		if (type == 'candidate') {
			if (candidateAuthed) {
				return;
			}
			navigate('/signup/candidate');
		}
		if (type == 'employer') {
			navigate('/signup/employer');
		}
	}
	return (
		<div className={style.bottomPanelCard} style={{ backgroundImage: `url(${image})` }}>
			{children}
			<Button type="btn-secondary" handler={handleClick}>
				Register
			</Button>
		</div>
	)
}

export default BottomPanelCard;