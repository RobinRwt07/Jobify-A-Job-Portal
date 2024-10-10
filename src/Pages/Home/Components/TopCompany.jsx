import style from '../Styles/FeaturedJob.module.css';
import CompanyCard from './CompanyCard';
import Message from '../../../Component/Message';
import companyLogo from '../../../Assest/Images/landingImage.png';

const TopCompany = () => {
	const allCompanies = JSON.parse(localStorage.getItem('registeredOrg')) || [];
	if (allCompanies.length === 0) {
		return <Message>No Companies </Message>;
	}
	const allCompaniesDetails = JSON.parse(localStorage.getItem('employersDetails')) || [];
	const allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
	return (
		<div className="container">
			<h2 className='heading'>Top <span>Companies</span> </h2>
			<div className={`${style['featured-job-box']} inner-container`}>
				{allCompanies.map(company => {
					const matchedCompany = allCompaniesDetails.find(org => org.companyId === company.companyId);
					const totalOpening = allJobs.filter(job => job.companyId === company.companyId).length;
					return <CompanyCard key={company.companyId} companyData={company} companyImage={matchedCompany?.companyImage || companyLogo} totalOpening={totalOpening} />
				})}
			</div>
		</div >
	)
}

export default TopCompany;

