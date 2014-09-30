module.exports = function(req, res, next){
	res.locals.flash = {};
	if(!req.session.flash) return next();
	
	// available to our views; without _.clone its just a pointer (we need our own copy)
	res.locals.flash = _.clone(req.session.flash);

	req.session.flash = {};
	next();
};