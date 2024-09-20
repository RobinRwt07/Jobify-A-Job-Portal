import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Component/Button';
import style from '../style/recentActivity.module.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import JobRow from './JobRow';
import Message from '../../../Component/Message';
import { useNavigate } from 'react-router-dom';

const RecentActivity = ({ recentJobs }) => {
	const navigate = useNavigate();
	return (
		<div className={style.joblist}>
			<div>
				<h3>Recently Posted Jobs</h3>
				<Button type='btn btn-tertiary' handler={() => navigate('/employer/my_jobs')}>View all
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
			<div className={style.jobsTable}>
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
						{
							recentJobs.length === 0 ?
								<tr>
									<td style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }} colSpan={4}>
										You have not posted any job
									</td>
								</tr> :
								recentJobs.map(job => (
									<JobRow jobInfo={job} key={job.jobId} />
								))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RecentActivity