import express from "express"
import {Book} from "../models/book.model.js"
const router=express.Router();

//ROUTE TO SAVE NEW BOOK
router.post('/',async (req,res)=>{
  try {
    const {title,author,publishYear}=req.body;
    if(!title || !author ||!publishYear){
      return res.status(400).send({
        message :'Send all required fields'
      });
    }
    const newBook={title,author,publishYear}

    const book=await Book.create(newBook);

    return res.status(201).send(book)
    
  } catch (error) {
    console.log(`ERROR :: BOOK SAVE ROUTE :: ${error}`);
    return res.status(500).send({message : error.message});
  }
})

//Route to Get All Books from database
router.get("/",async (req,res)=>{
  try {
    const books=await Book.find({});
    return res.status(200).json({
      count:books.length,
      data:books
    });
  } catch (error) {
    console.log(`ERROR :: GET ALL BOOKS ROUTE :: ${error}`);
    return res.status(500).send({message : error.message})
    
  }
})

//Route to get one book from DB by id
router.get("/:id",async (req,res)=>{
  try {

    const {id}=req.params;
    const book=await Book.findById(id);
    if(!book){
      return res.status(404).json({message:'Book not Found'});
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(`ERROR :: GET ONE BOOK BY ID  :: ${error}`);
    return res.status(500).send({message : error.message})
    
  }
})

//Route to update a book
router.put('/:id',async (req,res)=>{
  try {
    const {title,author,publishYear}=req.body;
    const{id}=req.params;
    if(!title || !author || !publishYear){
      return res.status(400).send({message: "send all required field"});
    }

    const result=await Book.findByIdAndUpdate(id,req.body);

    if(!result){
      return res.status(404).json({message:"Book not Found"})
    }
    return res.status(200).json({message : "Book Updates Suucessfully"})
  
  } catch (error) {
    console.log(`ERROR :: UPDATE BOOK :: ${error}`);
    return res.status(500).send({message:error.message});
  }
})

//Route to delete a book
router.delete('/:id',async (req,res)=>{
  try {
    const {id}=req.params;
    const result =await Book.findByIdAndDelete(id);

    if(!result){
      return res.status(404).json({message:"Book not Found"});
    }
    return res.status(400).json({message:"Book Deleted Successfully"});
    
  } catch (error) {
    console.log(`ERROR :: DELETE BOOK :: ${error}`);
    return res.status(500).send({message:error.message});
  }
})

export default router ;