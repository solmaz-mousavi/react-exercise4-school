import React from 'react';
import { FaSearch } from "react-icons/fa";
import "./tableTop.css";

function TableTop({addMethod, searchMethod, search, setSearch}) {
	const searchListener = (event) => {
		if(event.which === 13){
			searchMethod();
		};
	};
	return (
		<div>
			<div className="form-top">
        	<button className="btn btn-green" onClick={addMethod}>جدید</button>
					<div className="search-container">
						<input type="text" placeholder="جستجو..." value={search} onChange={(event)=> setSearch(event.target.value)} onKeyDown={searchListener}/>
						<button type="button" className="btn btn-icon btn-search" onClick={searchMethod}><FaSearch /></button>
					</div>
			</div>
		</div>
	)
}

export default TableTop