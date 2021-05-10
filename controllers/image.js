const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '184dd713f35942dc8f8ac2efce9137c0'
});

const apiCall = (req,res)=>{

	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data =>{
			res.json(data)
		})
		.catch(err=>res.status(400).json('error with API')) 
}

const handleImage = (req, res, db)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>{
		res.json(entries);
	})
	 .catch(err=>res.status(400).json('error incrementing entries')) 
}

module.exports ={
handleImage,
apiCall
};
