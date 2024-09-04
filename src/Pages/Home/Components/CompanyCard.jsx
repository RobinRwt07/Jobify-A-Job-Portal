import Button from "../../../Component/Button";
import CompanyLogo from '../../../Assest/Images/landingImage.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Styles/CompanyCard.module.css';

const CompanyCard = ({ companyData: { companyName, location, totalOpening } }) => {
	return (
		<div className={style.companyCard}>
			<div>
				<div>
					<img src={CompanyLogo} alt="company logo" />
				</div>
				<div>
					<h4>{companyName}</h4>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{location}</span>
					</div>
				</div>
			</div>
			<Button type='btn-primary'>	Open Position ({totalOpening})</Button>
		</ div >
	)
}

export default CompanyCard;