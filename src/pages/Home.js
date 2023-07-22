import React from 'react'
import Table from '../components/Table';


export const Home = () => {
    const columns = [
        {
            Header: "User ID",
            accessor: "id",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Description",
            accessor: "body",
        },
    ];
    
    return (
        <div> <Table columns={columns}  /></div>

    )
}
export default Home