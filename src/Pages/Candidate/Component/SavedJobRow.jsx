import Button from "../../../Component/Button";
import style from '../Styles/SavedJobs.module.css';
import companyLogo from '../../../Assest/Images/profileAvatar.png';
import Button from '../../../Component/Button';
import { FaCircleXmark, FaIndianRupeeSign, FaLocationDot, FaTrash } from "react-icons/fa6";
import { FaCalendar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SavedJobRow = ({ jobInfo, companyImage, candidateId }) => {
	const navigate = useNavigate();
	const salary = `${(jobInfo.minSalary / 100000).toFixed(1)} - ${(jobInfo.maxSalary / 100000).toFixed(1)}`;

	const isExpire = new Date(jobInfo.expirationDate) < new Date();

	function countRemainingDays() {
		if (!isExpire) {
			return Math.ceil((new Date(jobInfo.expirationDate) - new Date()) / (1000 * 24 * 60 * 60));
		}
	}
	function handleJobApply() {
		navigate('/jobdetail/' + jobInfo.jobId);
	}

	function handleUnsaveClick() {
		const allCandidatesDetails = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
		const index = allCandidatesDetails.findIndex(candidate => candidate.candidateId === candidateId);
		if (index !== -1) {
			const filterSavedJobs = allCandidatesDetails[index].savedJobs.filter(job => job !== jobInfo.jobId);
			allCandidatesDetails[index].savedJobs = [...filterSavedJobs];
			localStorage.setItem('candidatesDetails', JSON.stringify(allCandidatesDetails));
			toast.success("job removed");
			location.reload();
		}
	}

	return (
		<div className={style.savedJobRow}>
			<div>
				<div>
					<img src={companyImage || companyLogo} alt={"Company Name"} />
				</div>
				<div className={style.jobDetails}>
					<div>
						<h4>{jobInfo.jobTitle}</h4>
						<span>{jobInfo.jobType}</span>
					</div>
					<div className={style.iconBox}>
						<div>
							<FaLocationDot />
							<span>{jobInfo.jobLocation}</span>
						</div>
						<div>
							<FaIndianRupeeSign />
							<span>{salary} LPA</span>
						</div>
						{
							isExpire ?
								<div className={style.expire}>
									<FaCircleXmark />
									<span>expire</span>
								</div> :
								<div>
									<FaCalendar />
									<span>{countRemainingDays()} Days Remaining</span>
								</div>
						}
					</div>
				</div>
			</div>

			<Button type="btn-danger" handler={handleUnsaveClick}>
				<FaTrash />
			</Button>
			<Button disabled={isExpire} handler={handleJobApply}>{isExpire ? "Deadline Expire" : "Apply Now"}</Button>
		</div>
	)
}

export default SavedJobRow