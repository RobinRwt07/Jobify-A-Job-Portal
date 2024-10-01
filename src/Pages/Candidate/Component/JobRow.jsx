import { faCircleCheck, faCirclePause, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const JobRow = ({ jobInfo = {} }) => {
	const navigate = useNavigate();
	const style = {
		backgroundColor: "#1452ff33",
		color: "var(--primary)"
	}
	const allJobs = JSON.parse(localStorage.getItem("allJobs"));
	const jobDetails = allJobs.find(job => job.jobId === jobInfo.jobId);

	function handleView() {
		navigate('/jobdetail/' + jobInfo.jobId);
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
				{/* <>
						<FontAwesomeIcon icon={faCircleXmark} color='red' />
						<span>Rejected</span>
					</>  */}
			</td>
			<td>
				{new Date(jobInfo.dateApplied).toDateString() || "NA"}
			</td>
			<td>
				<button style={style} className={'btn'} title='View Details' onClick={handleView}>View Details</button>
			</td>
		</tr >
	)
}

export default JobRow