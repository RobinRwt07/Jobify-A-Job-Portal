import Button from "../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Styles/CompanyCard.module.css';

const CompanyCard = ({ companyData: { companyName, companyLocation }, companyImage }) => {
	return (
		<div className={style.companyCard}>
			<div>
				<div>
					<img src={companyImage} alt="company logo" />
				</div>
				<div>
					<h4>{companyName}</h4>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{companyLocation}</span>
					</div>
				</div>
			</div>
			<Button type='btn-primary'>	Open Position </Button>
		</ div >
	)
}

export default CompanyCard;