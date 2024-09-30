import React from 'react'
import { useCandidateInfo } from '../useCandidateInfo';

const Profile = () => {
	const candidateInfo = useCandidateInfo();
	return (
		<div>
			Profile
			{console.log(candidateInfo)}
		</div>
	)
}

export default Profile;