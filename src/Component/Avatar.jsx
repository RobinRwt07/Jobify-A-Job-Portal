import React from 'react';
import avatar from '../Assest/Images/profileAvatar.png';
import style from '../Styles/global.module.css';

const Avatar = ({ profileSrc = avatar }) => {
	return (
		<div className={style.profileAvatar}>
			<img src={profileSrc} alt="profile picture" />
		</div>
	)
}

export default Avatar;