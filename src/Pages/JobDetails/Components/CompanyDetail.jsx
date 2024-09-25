import style from '../Style/jobdetail.module.css';
const CompanyDetail = ({ companyInfo }) => {
	return (
		<div className={style.companyDetail}>
			<h3>About Company</h3>
			<p>{companyInfo.aboutCompany || 'NA'}</p>
			<div>
				<h4>Email: <span>{companyInfo.companyEmail || "NA"}</span></h4>
				<h4>Phone: <span>{companyInfo.companyPhone || "NA"}</span></h4>
			</div>
			<div>
				<h4>Location: <span>{companyInfo.companyLocation || "NA"}</span></h4>
				<h4>Website: <span>{companyInfo.companyWebsite || "NA"}</span></h4>
			</div>
		</div>
	)
}

export default CompanyDetail