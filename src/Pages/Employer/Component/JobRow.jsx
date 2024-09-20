import { faCircleCheck, faUserGroup, faEllipsisV, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const JobRow = ({ jobInfo: { jobTitle, jobType, expirationDate, postedOn } }) => {
	const isActive = (new Date(expirationDate) > new Date()) ? true : false;
	const posted = Math.floor((new Date() - new Date(postedOn)) / (60 * 60 * 24 * 1000));
	return (
		<tr>
			<td>
				<h4>{jobTitle}</h4>
				<div>
					<span>{jobType}</span>
					<span>{posted} days ago</span>
				</div>
			</td>
			<td>
				{isActive ?
					<>
						<FontAwesomeIcon icon={faCircleCheck} color='green' />
						<span>active</span>
					</> :
					<>
						<FontAwesomeIcon icon={faCircleXmark} color='red' />
						<span>expire</span>
					</>
				}
			</td>
			<td>
				<FontAwesomeIcon icon={faUserGroup} />
				130 Application</td>
			<td>
				<button>View Application</button>
				<button><FontAwesomeIcon icon={faEllipsisV} /></button>
			</td>
		</tr>
	)
}

export default JobRow