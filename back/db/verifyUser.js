module.exports = (email, website) => {
	return new Promise((resolve, reject) => {
		Users.find({ email, website: req.get('host') }).toArray().then((data) => {
			if (!data[0]) return reject('Not permitted')
			resolve('yes')
		})
	})
}
