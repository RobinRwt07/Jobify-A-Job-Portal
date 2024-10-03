import { faCircleCheck, faUserGroup, faCircleXmark, faEye, faTrash, faEdit, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../style/recentActivity.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobRow = ({ jobInfo }) => {
	const navigate = useNavigate();
	const allJobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
	const totalApplications = allJobApplications.filter(application => application.jobId === jobInfo.jobId).length;
	const isActive = (new Date(jobInfo.expirationDate) > new Date()) ? true : false;
	const posted = Math.floor((new Date() - new Date(jobInfo.postedOn)) / (60 * 60 * 24 * 1000));

	function handleView() {
		navigate('/employer/job_applications/' + jobInfo.jobId);
	}

	function handleDelete() {
		const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
		if (allJobs.length > 0) {
			const deleteIndex = allJobs.findIndex(job => job.jobId === jobInfo.jobId && job.companyId === jobInfo.companyId);
			if (deleteIndex !== -1) {
				allJobs.splice(deleteIndex, 1);
				localStorage.setItem('allJobs', JSON.stringify(allJobs));
				toast.success("successfully deleted");
			}
		}
		else {
			toast.error("Failed to delete or Job not exist");
			return
		}
	}

	function handleEdit() {
		navigate('/employer/update_job/' + jobInfo.jobId);
	}

	return (
		<tr>
			<td>
				<h4>{jobInfo.jobTitle}</h4>
				<div>
					<span>{jobInfo.jobType}</span>
					<span>{posted} days ago</span>
				</div>
			</td>
			<td>
				{isActive ?
					<>
						<FontAwesomeIcon icon={faCircleCheck} color='green' />
						<span>active</span>
					</> :
					<>
						<FontAwesomeIcon icon={faCircleXmark} color='red' />
						<span>expire</span>
					</>
				}
			</td>
			<td>
				<FontAwesomeIcon icon={faUserGroup} />
				{totalApplications} Application</td>
			<td>
				<button className={style.view} title='View Application' onClick={handleView}> <FontAwesomeIcon icon={faEye} /> </button>
				<button className={style.edit} title="Edit Job" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
				<button className={style.delete} title="Delete Job" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
			</td>
		</tr>
	)
}

export default JobRow