import Button from "../../../Component/Button";
import style from '../Styles/bottomPanel.module.css';
import { useNavigate } from "react-router-dom";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";

const BottomPanelCard = ({ image, children, type }) => {
	const { candidateAuthed } = useCandidateAuth();
	const navigate = useNavigate();
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