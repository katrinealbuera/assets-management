// http://react-component.github.io/pagination/examples/styles.html
import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const center = {
    width: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '10px',
}

export function CommonPager(total, currentPage, onChange) {
    return (
        <div style={center} >
            <Pagination current={currentPage} total={total} onChange={onChange} pageSize={10} />
        </div>
    )
};