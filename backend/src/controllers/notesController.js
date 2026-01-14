import mongoose from 'mongoose';
import Note from '../models/Note.js';

export const getAllNotes = async (req, res)=>{
    try{
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error fetching notes: ", error);
    }
} 

export const createNote = async (req, res)=>{
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content})
        await newNote.save();
        res.status(201).json(newNote)
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error creating note: ", error);
    }
}

export const updateNote = async (req, res)=>{
    try{
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true})
        if(!updatedNote || !mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message: "Note not found"})
        }
            res.status(200).json(updatedNote)
        
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error updating note: ", error);
    }
}

export const deleteNote = async (req, res)=>{
    try{
        const note=await Note.findByIdAndDelete(req.params.id)
        if(!note || !mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({message:"Note not found"})
        res.status(200).json({message: "Note deleted successfully!"})
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error deleting note: ", error);
    }
}

export const getNoteById = async(req, res)=>{
    try{
        const note = await Note.findById(req.params.id)
        if(!note || !mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(note)
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error fetching note: ", error)
    }
}