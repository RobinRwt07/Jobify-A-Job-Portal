import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Component/Button';
import style from '../style/recentActivity.module.css';
import { faArrowRight, faCircleCheck, faCircleXmark, faEllipsisV, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import JobRow from './JobRow';

const RecentActivity = ({ employerId }) => {
	return (
		<div className={style.recentActivity}>
			<div>
				<h3>Recently Posted Jobs</h3>
				<Button type='btn btn-tertiary'>View all
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th>Jobs</th>
							<th>Status</th>
							<th>Application</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<JobRow />
						<JobRow />
						<JobRow />
						<JobRow />
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RecentActivity