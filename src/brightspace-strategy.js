'use strict';

var passport = require('passport-strategy'),
	TokenValidator = require('brightspace-auth-validation'),
	util = require('util');

function BrightspaceStrategy(options) {
	options = options || {};
	this.name = 'brightspace';
	this._validator = new TokenValidator(options);
	passport.Strategy.call(this);
}

util.inherits(BrightspaceStrategy, passport.Strategy);

BrightspaceStrategy.prototype.authenticate = function(req) {
	var self = this;

	return this._validator
		.fromHeaders(req.headers)
		.then(function(token) {
			if (!token) {
				self.fail('Not authorized');
			} else {
				self.success(token);
			}
		})
		.catch(function(err) {
			self.error(err);
		});
};

module.exports = BrightspaceStrategy;
