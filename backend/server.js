const express = require("express")
const app = express()


app.get("/api/notes", (req, res)=>{
    res.status(200).send("You have 10 notes!")
})

app.post('/api/notes', (req, res)=>{
    res.status(201).json({message: "post created successfully!"})
})

app.put('/api/notes/:id', (req, res)=>{
    res.status(200).json({message: "post updated successfully!"})
})

app.delete('/api/notes/:id', (req, res)=>{
    res.status(200).json({message: "post deleted successfully!"})
})


app.listen(5001, () => {
    console.log("Server is running on port 5001")
})

