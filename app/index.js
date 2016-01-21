'use strict';

var generators = require('yeoman-generator');
var mustache = require('mustache');

var Saloon = generators.Base.extend({
    render: function (tmplFile, dest, ctx) {
	var tmpl = this.fs.read(this.templatePath(tmplFile));
	this.fs.write(this.destinationPath(dest), mustache.render(tmpl, ctx));
    },

    copy: function (orig, dest) {
	if (typeof dest === "undefined") {
	    dest = orig;
	}
	this.fs.copy(this.templatePath(orig), this.destinationPath(dest));
    }
});

module.exports = Saloon.extend({
    initializing: function () {
	//this.composeWith(
	//    'angular',
	//    { options: { appPath: this.destinationPath('priv/www') } },
	//    {});
    },

    writing: function () {
	var ctx = {
	    name: this.appname
	};
	this.render('README.md.in', 'README.md', ctx);
	this.render('Makefile.in', 'Makefile', ctx);
	this.render('start.sh.in', 'start.sh', ctx);
	
	this.copy('version.sh');
    },

    install: function () {
	this.installDependencies();
    }
});
