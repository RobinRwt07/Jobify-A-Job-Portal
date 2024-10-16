import { useState, useEffect } from "react";
import Button from "../../Component/Button";
import Card from "../../Component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingUser, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import style from './Style/signup.module.css';
import bgImage from '../../Assest/Images/bgImageLogin.jpg';
import { useCandidateAuth } from "../../hooks/useCandidateAuth";
import { useEmployerAuth } from "../../hooks/useEmployerAuth";
import useAdminAuth from "../../hooks/useAdminAuth";

const Login = () => {
	const [activeForm, setActiveFrom] = useState('candidate');
	const { candidateAuthed } = useCandidateAuth();
	const { employerAuthed } = useEmployerAuth();
	const isAdminAuthed = useAdminAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const formType = location.pathname.split('/').at(-1);
		if (formType === 'employer') {
			setActiveFrom('employer');
		}
		if (formType === 'admin') {
			setActiveFrom('admin');
		}
		if (formType === 'candidate') {
			setActiveFrom('candidate');
		}
	}, [])

	useEffect(() => {
		if (candidateAuthed || employerAuthed || isAdminAuthed) {
			navigate('/', { replace: true });
		}
	}, [])

	function handleEmployerClick() {
		navigate('/login/employer');
		setActiveFrom("employer");
	}

	function handleCandidateClick() {
		navigate('/login/candidate')
		setActiveFrom("candidate");
	}
	function handleAdminClick() {
		navigate('/login/admin');
		setActiveFrom("admin");
	}
	return (
		<section className={`${style.loginBox} container`}>
			<div className={style.signup}>
				<div>
					<h2 className="heading">Login Account</h2>
					<p>Don't have account? <Link to={'/signup'}>Create Account</Link></p>
					<Card>
						<p className="tx-center">Login as a</p>
						<div>
							<Button type={activeForm === 'candidate' ? "active-btn" : "btn-tertiary"} handler={handleCandidateClick}>
								<FontAwesomeIcon icon={faUser} />
								Candidate
							</Button>
							<Button type={activeForm === 'employer' ? "active-btn" : "btn-tertiary"} handler={handleEmployerClick}>
								<FontAwesomeIcon icon={faBuildingUser} />
								Employer
							</Button>
							<Button type={activeForm === 'admin' ? "active-btn" : "btn-tertiary"} handler={handleAdminClick}>
								<FontAwesomeIcon icon={faUserShield} />
								Admin
							</Button>
						</div>
					</Card>
					<Outlet />
				</div>
				<div className={style.signUpImage}>
					<img src={bgImage} alt="backgroundImage" />
				</div>
			</div >
		</section >
	)
}

export default Login;