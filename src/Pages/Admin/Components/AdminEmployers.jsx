import React, { useState } from 'react'
import Message from '../../../Component/Message';
import style from '../Styles/TableRow.module.css';
import EmployerRow from './EmployerRow';
import Pagination from '../../../Component/Pagination';

const AdminEmployers = () => {
	const totalEmployer = JSON.parse(localStorage.getItem('registeredOrg')) || [];
	const [currentPage, setCurrentPage] = useState(1);

	if (totalEmployer.length === 0) {
		return <Message>No Employer</Message>
	}

	const itemsPerPage = 10;
	const lastItem = itemsPerPage * currentPage;
	const firstItem = lastItem - itemsPerPage;
	const currentPageItem = totalEmployer.slice(firstItem, lastItem);

	const totalPages = [];
	for (let i = 1; i <= Math.ceil(totalEmployer.length / itemsPerPage); i++) {
		totalPages.push(i);
	}
	const allEmployers = JSON.parse(localStorage.getItem('employersDetails')) || [];
	return (
		<section>
			<h3>Total Employer ({totalEmployer.length})</h3>
			<div className={style.tableContainer}>

				<div className={style.table}>
					{
						totalEmployer.length === 0 ?
							<Message>No Saved Jobs</Message> :
							currentPageItem.map(employer => {
								const matchedOrg = allEmployers.find(company => company.companyId === employer.companyId);
								return <EmployerRow key={employer.companyId} employerInfo={employer} companyImage={matchedOrg?.companyImage} companyName={employer?.companyName} />
							})
					}
				</div>
			</div>
			{
				(totalPages.length > 1) &&
				<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
			}
		</section>
	)
}

export default AdminEmployers