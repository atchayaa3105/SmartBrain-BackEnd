const emailValidator= require('email-validator');

const handleRegister = (req,res,db, bcrypt)=>{
	const {email,name,password}=req.body;
	const isValid= emailValidator.validate(email);
	if(isValid === false || password.length < 6){
		return res.status(400).json('Invalid Email address or password length');
	}
				
	const hash= bcrypt.hashSync(password);
		db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginEmail=>{
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name:name,
						joined: new Date()
					})
					.then(user =>{
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		}) 
	    .catch(err=> res.status(400).json(err)) 
}


module.exports = {
	handleRegister: handleRegister
};
