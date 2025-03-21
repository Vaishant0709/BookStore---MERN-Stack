import React from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from "react-icons/pi";
import {BsInfoCircle} from "react-icons/bs"
import {BiUserCircle} from "react-icons/bi"
import { AiFillAccountBook, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import BooksSingleCard from './BooksSingleCard';
function BooksCard({books}) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item)=>(
        <BooksSingleCard key={item._id} book={item}/>
      ))}
    </div>
  )
}

export default BooksCard