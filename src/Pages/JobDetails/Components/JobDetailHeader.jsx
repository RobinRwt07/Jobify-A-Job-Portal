
import style from '../Style/JobDetailHeader.module.css';
import { toast } from "react-toastify";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";
import { FaCalendarAlt, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdWork } from "react-icons/md";


const JobDetailsHeader = ({ jobInfo: { jobTitle, companyImage, companyName, experience, salary = "Not Disclosed", jobLocation, vacancies, postedOn = "NA", workMode } }) => {
	const { candidateAuthed, setCandidateAuth } = useCandidateAuth();

	function handleClick() {
		if (!candidateAuthed) {
			toast.error("Please Login.");
		}
		else {
			console.log('login');
			// if user logged in
		}
	}
	return (
		<div className={style.JobDetailsHeader}>
			<div>
				<div>
					<img src={companyImage} alt="Company Logo" />
				</div>
				<div>
					<h3>{jobTitle}</h3>
					<p>At {companyName}</p>
				</div>
			</div>
			<div>
				<div>
					<FaMoneyBillWave />
					<span>Salary</span>
					<p>{salary}</p>
				</div>
				<div>
					<FaLocationDot />
					<span>Job Location</span>
					<p>{jobLocation}</p>
				</div>
				<div>
					<FaCalendarAlt />
					<span>Posted On</span>
					<p>{postedOn}</p>
				</div>
				<div>
					<FaWallet />
					<span>Experience</span>
					<p>{experience} Years</p>
				</div>
				<div>
					<MdWork />
					<span>WorkMode</span>
					<p>{workMode}</p>
				</div>
			</div>
			<Button type="btn btn-primary" handler={handleClick}>
				Apply
			</Button>
		</div>
	)
}
export default JobDetailsHeader;