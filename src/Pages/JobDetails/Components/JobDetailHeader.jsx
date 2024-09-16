import { faIndianRupee, faLocation, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../Style/jobdetail.module.css';
import { toast } from "react-toastify";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";


const JobDetailsHeader = ({ jobInfo: { jobTitle, comapnyName, reqExp, salary = "Not Disclosed", location, opening, postingDate = "NA" } }) => {
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
			{console.log(candidateAuthed)}
			<h3>{jobTitle}</h3>
			<p>{comapnyName}</p>
			<div>
				<div>
					<FontAwesomeIcon icon={faBriefcase} />
					{reqExp} years
				</div>
				<div>
					<FontAwesomeIcon icon={faIndianRupee} />
					{salary}
				</div>
			</div>
			<div>
				<FontAwesomeIcon icon={faLocation} />
				{location}
			</div>
			<div>
				<div>
					<p>Posted: <span>{postingDate}</span></p>
					<p>Opening: <span>{opening}</span></p>
				</div>
				<Button type="btn btn-primary" handler={handleClick}>
					Apply
				</Button>
			</div>
		</div>
	)
}
export default JobDetailsHeader;