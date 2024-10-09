import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import style from '../style/candidateDetails.module.css';
import Button from '../../../Component/Button';
import avatar from '../../../Assest/Images/profileAvatar.png';
import { FaCakeCandles, FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaLayerGroup, FaPhone, FaSchool } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CandidateDetails = ({ open, handleClose, applicationId }) => {
	const allApplication = JSON.parse(localStorage.getItem('jobApplications')) || [];
	const applicationDetails = allApplication.find(application => application.applicationId === applicationId);
	if (!applicationDetails) {
		return;
	}
	function handleRejectClick() {
		applicationDetails.status = 'rejected';
		const index = allApplication.findIndex(application => application.applicationId === applicationId);
		if (index !== -1) {
			allApplication.splice(index, 1, applicationDetails);
			localStorage.setItem('jobApplications', JSON.stringify(allApplication));
			toast.success("Application Rejected");
		}
		else {
			toast.error("can't find application");
		}
		handleClose();
	}

	function handleAcceptClick() {
		applicationDetails.status = 'accepted';
		const index = allApplication.findIndex(application => application.applicationId === applicationId);
		if (index !== -1) {
			allApplication.splice(index, 1, applicationDetails);
			localStorage.setItem('jobApplications', JSON.stringify(allApplication));
			toast.success("Application Accepted");
		}
		else {
			toast.error("can't find application");
		}
		handleClose();
	}
	return (
		<Dialog onClose={handleClose} open={open} fullWidth={true}
			maxWidth={'md'}>
			<DialogContent style={{ scrollbarWidth: 'none' }}>
				<div className={style.candidateDetailsContainer}>
					<div className={style.candidateDetailsHeader}>
						<div>
							<div>
								<img src={applicationDetails?.candidateImage || avatar} alt="User Image" />
							</div>
							<div>
								<h2>
									{applicationDetails.candidateFirstName} {applicationDetails?.candidateLastName}
								</h2>
								<div>
									<FaLocationDot />
									<span>{applicationDetails.city}, {applicationDetails.state}</span>
								</div>
							</div>
						</div>
						<div>
							<Button type='btn-danger' handler={handleRejectClick}>Reject</Button>
							<Button type='btn btn-primary' handler={handleAcceptClick}>Accept Application</Button>
						</div>
					</div>
					<div className={style.candidateDetailsBody}>
						<div>
							<div className={style.educationDetails}>
								<h3>Education Details</h3>
								<div>
									<span>Education :</span>
									<span>{applicationDetails.course}</span>
								</div>
								<div>
									<span>University :</span>
									<span>{applicationDetails.collegeName}</span>
								</div>
								<div>
									<span>Graduation Year :</span>
									<span>{applicationDetails.graduationYear}</span>
								</div>
							</div>
							<h3>Cover letter</h3>
							<p>{applicationDetails.coverLetter}</p>
						</div>
						<div>
							<div className={style.candidateInformation}>
								<div>
									<FaCakeCandles />
									<span>Date of Birth</span>
									<h4>{new Date(applicationDetails.dateOfBirth).toDateString()}</h4>
								</div>
								<div>
									<FaLayerGroup />
									<span>Experience</span>
									<h4>{applicationDetails.experience} Years</h4>
								</div>
								<div>
									<FaSchool />
									<span>Education</span>
									<h4>{applicationDetails.course}</h4>
								</div>
							</div>

							<div className={style.contactInformation}>
								<h3>Contact Information</h3>
								<div>
									<FaLocationDot />
									<div>
										<span>Location</span>
										<h4>{applicationDetails.city} {applicationDetails.state}</h4>
										<p>{applicationDetails.streetAddress}</p>
									</div>
								</div>
								<div>
									<FaPhone />
									<div>
										<span>Phone</span>
										<h4>{applicationDetails.candidatePhone}</h4>
									</div>
								</div>
								<div>
									< MdEmail />
									<div>
										<span>Email Address</span>
										<h4>{applicationDetails.candidateEmail}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CandidateDetails