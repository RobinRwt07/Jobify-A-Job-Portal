import React, { useState } from 'react';
import style from '../../../Styles/form.module.css'
import { MyTextInput, MySelect } from '../../../Component/FormComponent';
import { Formik, Form } from 'formik';
import addFormSchema from '../addJobFormSchema';
import MyEditor from './MyEditor';
import { useEmployerInfo } from '../useEmployerInfo';
import { generateRandom } from '../../../../Public/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddJob = ({ type = "add", jobInfo = {} }) => {
	const navigate = useNavigate();

	const [jobDescription, setjobDescription] = useState(jobInfo.jobDescription || '');
	const [error, setError] = useState({});
	const { companyInfo } = useEmployerInfo();

	const initialValues = {
		jobTitle: jobInfo.jobTitle || "",
		jobType: jobInfo.jobType || "",
		workMode: jobInfo.workMode || "",
		minSalary: jobInfo.minSalary || "",
		maxSalary: jobInfo.maxSalary || "",
		minExperience: jobInfo.minExperience || 0,
		maxExperience: jobInfo.maxExperience || 0,
		vacancies: jobInfo.vacancies || 1,
		expirationDate: jobInfo.expirationDate || "",
		education: jobInfo.education || "",
		jobTags: jobInfo.jobTags || "",
		jobLocation: jobInfo.jobLocation || "",
		skills: jobInfo.skills || ""
	}
	function addNewJob(jobData) {
		jobData.jobId = jobInfo.jobId || "JOB" + generateRandom(100000, 999999);
		jobData.postedOn = new Date();
		jobData.companyId = companyInfo.companyId;
		jobData.companyName = companyInfo.companyName;
		jobData.jobDescription = jobDescription;
		const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
		if (type == 'update') {
			const oldIndex = allJobs.findIndex(job => job.jobId == jobInfo.jobId);
			if (oldIndex !== -1) {
				allJobs.splice(oldIndex, 1);
			}
		}

		allJobs.unshift(jobData);
		localStorage.setItem("allJobs", JSON.stringify(allJobs));
		toast.success("Successfully " + type);
	}

	return (
		<section className={style.formSection}>
			{type == "add" ?
				<h2>Post A Job</h2> :
				<h2>Update Job</h2>
			}
			<Formik
				initialValues={initialValues}
				validationSchema={addFormSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!jobDescription.trim()) {
						setError({ jobDescription: "Job Description is required" })
						return false;
					}
					setTimeout(() => {
						addNewJob(values);
						setSubmitting(false);
						navigate('/employer/my_jobs', { replace: true });
					}, 1500);
				}}>
				{
					({ isSubmitting }) => (
						<Form>
							<div className={style.inputBox}>
								<MyTextInput type="text" label="Job Title" name="jobTitle" placeholder="Add Job Title" />
								<MyTextInput type="text" label="Tags" name="jobTags" placeholder="Job Keyword" />
							</div>
							<div className={style.inputBox}>
								<MySelect label="Job Type" name="jobType">
									<option value="">Select</option>
									<option value={"Full Time"}>Full Time</option>
									<option value={"Part Time"}>Part Time</option>
									<option value={"Internship"}>Internship</option>
								</MySelect>
								<MySelect label="Work Mode" name="workMode">
									<option value="">Select</option>
									<option value={"Onsite"}>Onsite</option>
									<option value={"Remote"}>Remote</option>
									<option value={"Hybrid"}>Hybrid</option>
								</MySelect>
							</div>
							<h3>Salary</h3>
							<div className={style.inputBox}>
								<MyTextInput type="number" label="Minimum Salary" name="minSalary" placeholder="Minimum salary (LPA)" />

								<MyTextInput type="number" label="Maximum Salary" name="maxSalary" placeholder="Maximum salary (LPA)" />
							</div>
							<h3>Advance Information</h3>
							<div className={style.inputBox}>
								<MyTextInput label="Education" name="education" placeholder="Education Details" />
								<MyTextInput label="Skills" name="skills" placeholder="Skills eg. Frontend, React, Nodejs ..." />
							</div>
							<div className={style.inputBox}>
								<MyTextInput type="text" label="Job Location" name="jobLocation" placeholder="Job Location" />

								<MyTextInput type="number" label="Vacancies" name="vacancies" placeholder="Total vacancies" />
							</div>
							<div className={style.inputBox}>
								<MyTextInput type="number" label="Minimum Experience" name="minExperience" placeholder="Minimum Exp " />

								<MyTextInput type="number" label="Maximum Experience" name="maxExperience" placeholder="Maximum Exp" />

								<MyTextInput type="date" label="Expiration Date" name="expirationDate" placeholder="Expiration Date " />
							</div>
							<div>
								<label htmlFor="jobDescription">Job Description</label>
								<MyEditor jobDescription={jobDescription} setJobDescription={setjobDescription} />
								{error.jobDescription ? <div className={style.error}>{error.jobDescription}</div> : null}
							</div>
							<button type='submit' className="btn btn-primary" disabled={isSubmitting}>
								{type === "add" ? "Add Job" : "Update Job"}
							</button>
						</Form>
					)
				}
			</Formik>
		</section >
	)
}

export default AddJob