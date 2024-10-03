import { FaSchool, FaSuitcase } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import style from '../style/jobApplication.module.css';
import avatar from '../../../Assest/Images/profileAvatar.png';
const JobApplicationRow = ({ applicationInfo, setOpen, setApplicationsId }) => {

	function viewApplicantDetails() {
		setOpen(true);
		setApplicationsId(applicationInfo.applicationId)
	}
	return (
		<div className={style.jobApplicationRow}>
			<div>
				<div>
					<img src={applicationInfo.candidateImage || avatar} alt={applicationInfo.candidateFirstName} />
				</div>
				<div className={style.candidateDetail}>
					<div>
						<h3>{applicationInfo.candidateFirstName} {applicationInfo.candidateLastName}</h3>
						<div>
							<FaSuitcase />
							<span>{applicationInfo.experience} years</span>
						</div>
					</div>
					<div className={style.iconBox}>
						<div>
							<FaSchool />
							<span>{applicationInfo.course}, {applicationInfo.collegeName}</span>
						</div>
						<div>
							<FaLocationDot />
							<span>{applicationInfo.city}, {applicationInfo.state}</span>
						</div>
					</div>
				</div>
			</div>
			<Button handler={viewApplicantDetails}>View Details</Button>
		</div>
	)
}

export default JobApplicationRow;