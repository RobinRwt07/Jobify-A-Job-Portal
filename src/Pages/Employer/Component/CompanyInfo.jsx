import style from '../style/companyProfile.module.css';
import { IoMailOutline } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa';
import { FaEarthAsia, FaLocationDot } from 'react-icons/fa6';

const CompanyInfo = ({ employerDetails = {} }) => {
	return (
		<div className={style.companyInfo}>
			<div>
				<h3>About Company</h3>
				<p>{employerDetails.aboutCompany || "NA"}</p>
			</div>
			<div>
				<div>
					<IoMailOutline />
					<div>
						<span>Email Address</span>
						<p>{employerDetails.companyEmail || "NA"}</p>
					</div>
				</div>
				<div>
					<FaPhone />
					<div>
						<span>Phone</span>
						<p>{employerDetails.companyPhone || "NA"}</p>
					</div>
				</div>
				<div>
					<FaEarthAsia />
					<div>
						<span>Website</span>
						<p>{employerDetails.companyWebsite || "NA"}</p>
					</div>
				</div>
				<div>
					<FaLocationDot />
					<div>
						<span>Location</span>
						<p>{employerDetails.companyLocation || "NA"}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompanyInfo;