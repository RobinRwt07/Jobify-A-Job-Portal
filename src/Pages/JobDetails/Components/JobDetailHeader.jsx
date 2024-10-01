import style from '../Style/JobDetailHeader.module.css';
import style2 from '../../../Styles/form.module.css';
import { toast } from "react-toastify";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";
import { FaBookmark, FaCalendarAlt, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdWork } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import Button from '../../../Component/Button';
import { Form, Formik } from 'formik';
import { MySelect, MyTextArea, MyTextInput } from '../../../Component/FormComponent';
import companyLogo from '../../../Assest/Images/alpha.jpg';
import schema from '../jobFormSchema';
import { statesOfIndia } from '../../../../Public/utils';

const JobDetailsHeader = ({ jobInfo: { jobId, companyId, jobTitle, companyImage, companyName, experience, salary = "Not Disclosed", jobLocation, postedOn = "NA", workMode } }) => {
	const { candidateAuthed, setCandidateAuth } = useCandidateAuth();
	const [candidateInfo, setCandidateInfo] = useState({});
	const [open, setOpen] = useState(false);

	useState(() => {
		if (candidateAuthed) {
			const allCandidates = JSON.parse(localStorage.getItem('registeredCandidate')) || [];
			const candidate = allCandidates.find(candidate => candidate.candidateId === candidateAuthed);
			if (candidate) {
				setCandidateInfo(candidate);
			}
		}
	}, [])

	const initialValues = {
		candidateFirstName: candidateInfo?.candidateFirstName || '',
		candidateLastName: candidateInfo?.candidateLastName || '',
		candidatePhone: candidateInfo?.candidatePhone || '',
		candidateEmail: candidateInfo?.candidateEmail || '',
		dateOfBirth: candidateInfo?.dateOfBirth || '',
		experience: candidateInfo?.experience || '',
		streetAddress: candidateInfo?.streetAddress || '',
		city: candidateInfo?.city || '',
		postalCode: candidateInfo?.postalCode || '',
		state: candidateInfo?.state || '',
		course: candidateInfo?.course || '',
		collegeName: candidateInfo?.collegeName || '',
		graduationYear: candidateInfo?.graduationYear || '',
		coverLetter: ''
	}
	function handleClick() {
		if (!candidateAuthed) {
			toast.error("Please Login.");
		}
		else {
			setOpen(true);
		}
	}

	const handleClose = () => {
		setOpen(false);
	};

	function handleSubmit(values) {
		const jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
		const newJobApplications = {
			...values,
			jobId: jobId,
			dateApplied: new Date(),
			candidateId: candidateInfo.candidateId,
			companyId: companyId,
			status: 'pending',
		}
		jobApplications.push(newJobApplications);
		localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
		handleClose();
		toast.success("SuccessfullApplied");
	}

	function handleSaveClick(jobId) {
		if (candidateAuthed) {
			const allCandidatesDetails = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
			const index = allCandidatesDetails.findIndex(candidate => candidate.candidateId === candidateAuthed);
			if (index !== -1) {
				if (allCandidatesDetails[index].hasOwnProperty("savedJobs")) {
					allCandidatesDetails[index].savedJobs.push(jobId);
				}
				else {
					allCandidatesDetails[index].savedJobs = [jobId];
				}
			}
			else {
				const newCandidate = {
					candidateId: candidateAuthed,
					savedJobs: [jobId]
				}
				allCandidatesDetails.push(newCandidate);
			}
			localStorage.setItem('candidatesDetails', JSON.stringify(allCandidatesDetails));
			toast.success("Job Saved")
		}
		else {
			const savedJobs = JSON.parse(sessionStorage.getItem('savedJobs')) || [];
			savedJobs.push(jobId);
			sessionStorage.setItem('savedJobs', JSON.stringify(savedJobs));
			toast.success("Job Saved")
		}
	}

	return (
		<div className={style.JobDetailsHeader}>
			<div>
				<div>
					<div>
						<img src={companyImage || companyLogo} alt="Company Logo" />
					</div>
					<div>
						<h3>{jobTitle}</h3>
						<p>At {companyName}</p>
					</div>
				</div>
				<div className={style.bookMarkBtn} onClick={() => handleSaveClick(jobId)}>
					<FaBookmark />
				</div>
			</div>
			<div>
				<div>
					<FaMoneyBillWave />
					<span>Salary</span>
					<p>{salary}</p>
				</div>
				<div>
					<FaLocationDot />
					<span>Job Location</span>
					<p>{jobLocation}</p>
				</div>
				<div>
					<FaCalendarAlt />
					<span>Posted On</span>
					<p>{postedOn}</p>
				</div>
				<div>
					<FaWallet />
					<span>Experience</span>
					<p>{experience} Years</p>
				</div>
				<div>
					<MdWork />
					<span>WorkMode</span>
					<p>{workMode}</p>
				</div>
			</div>
			<Button type="btn btn-primary" handler={handleClick}>
				Apply
			</Button>

			<Dialog onClose={handleClose} open={open} fullWidth={true}
				maxWidth={'md'}>
				<div className={style2.formSection} style={{ padding: '1.5rem' }}>
					<h3 style={{ fontSize: "18px" }}>Fill Your Details</h3>
					<Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values) => handleSubmit(values)}>
						{
							({ isSubmitting }) => (
								<Form>
									<div className={style2.inputBox}>
										<MyTextInput type="text" name='candidateFirstName' label='First Name' placeholder="First Name" readOnly="true" />
										<MyTextInput type="text" name='candidateLastName' label='Last Name' placeholder="Last Name" readOnly="true" />
									</div>
									<div className={style2.inputBox}>
										<MyTextInput type="email" name='candidateEmail' label='Email' placeholder="Email" readOnly="true" />
										<MyTextInput type="number" name='candidatePhone' label='Phone Number' placeholder="Phone Number" />
									</div>
									<div className={style2.inputBox}>
										<MyTextInput type="date" name="dateOfBirth" label="Date of birth" placeholder="Date of Birth" />
										<MyTextInput type="number" name="experience" label="Experience" placeholder="experience" />
									</div>
									<div>
										<h4 style={{ marginBlockStart: '1rem' }}>Address Details</h4>
										<MyTextInput type="text" name="streetAddress" label={'Street Address'} placeholder={'Street Address'} />

										<div className={style2.inputBox}>
											<MyTextInput type="text" name="city" label="City" placeholder="City" />
											<MyTextInput type="number" name="postalCode" label={"Postal Code"} placeholder="Postal Code" />
											<MySelect label="State" name="state">
												<option value="">Select State</option>
												{
													statesOfIndia.map((state, index) => (
														<option value={state} key={index}>{state}</option>
													))
												}
											</MySelect>
										</div>
									</div>
									<div>
										<h4 style={{ marginBlockStart: '1rem' }}>Education Details</h4>
										<MyTextInput type="text" name="course" label={'Course'} placeholder={'Course'} />
										<div className={style2.inputBox}>
											<MyTextInput type="text" name="collegeName" label="College/ University" placeholder="College/University" />
											<MyTextInput type="number" name="graduationYear" label={"Graducation Year"} placeholder="Graduation Year" />
										</div>
									</div>
									<div>
										<MyTextArea label={"Cover Letter"} placeholder="Write cover letter here" name="coverLetter" rows='8' />
									</div>
									<div className='flex-justify-center'>
										<button className='btn btn-primary' type='button' onClick={handleClose}>Cancel</button>
										<button className='btn btn-primary' type='submit' onClick={handleClick} disabled={isSubmitting}>Submit</button>
									</div>
								</Form>
							)
						}
					</Formik>
				</div>
			</Dialog>
		</div>
	)
}
export default JobDetailsHeader;