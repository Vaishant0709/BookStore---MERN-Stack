import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'
function DeleteBook() {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate() 
  const {id}=useParams()
  const {enqueueSnackbar}=useSnackbar()
  const handleDeleteBook=()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      console.log("SUCCESSFULLY DELETED");
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully',{variant:'success'})
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false)
      // alert('An Error has occured')
      enqueueSnackbar('Error',{variant:'error'})
      console.log(`ERROR :: DELETE BOOK:: ${error}`);
      
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 '>Delete Book</h1>
      {loading ? <Spinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl '>Are you Sure You Want to delte this book ?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
          Yes,Delete It
        </button>
      </div>
    </div>
  )
}

export default DeleteBook