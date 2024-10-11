import style from '../Style/CompanyDetails.module.css';
import { IoMailOutline } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa';
import { FaEarthAsia, FaLocationDot } from 'react-icons/fa6';
const CompanyDetail = ({ companyInfo: { employerInfo = {} } }) => {
	return (
		<div className={style.companyDetail}>
			<h3>About Company</h3>
			<p>{employerInfo.aboutCompany || 'NA'}</p>
			<h3>Contact Information</h3>
			<div>
				<div>
					<IoMailOutline />
					<div>
						<span>Email Address</span>
						<p>{employerInfo.companyEmail || "NA"}</p>
					</div>
				</div>
				<div>
					<FaPhone />
					<div>
						<span>Phone</span>
						<p>{employerInfo.companyPhone || "NA"}</p>
					</div>
				</div>
				<div>
					<FaEarthAsia />
					<div>
						<span>Website</span>
						<p>{employerInfo.companyWebsite || "NA"}</p>
					</div>
				</div>
				<div>
					<FaLocationDot />
					<div>
						<span>Location</span>
						<p>{employerInfo.companyLocation || "NA"}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompanyDetail