import style from '../Styles/FeaturedJob.module.css';
import { jobs } from '../../../../Public/DummyData/Jobs';
import CompanyCard from './CompanyCard';

const TopCompany = () => {
	return (
		<div className="container">
			<h2 className='heading'>Top <span>Companies</span> </h2>
			<div className={`${style['featured-job-box']} inner-container`}>
				{jobs.map(company => <CompanyCard key={company.jobId} companyData={company} />)}
			</div>
		</div >
	)
}

export default TopCompany;

