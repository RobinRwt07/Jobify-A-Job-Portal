import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Component/Button';
import style from '../Styles/RecentAppliedJobs.module.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import JobRow from './JobRow';
import { useNavigate } from 'react-router-dom';

const RecentAppliedJobs = ({ recentAppliedJobs = [] }) => {

	const navigate = useNavigate();
	return (
		<div className={style.joblist}>
			<div>
				<h3>Recently Applied Jobs</h3>
				<Button type='btn btn-tertiary' handler={() => navigate('/candidate/applied_jobs')}>View all
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
			<div className={style.jobsTable}>
				<table>
					<thead>
						<tr>
							<th>Jobs</th>
							<th>Status</th>
							<th>Date Applied</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							recentAppliedJobs.length == 0 ?
								<tr>
									<td style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }} colSpan={4}>
										You have not Applied for any job
									</td>
								</tr> :
								recentAppliedJobs.map(job => (
									<JobRow jobInfo={job} key={job.applicationId} />
								))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RecentAppliedJobs;