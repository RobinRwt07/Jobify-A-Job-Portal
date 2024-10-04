import style from '../Styles/CandidateProfile.module.css';
import { useCandidateInfo } from '../useCandidateInfo';

const Profile = () => {
	const candidateInfo = useCandidateInfo();
	return (
		<div className={style.profile}>
			<div>
				box1
			</div>
			<div>
				box2
			</div>
		</div>
	)
}

export default Profile;