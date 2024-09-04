import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import style from '../Styles/testimonial.module.css';


const TestimonialCard = ({ data: { rating, testimonial, userName, userDesignation, image } }) => {
	const ratingStars = [];
	for (let index = 0; index < Math.round(rating); index++) {
		ratingStars.push(<FontAwesomeIcon key={index} icon={faStar} color='gold' />);
	}

	return (
		<div className={style.testimonialCard}>
			<div>
				{ratingStars}
			</div>
			<p>{testimonial}</p>
			<div>
				<div>
					<img src={image} alt="user profile" />
				</div>
				<div>
					<h4>{userName}</h4>
					<p>{userDesignation}</p>
				</div>
			</div>
		</div>
	)
}

export default TestimonialCard;