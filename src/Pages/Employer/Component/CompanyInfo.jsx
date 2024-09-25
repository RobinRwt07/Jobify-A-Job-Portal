import style from '../style/companyProfile.module.css';

const CompanyInfo = ({ companyInfo }) => {
	return (
		<div className={style.companyInfo}>
			<div>
				<h3>About Company</h3>
				<p>{companyInfo.aboutCompany || "NA"}</p>
			</div>
			<div>
				<h4>Email : <span> {companyInfo.companyEmail || "NA"} </span></h4>
				<h4>Phone : <span>{companyInfo.companyPhone || "NA"}</span></h4>
			</div>
			<div>
				<h4>Website : <span>{companyInfo.companyWebsite || "NA"}</span></h4>
				<h4>Organization Type : <span>{companyInfo.companyType || "NA"}</span></h4>
			</div>
			<div>
				<h4>Location: <span> {companyInfo.companyLocation} </span></h4>
			</div>

		</div>
	)
}

export default CompanyInfo;