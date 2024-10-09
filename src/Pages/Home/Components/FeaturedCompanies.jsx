import React from 'react';
import style from '../Styles/TopCompanies.module.css';
import { Vodafone, AMD, Tesla, Intel, talkit } from './companieslogo';


const FeaturedCompanies = () => {
	return (
		<div className="container">
			<div className={style.topCompanies}>
				{/* <h2 >Top <span>Companies</span> </h2> */}
				<div>
					<div>
						<img src={Vodafone} alt='vodafone' />
					</div>
					<div>
						<img src={AMD} alt='AMD' />
					</div>
					<div>
						<img src={Intel} alt='intel' />
					</div>
					<div>
						<img src={Tesla} alt='tesla' />
					</div>
					<div>
						<img src={talkit} alt='talkit' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeaturedCompanies;