import React, { useState } from 'react';
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
	const [activeTab, setActiveTab] = useState('AboutCandidate');
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
				<div onClick={() => setActiveTab('AboutCandidate')} className={activeTab === 'AboutCandidate' && 'activeEmployerTab'}>About</div>
				<div onClick={() => setActiveTab('UpdateProfile')} className={activeTab === 'UpdateProfile' && 'activeEmployerTab'}>Update Profile</div>
				<div onClick={() => setActiveTab('CandidateAccount')} className={activeTab === 'CandidateAccount' && 'activeEmployerTab'}>Account Setting</div>
			</div>
			{
				(activeTab === 'AboutCandidate') ? <Profile candidateInfo={candidateInfo} /> :
					(activeTab === 'CandidateAccount') ? <CandidateAccount candidateInfo={candidateInfo} /> :
						(activeTab === 'UpdateProfile') ? <UpdateCandidateProfile candidateInfo={candidateInfo} /> : <></>
			}
		</section>
	)
}

export default CandidateProfile