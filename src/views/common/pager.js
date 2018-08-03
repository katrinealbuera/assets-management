import React, { Component } from 'react';
import Pager from 'react-pager';

export default class commonPager extends Component {
    
    pager(total, currentPage, handlePageChanged) {
        return (
            <Pager
            total={total}
            current={currentPage}
            visiblePage={currentPage}
            titles={{ first: '<|', last: '>|' }}
            className="pagination-sm pull-right"
            onPageChanged={handlePageChanged}
            />
        )
      };
}
