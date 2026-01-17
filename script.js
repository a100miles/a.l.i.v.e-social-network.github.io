// const mongoclient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const port = 3000; 
const app = express();

app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const Blog = require('./models/blog.model')
mongoose.connect('mongodb://localhost:27017/', {
})
.then(()=> {
    console.log("Connected to database");
})
.catch(()=> {
    console.log("Connection failed")
});

// app.get('/', (req, res)=>{
//     res.send()
// });
app.post('/blogs', async(req, res)=>{
    // console.log(req.body);
    // req.send(req.body);
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);
    } catch {
        res.status(400).json({message: error.message});
    }
});

app.get('/', (req, res)=>{
    try {
        res.sendFile(path.join(__dirname, 'main.html'));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/blogs', async(req, res)=>{
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/blogs/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/blogs/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body, {new: true});
        if (!blog) {
            return res.status(404).send('This blog does not exist!');
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/blogs/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).send('This blog does not exist!');
        }
        res.status(200).json({message: 'Blog deleted successfully', blog});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.listen(port, ()=>{
    console.log("Server is running on http://localhost:3000")
});