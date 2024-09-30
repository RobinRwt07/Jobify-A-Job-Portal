import style from '../../../Styles/dashboard.module.css';
import { useCandidateInfo } from '../useCandidateInfo';
import RecentAppliedJobs from './RecentAppliedJobs';


const CandidateOverview = () => {
	const candidateInfo = useCandidateInfo();
	return (
		<div className={style.overview}>
			<div>
				<h2>Hello, {candidateInfo.candidateFirstName} {candidateInfo.candidateLastName}</h2>
			</div>
			<div className='card'>
				<div>
					<span>{32}</span><br />
					Applied Jobs
				</div>
				<div style={{ backgroundColor: '#fafad2' }}>
					<span>{23}</span><br />
					Saved Jobs
				</div>
			</div>
			<RecentAppliedJobs recentJobs={[]} />
		</div>
	)
}

export default CandidateOverview