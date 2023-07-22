import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from "react-table";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { BiSkipPreviousCircle } from 'react-icons/bi';
import { BiSkipNextCircle } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { useSelector } from 'react-redux';
import AddPostModal from './AddPostModal';
import {  useNavigate } from 'react-router-dom';
import { apiUrl, validation } from '../constants/constants';

export const Table = ({ columns }) => {
    const [data,setData] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [addPostModal,setAddPostModal] = useState(false);
    const [editId,setEditId] = useState('');
    const navigate = useNavigate();
    const userData = useSelector(state=>state.auth.userData);


   
    //calling api 
    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl.postsUrl);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
      }, []);

      //delete function 
      const handleDelete = (id) => {
        axios.delete(`${apiUrl.postsUrl}/${id}`)
          .then(response => {
            // Assuming the API returns some response data, but it's not necessary for delete
            setData(data.filter(post => post.id !== id));
            toast.success(validation.deletePost.success);
          })
          .catch(err => {
            toast.error(validation.deletePost.error);
          });
      }

      //log out function

      const handleLogOut = () =>{
        localStorage.removeItem('userData');
        navigate('/login');
        toast.success(validation.logout.success)
      }
      
    const {
        getTableProps,
        getTableBodyProps,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );
    return (
        <div>
        <div className='nvbar d-flex justify-content-around align-items-center'>
        <button className='btn btn-primary m-4' onClick={()=>{setAddPostModal(true)}}>Add Post</button>
        {
          addPostModal && <AddPostModal addPostModal={addPostModal} setAddPostModal={setAddPostModal} posts={data} setPosts={setData} />
        }

        <button className='btn btn-danger' onClick={handleLogOut}>Log Out</button>
        <div className='user-info'>
            Hello , {userData[0].name}
        </div>
        </div>
        <table className="table-container" {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
  
            {page.map((row, i) => {
              prepareRow(row);
  
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                  <td>
                    <div className='d-flex align-items-center'>
                      <button onClick={()=>{setShowModal(true) ; setEditId(row.original.id) } } ><AiOutlineEdit / ></button>
                      {showModal &&  <EditModal isOpen={showModal} id={editId} setShowModal={setShowModal} posts={data} setPosts={setData}  /> }
                      <button className='ms-5' onClick={()=>handleDelete(row.original.id)}><MdDeleteOutline /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='d-flex justify-content-center align-items-center'>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BiSkipPreviousCircle size={50} />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className='ms-5'>
  
            <BiSkipNextCircle size={50} />
          </button>
          <span className='float-end ms-5'>
            Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
          </span>
        </div>
      </div>

    )
}

export default Table;
