
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import style from "../Styles/landingSection.module.css";
import landingImage from "../../../Assest/Images/landingImage.png";


export default LandingSection = () => {
	const [jobTitle, setJobTitle] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const navigate = useNavigate();

	function handleSearch() {
		if (jobTitle.length == 0 && jobLocation.length == 0) {
			return;
		}
		navigate(`/jobs?title=${jobTitle}&location=${jobLocation}`);
	}
	return (
		<div className={style.landingSection}>
			<div className="container">
				<div className={style.landingContainer}>

					<div className={style.landingContent}>
						<h2>
							Find a job  <br />that aligns with  <br />
							your interests and skills
						</h2>
						<p>
							Great platform for the job seeker that searching for new career heights and passionate about startups.
						</p>
						<div >
							<div>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								<input type="text" placeholder="Job Title, Keyword" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
							</div>
							<hr />
							<div>
								<FontAwesomeIcon icon={faLocationDot} />
								<input type="text" placeholder="Search location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
							</div>
							<Button type="btn-primary" handler={handleSearch}>Search</Button>
						</div>
						<p className="suggestion">
							Popular : UI Designer, UX Researcher, Android, Frontend Developer
						</p>
					</div>
					<div className={style["image-container"]}>
						<img src={landingImage} alt="Image" />
					</div>
				</div>
			</div>
		</div >
	);
};
