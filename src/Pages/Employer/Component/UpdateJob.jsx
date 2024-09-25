import React from 'react';
import AddJob from './AddJob';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../../../Component/Error';

const UpdateJob = () => {
	const navigate = useNavigate();
	const { jobId } = useParams();
	let jobInfo = {};
	if (jobId.startsWith("JOB")) {
		const allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
		if (allJobs.length > 0) {
			jobInfo = allJobs.find(job => job.jobId === jobId);
			if (!jobInfo) {
				navigate('*', { replace: true });
			}
		}
	}
	else {
		navigate('*', { replace: true })
	}
	return <AddJob type='update' jobInfo={jobInfo} />

}

export default UpdateJob;