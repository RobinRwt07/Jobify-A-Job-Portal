import { faCircleCheck, faUserGroup, faCircleXmark, faEye, faTrash, faEdit, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../style/recentActivity.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobRow = ({ jobInfo }) => {
	const navigate = useNavigate();

	const isActive = (new Date(jobInfo.expirationDate) > new Date()) ? true : false;
	const posted = Math.floor((new Date() - new Date(jobInfo.postedOn)) / (60 * 60 * 24 * 1000));

	function handleView() {
		console.log("view");
	}

	function handleDelete(jobId, companyId) {
		const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
		if (allJobs.length > 0) {
			const deleteIndex = allJobs.findIndex(job => job.jobId === jobId && job.companyId === companyId);
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

	function handleEdit(jobId) {
		navigate('/employer/update_job/' + jobId);
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
				130 Application</td>
			<td>
				<button className={style.view} title='View Application' onClick={handleView}> <FontAwesomeIcon icon={faEye} /> </button>

				<button className={style.edit} title="Edit Job" onClick={() => handleEdit(jobInfo.jobId)}><FontAwesomeIcon icon={faEdit} /></button>

				<button className={style.delete} title="Delete Job" onClick={() => handleDelete(jobInfo.jobId, jobInfo.companyId)}><FontAwesomeIcon icon={faTrash} /></button>
			</td>
		</tr>
	)
}

export default JobRow