import React, { useState } from 'react';
import styled from "styled-components";
import axios from "axios";

const Pagination = ({pageGrupArray}) => {
    return (
       <PaginationWrapper>
          {pageGrupArray}
       </PaginationWrapper>
    );
};

export default Pagination;

const PaginationWrapper = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    margin-right: 2px;
    background-color: white;
    color: black;
    cursor: pointer;
`;