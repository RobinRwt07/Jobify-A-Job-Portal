import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from '../Styles/FeaturedJob.module.css';
import JobCard from '../../../Component/JobCard';
import { jobs } from '../../../../Public/DummyData/Jobs';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FeaturedJob = () => {
	return (
		<div className="container">
			<div className={style["featured-header"]}>
				<h2 className='heading'>Latest <span>Job</span> </h2>
				<div>
					<Button type="btn-tertiary"> View All</Button>
					<FontAwesomeIcon icon={faArrowRight} color={"#4640DE"} />
				</div>
			</div>
			<div className={`${style['featured-job-box']} inner-container `}>
				{jobs.map(job => <JobCard key={job.jobId} jobData={job} />)}
			</div>
		</div>
	)
}

export default FeaturedJob;