import React, { useEffect, useState } from 'react';
import image from '../../../Assest/Images/bgImageLogin.jpg';
import { useCandidateInfo } from '../useCandidateInfo';
import { FaLocationDot } from 'react-icons/fa6';
import avatar from '../../../Assest/Images/profileAvatar.png';
import style from '../Styles/CandidateProfile.module.css';
import Profile from './Profile';
import CandidateAccount from './CandidateAccount';
import UpdateCandidateProfile from './UpdateCandidateProfile';
import ProfileEditAlert from './ProfileEditAlert';
const CandidateProfile = () => {
	const [activeTab, setActiveTab] = useState('aboutCandidate');
	const candidateInfo = useCandidateInfo();

	let candidateDetails = {};

	const allCandidatesDetails = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
	const candidate = allCandidatesDetails.find(candidate => candidate.candidateId === candidateInfo.candidateId);
	if (candidate) {
		candidateDetails = { ...candidate?.candidateData || {} }
	}
	return (
		<section className={style.candidateContainer}>
			<div className={style.profileHeader}>
				<img src={image} alt='profile' />
				<div className={style.candidateProfile}>
					<div>
						<img src={avatar} alt="Candidate Profile" />
					</div>
					<div>
						<h3>{candidateInfo.candidateFirstName} {candidateInfo.candidateLastName || ''}</h3>
						<div>
							<FaLocationDot />
							<span>{candidateDetails.city || 'NA'}, {candidateDetails.state || ''}</span>
						</div>
					</div>
				</div>
			</div>

			{
				Object.keys(candidateDetails).length === 0 && <ProfileEditAlert setActiveTab={setActiveTab} />
			}
			<div className={style.pageTabs}>
				<div onClick={() => setActiveTab('aboutCandidate')} className={activeTab === 'aboutCandidate' && 'activeEmployerTab'}>About</div>
				<div onClick={() => setActiveTab('updateprofile')} className={activeTab === 'updateprofile' && 'activeEmployerTab'}>Update Profile</div>
				<div onClick={() => setActiveTab('candidateAccount')} className={activeTab === 'candidateAccount' && 'activeEmployerTab'}>Account Setting</div>
			</div>
			{
				(activeTab === 'aboutCandidate') ? <Profile candidateInfo={candidateInfo} /> :
					(activeTab === 'candidateAccount') ? <CandidateAccount candidateInfo={candidateInfo} /> :
						(activeTab === 'updateprofile') ? <UpdateCandidateProfile candidateInfo={candidateInfo} /> : <></>
			}
		</section>
	)
}

export default CandidateProfile