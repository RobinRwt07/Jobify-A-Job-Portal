import React from 'react';
import style from '../Style/jobdetail.module.css';

const JobDescription = () => {
	return (
		<section className={style.JobDescription}>
			<div className={style.box}>
				<h4>Job Description</h4>
				<ul>
					<li>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae id, adipisci consequuntur placeat sequi laboriosam architecto excepturi harum dignissimos consectetur quasi reiciendis quam at delectus, officiis ducimus maiores blanditiis quidem.
					</li>
				</ul>
			</div>
			<div className={style.box}>
				<h4>Education Detail</h4>
				<ul>
					<li>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, autem.
					</li>
					<li>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, autem.
					</li>
				</ul>
			</div>
			<div className={style.box}>
				<h4>Preferred Skills</h4>
				<ul>
					<li>Skills</li>
					<li>Skills</li>
					<li>Skills</li>
					<li>Skills</li>
				</ul>
			</div>
			<div className={style.box}>
				<h4>Key Skills</h4>
				<div className={style.keySkills}>
					<span>skills</span>
					<span>skills</span>
					<span>skills</span>
					<span>skills</span>
				</div>
			</div>
			<div>
				<p>Role Type : <span>role </span></p>
				<p>Employement Type : <span>Full Time </span></p>
			</div>
		</section>
	)
}

export default JobDescription