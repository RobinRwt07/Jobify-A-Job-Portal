import { FaSchool, FaSuitcase } from "react-icons/fa"
import { FaCircleCheck, FaCirclePause, FaCircleXmark, FaLocationDot } from "react-icons/fa6"
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
							<span>{applicationInfo.city}</span>
						</div>
					</div>
				</div>
			</div>
			{
				applicationInfo.status === "rejected" ?
					<div style={{ color: "red" }}>
						<FaCircleXmark />
						<span>{"Rejected"}</span>
					</div> :
					applicationInfo.status === 'pending' ?
						<div style={{ color: "blue" }}>
							<FaCirclePause />
							<span>{"Pending"}</span>
						</div> :
						<div style={{ color: "green" }}>
							<FaCircleCheck />
							<span>{"Accepted"}</span>
						</div>
			}
			<Button handler={viewApplicantDetails} disabled={applicationInfo.status === 'rejected'}>View Details</Button>
		</div>
	)
}

export default JobApplicationRow;