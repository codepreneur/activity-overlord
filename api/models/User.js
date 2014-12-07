/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	// prevents saving csrf, passwords etc to database AND client getting them
	schema: true,

  attributes: {

  	name: {
  		type: 'string',
  		required: true
  	},

  	title: {
  		type: 'string'
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

  	encryptedPassword: {
  		type: 'string'
  	},

  	// prevents client getting csrf, passwords etc.
  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  		return obj;
  	}

  },

  beforeCreate: function(values, next){
    if(!values.password || values.password != values.confirmation){
      return next({err: ["Password doesnt match password confirmation"]});
    }
    // 10 is the number of rounds its gonna do hashing algortihm
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online = true;
      next();
    });
  }

};

