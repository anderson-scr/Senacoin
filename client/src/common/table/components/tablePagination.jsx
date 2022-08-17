import React from 'react'

const TablePagination = ({canPreviousPage, pageIndex, pageOptions, canNextPage, nextPage, previousPage, gotoPage}) => {
  return (
    <div className='d-flex mt-4 justify-content-end align-items-center'>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage} href="#">Anterior</button></li>
          <li className="page-item"><button className="page-link paginationIdxSelected" > {pageIndex + 1} </button></li>
          <li className="page-item"><button className="page-link" onClick={() => gotoPage(pageIndex + 1)} style={{display: pageIndex + 2 > pageOptions.length? 'none' : 'block'}} > {pageIndex + 2} </button></li>
          <li className="page-item"><button className="page-link" onClick={() => gotoPage(pageIndex + 2)} style={{display: pageIndex + 3 > pageOptions.length? 'none' : 'block'}} > {pageIndex + 3} </button></li>
          <li className="page-item"><button className="page-link dotsPagination" disabled={true} >...</button></li>
          <li className="page-item"><button className="page-link" disabled={true} href="#"> { pageOptions.length } </button></li>
          <li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage} href="#">Proximo</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default TablePagination