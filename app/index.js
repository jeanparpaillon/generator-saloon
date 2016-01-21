'use strict';

var generators = require('yeoman-generator');

var Saloon = generators.Base.extend();

module.exports = Saloon.extend({
    initializing: function () {
	//this.composeWith(
	//    'angular',
	//    { options: { appPath: this.destinationPath('priv/www') } },
	//    {});
    },

    writing: function () {
	this.fs.copyTpl(
	    this.templatePath('README.md.in'),
	    this.destinationPath('README.md'),
	    {
		name: this.appname
	    }
	);
    },

    install: function () {
	this.installDependencies();
    }
});
