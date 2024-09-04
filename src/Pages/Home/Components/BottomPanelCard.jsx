import Button from "../../../Component/Button";
import style from '../Styles/bottomPanel.module.css';
import { useNavigate } from "react-router-dom";

const BottomPanelCard = ({ heading, image, children, type }) => {
	const navigate = useNavigate();
	function handleClick() {
		navigate('/signup/' + type);
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