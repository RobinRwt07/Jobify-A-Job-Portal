import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import style from '../Styles/testimonial.module.css';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Component/Button";
import testimonials from "../../../../Public/DummyData/testimonial";

const Testmonial = () => {
	const scrollBox = useRef(null);
	function handleNextClick() {
		scrollBox.current.scrollBy({
			left: 300,
			behavior: "smooth",
		});
	}
	function handlePreviousClick() {
		scrollBox.current.scrollBy({
			left: -300,
			behavior: "smooth",
		});
	}

	return (
		<div className="container">
			<div>
				<h2 className='heading'>Client <span>Testimonials</span></h2>
				<div className={style.testimonialBox}>
					<div ref={scrollBox} >
						{testimonials.map(testimonial => <TestimonialCard data={testimonial} key={testimonial.id} />)}
					</div>
					<div className={style.sliderBtn}>
						<Button type="btn-tertiary" handler={handlePreviousClick}>
							<FontAwesomeIcon icon={faArrowLeft} />
						</Button>
						<Button type="btn-tertiary" handler={handleNextClick}>
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					</div>
				</div>
			</div>
		</div >
	)
}
export default Testmonial;