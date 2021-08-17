const express=require('express');
const bodyParser= require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex = require('knex');
const register = require('./controllers/register'); 
const signin = require('./controllers/signin'); 
const profile_id = require('./controllers/profile_id');
const image = require('./controllers/image');


const db= knex({
  client: 'pg',
  connection: {
    connectionstring : process.env.DATABASE_URL,
    ssl : true
  }
});

const app= express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=> {res.send('its working!!')})

app.post('/signin', (req,res)=>{ signin.handleSignin(req, res, db,bcrypt) })


app.post('/register',(req,res)=>{ register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id',(req,res)=>{ profile_id.handleProfileid(req, res, db) })


app.put('/image',(req,res)=>{ image.handleImage(req, res, db) })

app.post('/imageurl',(req,res)=>{ image.apiCall(req, res) })



app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on local host ${process.env.PORT}`);
})



   