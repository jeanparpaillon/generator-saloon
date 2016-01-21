'use strict';

var generators = require('yeoman-generator');
var mustache = require('mustache');

var Saloon = generators.Base.extend({
    render: function (tmplFile, dest, ctx) {
	var tmpl = this.fs.read(this.templatePath(tmplFile));
	this.fs.write(this.destinationPath(dest), mustache.render(tmpl, ctx));
    },

    render2: function (name, ctx) {
	var dest = mustache.render(name, ctx);
	this.log("RENDER " + name + '.in -> ' + dest);
	this.render(name + '.in', dest, ctx);
    },

    copy: function (orig, dest) {
	if (typeof dest === "undefined") {
	    dest = orig;
	}
	this.fs.copy(this.templatePath(orig), this.destinationPath(dest));
    }
});

module.exports = Saloon.extend({

    constructor: function() {
	generators.Base.apply(this, arguments);

	//this.composeWith('angular', {
	//    options: { appPath: this.destinationPath('priv/www') }
	//}, {});
    },

    initializing: function () {
	true;
    },

    writing: function () {
	var ctx = {
	    name: this.appname,
	    description: this.description,
	    curlyOpen: '{{',
	    curlyEnd: '}}'
	};

	var files = ['README.md', 'Makefile', 'start.sh',
		     'include/{{name}}_log.hrl',
		     'src/{{name}}_app.erl', 'src/{{name}}.app.src', 'src/{{name}}.erl',
		     'src/{{name}}_http.erl', 'src/{{name}}_index.erl', 'src/{{name}}_sup.erl'];
	var i = 0;
	for (i = 0; i < files.length; i++) {
	    this.render2(files[i], ctx);
	}
	
	this.copy('version.sh');
    },

    install: function () {
	this.installDependencies();
    }

});
