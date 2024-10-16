import style from '../../../Styles/dashboard.module.css';


const AdminOverview = () => {
	const allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
	const allApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
	const totalEmployer = JSON.parse(localStorage.getItem('registeredOrg')) || [];
	const totalCandidates = JSON.parse(localStorage.getItem('registeredCandidate')) || [];

	return (
		<div className={style.overview}>
			<div>
				<h2>Hello, Robin</h2>
			</div >
			<div className='card'>
				<div>
					<span>{allJobs.length}</span><br />
					Jobs Posted
				</div>
				<div style={{ backgroundColor: '#fafad2' }}>
					<span>{totalEmployer.length}</span><br />
					Employers
				</div>
				<div >
					<span>{totalCandidates.length}</span><br />
					Candidates
				</div>
			</div>
		</div>
	)
}

export default AdminOverview;