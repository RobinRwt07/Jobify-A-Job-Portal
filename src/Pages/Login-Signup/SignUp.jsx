import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './Style/signup.module.css';
import Button from "../../Component/Button";
import Card from "../../Component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from '../../Assest/Images/bgImageLogin.jpg';
import { useCandidateAuth } from "../../hooks/useCandidateAuth";
import { useEmployerAuth } from "../../hooks/useEmployerAuth";
import useAdminAuth from "../../hooks/useAdminAuth";


const SignUp = () => {
	const [activeForm, setActiveFrom] = useState('');
	const { candidateAuthed } = useCandidateAuth();
	const { employerAuthed } = useEmployerAuth();
	const isAdminAuthed = useAdminAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const formType = location.pathname.split('/').at(-1);
		if (formType == 'employer') {
			setActiveFrom('employer');
		}
		else {
			setActiveFrom('candidate');
		}
	}, [])

	useEffect(() => {
		if (candidateAuthed || employerAuthed || isAdminAuthed) {
			navigate('/', { replace: true });
		}
	}, [])

	function handleEmployerClick() {
		navigate('/signup/employer');
		setActiveFrom("employer");
	}

	function handleCandidateClick() {
		navigate('/signup/candidate')
		setActiveFrom("candidate");
	}


	return (
		<section className={`${style.loginBox} container`}>
			<div className={style.signup}>
				<div>
					<h2 className="heading">Create Account</h2>
					<p>Already have an account? <Link to={'/login'}>Log in</Link></p>
					<Card>
						<p className="tx-center">Create account as a</p>
						<div>
							<Button type={activeForm === 'candidate' ? "active-btn" : "btn-tertiary"} handler={handleCandidateClick}>
								<FontAwesomeIcon icon={faUser} />
								Candidate
							</Button>
							<Button type={activeForm === 'employer' ? "active-btn" : "btn-tertiary"} handler={handleEmployerClick}>
								<FontAwesomeIcon icon={faBuildingUser} />
								Employer
							</Button>
						</div>
					</Card>
					<Outlet />
				</div>
				<div className={style.signUpImage}>
					<img src={backgroundImage} alt="backgroundImage" />
				</div>
			</div >
		</section >
	)
}

export default SignUp;