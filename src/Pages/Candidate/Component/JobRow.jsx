import { faCircleCheck, faCirclePause, faCircleXmark, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCandidateAuth } from '../../../hooks/useCandidateAuth';
import { toast } from 'react-toastify';

const JobRow = ({ jobInfo = {} }) => {
	const { candidateAuthed } = useCandidateAuth();
	const navigate = useNavigate();
	const style = {
		backgroundColor: "#1452ff33",
		color: "var(--primary)",
		display: 'inline-block',
		marginInlineStart: "var(--m-md)"
	}
	const allJobs = JSON.parse(localStorage.getItem("allJobs"));
	const jobDetails = allJobs.find(job => job.jobId === jobInfo.jobId);

	function handleView() {
		navigate('/jobdetail/' + jobInfo.jobId);
	}

	function handleApplicationDelete() {
		const allApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
		const index = allApplications.findIndex(application => (application.applicationId === jobInfo.applicationId) && (application.candidateId === candidateAuthed));
		if (index !== -1) {
			allApplications.splice(index, 1);
			localStorage.setItem('jobApplications', JSON.stringify(allApplications));
			toast.success("application withdraw");
			location.reload();
		}
	}

	return (
		<tr>
			<td>
				<h4>{jobDetails?.jobTitle}</h4>
				<div>
					<span>{jobDetails?.jobType}</span>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{jobDetails?.jobLocation}</span>
					</div>
				</div>
			</td>
			<td>
				{
					jobInfo.status === 'pending' ?
						<>
							<FontAwesomeIcon icon={faCirclePause} color='blue' />
							<span>Pending</span>
						</>
						: jobInfo.status === 'accepted' ?
							<>
								<FontAwesomeIcon icon={faCircleCheck} color='green' />
								<span>Accepted</span>
							</>
							: jobInfo.status === 'rejected' ?
								<>
									<FontAwesomeIcon icon={faCircleXmark} color='red' />
									<span>Rejected</span>
								</> : <></>
				}

			</td>
			<td>
				{new Date(jobInfo.dateApplied).toDateString() || "NA"}
			</td>
			<td>
				<button style={{ display: 'inline-block' }} className="btn btn-danger" onClick={handleApplicationDelete}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
				<button style={style} className={'btn'} title='View Details' onClick={handleView}>View Details</button>
			</td>
		</tr >
	)
}

export default JobRow;