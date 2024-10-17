import { Suspense, useState } from 'react';
import style from '../../../Styles/dashboard.module.css';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React from 'react';
import Loader from '../../../Component/Loader';

const BarChart = React.lazy(() => import('./BarChart'));

Chart.register(CategoryScale);
const AdminOverview = () => {
	const [allApplications, setApplications] = useState(JSON.parse(localStorage.getItem('jobApplications')) || []);
	const obj = {}
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	months.forEach((month, index) => {
		if (index in obj) {
			return;
		}
		else {
			obj[index] = 0;
		}
	})

	allApplications.forEach(application => {
		const month = new Date(application.dateApplied).getMonth();
		if (month in obj) {
			obj[month] += 1;
		}
		else {
			obj[month] = 1;
		}
	});

	const [chartData, setChartData] = useState({
		labels: months,
		datasets: [
			{
				label: "Applications received ",
				data: Object.values(obj),
				backgroundColor: [
					"#50AF95",
					"#f3ba2f",
					"#2a71d0"
				],
			}]
	});
	const allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
	const totalEmployer = JSON.parse(localStorage.getItem('registeredOrg')) || [];
	const totalCandidates = JSON.parse(localStorage.getItem('registeredCandidate')) || [];
	return (
		<div className={style.overview}>
			<div>
				<h2>Hello, Robin</h2>
			</div >
			<div className='card'>
				<div>
					<span>{allJobs.length}</span><br />
					Jobs Posted
				</div>
				<div style={{ backgroundColor: '#fafad2' }}>
					<span>{totalEmployer.length}</span><br />
					Employers
				</div>
				<div >
					<span>{totalCandidates.length}</span><br />
					Candidates
				</div>
			</div>

			<div className={style.charts}>
				<Suspense fallback={<Loader />}>
					<BarChart chartData={chartData} />
				</Suspense>
			</div>
		</div>
	)
}

export default AdminOverview;