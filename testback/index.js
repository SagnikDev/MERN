// const express=require('express');

// const app=express();

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const express = require('express')
const app=express()
const port=8000

app.get('/',(req,res) =>{
    return res.send('<h1>Hello This is a Homepage</h1>')
})
const admin=(req,res)=>{
    return res.send('Admin Dashboard')
};
const isAdmin= (req,res,next) =>{
    console.log('is Admin is running');
    next()
}
//isAdmin is a middleware
app.get('/admin',isAdmin,admin)

app.get('/author',(req,res) =>{
    return res.send('<h1>Hello The author is Sagnik Roy</h1>')
})
app.get('/signin',(req,res) => {
    return res.send('</h1>Hello this is signin page</h1>')
})
app.get('/signout',(req,res) =>{
    return res.send('</h1>You are Signed Out</h1>')
})
app.listen(port, () => {
    console.log(`Server is listening from the port number : ${port}`);
})