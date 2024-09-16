import { faCircleCheck, faUserGroup, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const JobRow = ({ jobData }) => {
	return (
		<tr>
			<td>
				<h4>Job Title</h4>
				<div>
					<span>Full Time</span>
					<span>12 days ago</span>
				</div>
			</td>
			<td>
				<FontAwesomeIcon icon={faCircleCheck} color='green' />
				{/* <FontAwesomeIcon icon={faCircleXmark} color='red' /> */}
				<span>active</span>
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