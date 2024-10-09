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
	return (
		<div className="container">
			<h2 className='heading'>Top <span>Companies</span> </h2>
			<div className={`${style['featured-job-box']} inner-container`}>
				{allCompanies.map(company => {
					const matchedCompany = allCompaniesDetails.find(org => org.companyId === company.companyId)
					console.log(matchedCompany)
					return <CompanyCard key={company.companyId} companyData={company} companyImage={matchedCompany?.companyImage || companyLogo} />
				})}
			</div>
		</div >
	)
}

export default TopCompany;

