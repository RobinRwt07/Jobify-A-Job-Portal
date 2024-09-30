import React from 'react'

const JobRow = ({ jobInfo = {} }) => {
	return (
		<tr>
			<td>
				<h4>{jobInfo?.jobTitle}</h4>
				<div>
					<span>{jobInfo?.jobType}</span>
					<span>{jobInfo?.jobLocation} days ago</span>
				</div>
			</td>
			<td>
				<FontAwesomeIcon icon={faCircleCheck} color='green' />
				<span>active</span>
				{/* <>
						<FontAwesomeIcon icon={faCircleXmark} color='red' />
						<span>expire</span>
					</>  */}
			</td>
			<td>
				23 sep 2024
			</td>
			<td>
				<button className={` ${style.view} "btn" `} title='View Details' onClick={handleView}>View Details</button>
			</td>
		</tr >
	)
}

export default JobRow