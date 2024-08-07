import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { unstable_createMuiStrictModeTheme } from '@mui/material';
import Pagination from "../pagination/Pagination";

const UserPayment = () => {
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(8);// 한페이지에 8개의 상품을 보여준다
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const [responseData, setResponseData] = useState([]);
    const apiUrl = `${process.env.REACT_APP_API_URL}purchase/user/${userId}`;



    useEffect(() => {
        async function get() {
            setLoading(true);
            try {
                await axios.get(apiUrl,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Authorization': `Bearer ${token}`,
                        },
                        params: {
                            "page": currentPage,
                            "size": 8,
                            "sort": "asc"
                        }
                    }
                ).then(function (response) {
                    const purchasesArray = response.data.products;
                    setResponseData(purchasesArray);
                    console.log("responseData: ", responseData);
                })
            } catch (error) {
                console.log("요청 실패: ", error);
                if (error.response) {
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                }
            } finally {
                setLoading(false);
            }

        };
        get();
    }, [apiUrl, token, currentPage])

    const paginate =(currentPage) => setCurrentPage(currentPage);

    return (
        <>
            <Container>
                <Title>구매 내역</Title>
                <Table>
                <tr>
                    <TableTh>상품 이미지</TableTh>
                    <TableTh>상품명</TableTh>
                    <TableTh>금액</TableTh>
                    <TableTh>판매자 닉네임</TableTh>
                </tr>
                <tbody>
                        {responseData.map((data, index) => (
                            <tr key={index}>
                                <TableTd><ThumnailImage src={data.imageUrl} alt="product" /></TableTd>
                                <TableTd>{data.productName}</TableTd>
                                <TableTd>{data.price}</TableTd>
                                <TableTd>{data.sellerNickname}</TableTd>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                 <Pagination  totalPosts={responseData.length} postsPerPage={postsPerPage} setCurrentPage={currentPage}  paginate={paginate}  />  
              
            </Container>
        </>
    );
};

export default UserPayment;

const Container = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title  = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 40px;
`;

const TableTh = styled.th`
    padding: 6px 15px;
    background: #42444e;
    color: #fff;
    text-align: center;
`;

const TableTd = styled.td`
    padding: 6px 15px;
    text-align: center;
`;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;

const ThumnailImage = styled.img`
    width: 200px;
    height: 200px;
`;