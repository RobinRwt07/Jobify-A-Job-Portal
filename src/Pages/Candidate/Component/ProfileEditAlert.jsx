import React from 'react'
const style = {
	padding: "var(--p-xl) var(--p-lg)",
	backgroundColor: "#ff2700",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "var(--gap-md)",
	borderRadius: "var(--br-md)",
	color: 'white',
	flexWrap: "wrap",
	fontSize: "14px",
	marginBlockStart: "4rem"
}

const ProfileEditAlert = ({ setActiveTab }) => {
	return (
		<div style={style}>
			<div>
				<h4>Your Profile is not completed. Please complete Your Profile</h4>
				<p style={{ fontSize: '14px' }}>Complete your profile to easily apply for jobs.</p>
			</div>
			<button style={{ color: "red", backgroundColor: 'white' }} className='btn' onClick={() => setActiveTab("updateprofile")}>Edit Profile</button>
		</div>
	)
}

export default ProfileEditAlert;