import Button from "../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Styles/CompanyCard.module.css';
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ companyData: { companyName, companyId, companyLocation }, companyImage, totalOpening }) => {
	const navigate = useNavigate();
	return (
		<div className={style.companyCard}>
			<div>
				<div>
					<img src={companyImage} alt="company logo" />
				</div>
				<div>
					<h3>{companyName}</h3>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{companyLocation}</span>
					</div>
				</div>
			</div>
			<Button type='btn-primary' disabled={totalOpening === 0} handler={() => { navigate(`/jobs?companyId=${companyId}`) }}>Open Position ({totalOpening}) </Button>
		</ div >
	)
}

export default CompanyCard;