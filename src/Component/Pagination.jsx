import style from '../Styles/pagination.module.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from './Button';


const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
	function handleNextClick() {
		if (currentPage < totalPages.length) {
			setCurrentPage(currentPage + 1);
		}
	}
	function handlePreviousClick() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	return (
		<div className={style.pagination}>
			<Button type="btn btn-primary" handler={handlePreviousClick} disabled={currentPage == 1}>
				<FaArrowLeft />
			</Button>
			{
				totalPages.map((page, index) => (
					<div key={index} onClick={(e) => setCurrentPage(Number(e.target.textContent))} className={page == currentPage ? "activePage" : ''}  >
						{page}
					</div>
				))
			}
			<Button type="btn btn-primary" handler={handleNextClick} disabled={currentPage == totalPages.length}>
				<FaArrowRight />
			</Button>
		</div>
	)
}

export default Pagination