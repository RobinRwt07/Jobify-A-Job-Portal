import { IoLocationSharp, IoMailOutline } from "react-icons/io5";
import style from '../Styles/TableRow.module.css';
import avatar from '../../../Assest/Images/profileAvatar.png';

const EmployerRow = ({ employerInfo = {}, companyImage, companyName }) => {

	return (
		<div className={style.tableRow}>
			<div>
				<div>
					<img src={companyImage || avatar} alt='company logo' />
				</div>
				<div className={style.tableCell}>
					<div>
						<h3>{companyName || ''}</h3>
					</div>
					<div className={style.iconBox}>
						<div>
							<IoMailOutline />
							<span>{employerInfo?.companyEmail || ''}</span>
						</div>
						<div>
							<IoLocationSharp />
							<span>{employerInfo?.companyLocation || ''}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmployerRow