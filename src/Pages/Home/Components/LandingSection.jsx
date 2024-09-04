
import { useState } from 'react';
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

	function handleSubmit(e) {
		e.preventDefault();
		console.log(jobLocation, jobTitle);
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
						<form onSubmit={handleSubmit}>
							<div>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								<input type="text" placeholder="Job Title, Keyword" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
							</div>
							<hr />
							<div>
								<FontAwesomeIcon icon={faLocationDot} />
								<input type="text" placeholder="Search location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
							</div>
							<Button type="btn-primary">Search </Button>
						</form>
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
