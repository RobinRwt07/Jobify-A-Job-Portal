import React, { useEffect, useRef, useState } from 'react'
import { useEmployerInfo } from '../useEmployerInfo';
import style from '../style/companyProfile.module.css';
import logo from '../../../Assest/Images/profileAvatar.png';
import Button from '../../../Component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import CompanyInfo from './CompanyInfo';
import UpdateProfile from './UpdateProfile';
import AccoutSetting from './AccoutSetting';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import ProfileEditAlert from '../../Candidate/Component/ProfileEditAlert';

const EmployerProfile = () => {
	const { companyInfo } = useEmployerInfo();
	const [employerDetails, setEmployerDetails] = useState({});
	const [activeTab, setActiveTab] = useState("CompanyInfo");
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [previewData, setPreviewData] = useState(null);
	const fileInputRef = useRef(null);


	useEffect(() => {
		const allEmployerDetails = JSON.parse(localStorage.getItem('employersDetails')) || [];
		const employerInfo = allEmployerDetails.find(employer => employer.companyId === companyInfo.companyId);
		if (employerInfo) {
			setEmployerDetails(employerInfo);
		}
	}, [])

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setError('');
		setPreviewData(null);
		setOpen(false);
	};

	function handleChange() {
		const seletedFile = fileInputRef.current.files[0];
		const fileSize = Math.round(seletedFile.size / 1024);
		if (fileSize > 50) {
			setPreviewData(null);
			setError('file size should be less then 50kb.');
		}
		else {
			const reader = new FileReader();
			reader.onload = function (e) {
				setPreviewData(e.target.result);
			}
			reader.readAsDataURL(seletedFile);
			setError('');
		}
	}

	function handleProfileUpdate() {
		const allOrg = JSON.parse(localStorage.getItem('employersDetails')) || [];
		const index = allOrg.findIndex(org => org.companyId === companyInfo.companyId);
		if (index !== -1) {
			allOrg[index].companyImage = previewData;
		}
		else {
			const newEmployer = {
				companyId: companyInfo.companyId,
				companyName: companyInfo.companyName,
				companyImage: previewData
			}
			allOrg.push(newEmployer);
		}
		localStorage.setItem("employersDetails", JSON.stringify(allOrg));
		toast.success("Image uploaded");
		handleClose();
		setTimeout(() => {
			location.reload();
		}, 1000)
	}
	return (
		<section className={style.companyProfile}>
			<div>
				<div>
					<img src={employerDetails.companyImage || logo} alt="CompanyLogo" />
				</div>
				<h2>{companyInfo.companyName}</h2>
				<div className='flex-justify-center'>
					<Button handler={handleClickOpen}>Update Picture</Button>
					<Dialog
						open={open}
						onClose={handleClose}>
						<DialogTitle>Update Profile</DialogTitle>
						<DialogContent>
							<div className={style.fileUploadForm}>
								{
									previewData &&
									<img src={previewData} alt="profileImage" />
								}
								<label htmlFor='profilePicture'>
									Select Image:
									<input ref={fileInputRef} type="file" name="profilePicture" id="profilePicture" accept='image/*' onChange={handleChange} />
								</label>
								{error.length > 0 && <span >{error}</span>}
							</div>
						</DialogContent>
						<DialogActions>
							<Button type='tertairy' handler={handleClose}>Cancel</Button>
							<Button disabled={previewData == null || error.length > 0} handler={handleProfileUpdate} >Update</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
			{!(employerDetails.hasOwnProperty("employerInfo")) && <ProfileEditAlert setActiveTab={setActiveTab} />}
			<div>
				<div className={style.employerTabs}>
					<div className={activeTab === "CompanyInfo" && 'activeEmployerTab'} onClick={() => setActiveTab('CompanyInfo')} >
						<FontAwesomeIcon icon={faUser} />
						<span>Company Info</span>
					</div>
					<div className={activeTab === "UpdateProfile" && 'activeEmployerTab'} onClick={() => { setActiveTab("UpdateProfile") }} >
						<FontAwesomeIcon icon={faInfo} />
						<span>Update Profile</span>
					</div>
					<div className={activeTab === "AccountSetting" && 'activeEmployerTab'} onClick={() => setActiveTab("AccountSetting")} >
						<FontAwesomeIcon icon={faGear} />
						<span>Account Setting</span>
					</div>
				</div>
				{activeTab === 'CompanyInfo' && <CompanyInfo employerDetails={employerDetails.employerInfo} />}
				{activeTab === 'UpdateProfile' && <UpdateProfile employerDetails={employerDetails.employerInfo} />}
				{activeTab === 'AccountSetting' && <AccoutSetting />}
			</div>
		</section >
	)
}

export default EmployerProfile