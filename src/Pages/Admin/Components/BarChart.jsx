import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
	return (
		<div>
			<Bar data={chartData}
				options={{
					plugins: {
						title: {
							display: true,
							text: "Applications received each month"
						},
						legend: {
							display: false
						}
					}
				}} />
		</div>
	)
}

export default BarChart