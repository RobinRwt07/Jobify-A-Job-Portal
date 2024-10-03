import { useState, useEffect } from "react";
import Button from "../../Component/Button";
import Card from "../../Component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import style from './Style/signup.module.css';
import bgImage from '../../Assest/Images/bgImageLogin.jpg';
import { useCandidateAuth } from "../../hooks/useCandidateAuth";
import { useEmployerAuth } from "../../hooks/useEmployerAuth";

const Login = () => {
	const [activeForm, setActiveFrom] = useState('');
	const { candidateAuthed } = useCandidateAuth();
	const { employerAuthed } = useEmployerAuth();
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
		if (candidateAuthed || employerAuthed) {
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