import { FaBook, FaCakeCandles, FaLocationDot, FaMessage, FaPhone } from 'react-icons/fa6';
import style from '../Styles/CandidateProfile.module.css';

const Profile = ({ candidateInfo }) => {
	let candidateDetails = {};
	const allCandidateDetails = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
	const candidate = allCandidateDetails.find(candidate => candidate.candidateId === candidateInfo.candidateId);
	if (candidate) {
		candidateDetails = { ...candidate.candidateData };
	}

	return (
		<div className={style.profile}>
			<div>
				<div className={style.contentbox}>
					<h3>About Me</h3>
					<p>{candidateDetails.coverLetter || 'NA'}</p>
				</div>

				<div className={style.contentbox}>
					<h3>Education Details</h3>
					<div>
						<div>
							<FaBook />
						</div>
						<div>
							<h4>{candidateDetails.course || 'NA'}</h4>
							<h4>{candidateDetails.graduationYear || 'NA'}</h4>
							<span>{candidateDetails.collegeName || 'NA'}</span>
						</div>
					</div>
				</div>
			</div>

			<div >
				<h3 style={{ marginBlockEnd: "var(--p-lg)" }}>Other Information</h3>
				<div className={style.candidateInfo}>
					<div>
						<FaLocationDot />
						<span>Location</span>
						<p>{candidateDetails.city || 'NA'}</p>
					</div>
					<div>
						<FaMessage />
						<span>Email</span>
						<p>{candidateInfo.candidateEmail || 'NA'}</p>
					</div>
					<div>
						<FaCakeCandles />
						<span>Date of Birth</span>
						<p>{candidateDetails.dateOfBirth || 'NA'}</p>
					</div>
					<div>
						<FaPhone />
						<span>Phone</span>
						<p>{candidateDetails.candidatePhone || 'NA'}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;