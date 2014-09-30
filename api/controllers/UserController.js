/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new': function(req, res){
		// available to our views; without _.clone its just a pointer (we need our own copy)
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	'create': function(req, res, next){

		User.create(req.params.all(), function userCreated(err, user){
			if (err) {
				console.log(err);
				// not available to our views
				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}

			res.json(user);
			req.session.flash = {};
		});

	}

};

