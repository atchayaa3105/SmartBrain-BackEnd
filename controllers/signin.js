
const handleSignin = (req,res, db, bcrypt)=>{
	const {email,password}= req.body;
	
	db.select('email','hash').from('login')
	.where('email', '=', email)
	.then(credentials=>{
		const isValid= bcrypt.compareSync(password, credentials[0].hash);
		if(isValid){
			db.select('*').from('users')
				.where('email', '=', email)
				.then(user=>{
					res.json(user[0])
				})
				.catch(err=> res.status(400).json('user not found'))
		}else{
			res.status(400).json('wrong credentials')
			}
	})
	.catch(err=> res.status(400).json('Invalid credentials'))
}

module.exports ={
	handleSignin: handleSignin
};

