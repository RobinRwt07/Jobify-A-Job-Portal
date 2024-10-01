import React from 'react';
import style from '../Style/jobdetail.module.css';
import DOMPurify from 'dompurify';

const JobDescription = ({ jobDescription: { jobDescription, education, workMode, skills } }) => {
	const jd = DOMPurify.sanitize(jobDescription);
	return (
		<section className={style.JobDescription}>
			<h3>Job Description</h3>
			<div className={style.box} dangerouslySetInnerHTML={{ __html: jobDescription }} />
			<h3>Education Detail</h3>
			<div className={style.box}>
				<ul>
					<li>{education}</li>
				</ul>
			</div>
			{
				skills.length !== 0 &&
				<>
					<h3>Key Skills</h3>
					<div className={`${style.box} ${style.keySkills}`}>
						{skills.map((skill, index) => <span key={index}>{skill}</span>)}
					</div>
				</>
			}
			<div>
				<h3>Work Mode : <span>{workMode}</span></h3>
			</div>
		</section>
	)
}

export default JobDescription