import style from '../Style/CompanyDetails.module.css';
import { IoMailOutline } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa';
import { FaEarthAsia, FaLocationDot } from 'react-icons/fa6';
const CompanyDetail = ({ companyInfo }) => {
	return (
		<div className={style.companyDetail}>
			<h3>About Company</h3>
			<p>{companyInfo.aboutCompany || 'NA'}</p>
			<h3>Contact Information</h3>
			<div>
				<div>
					<IoMailOutline />
					<div>
						<span>Email Address</span>
						<p>{companyInfo.companyEmail || "NA"}</p>
					</div>
				</div>
				<div>
					<FaPhone />
					<div>
						<span>Phone</span>
						<p>{companyInfo.companyPhone || "NA"}</p>
					</div>
				</div>
				<div>
					<FaEarthAsia />
					<div>
						<span>Website</span>
						<p>{companyInfo.companyWebsite || "NA"}</p>
					</div>
				</div>
				<div>
					<FaLocationDot />
					<div>
						<span>Location</span>
						<p>{companyInfo.companyLocation || "NA"}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompanyDetail