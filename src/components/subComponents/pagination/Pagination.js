import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../../../contexts/ContextData";
import "./pagination.css";

function Pagination() {
  const ContextDatas = useContext(ContextData);
  const pageCount = Math.ceil(ContextDatas.filteredData.length / ContextDatas.pageSize);
  const pageNumbers = Array.from(Array(pageCount).keys());
	
  const [currentPage, setCurrentPage] = useState(1);
  const changePaginate = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    let endIndex = ContextDatas.pageSize * currentPage;
    let startIndex = endIndex - ContextDatas.pageSize;
    ContextDatas.setPaginatedFilteredData(ContextDatas.filteredData.slice(startIndex, endIndex));
  }, [currentPage, ContextDatas.filteredData]);

  return (
    <div className="pagination-container">
      {pageNumbers.map((pageNumber) => (
        <div key={pageNumber} className={pageNumber + 1 === currentPage ? "active page-num" : "page-num"} onClick={() => changePaginate(pageNumber + 1)}>
          {pageNumber + 1}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
