import style from '../Styles/ourteam.module.css';
import teamMember from '../../../Assest/Images/profileAvatar.png';
const OurTeam = () => {
	return (
		<div className={`container `}>
			<h2 className='heading tx-center'>Meet Our <span>Team</span> </h2>
			<p className='block-sub-heading'>The Amazing People Behind Jobify</p>
			<div className={style.ourTeam}>
				<div>
					<div>
						<img src={teamMember} alt="team Member" />
					</div>
					<div>
						<h4>Robin Rawat</h4>
						<span>Frontend Developer</span>
					</div>
				</div>
				<div>
					<div>
						<img src={teamMember} alt="team Member" />
					</div>
					<div>
						<h4>Robin Rawat</h4>
						<span>Frontend Developer</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OurTeam