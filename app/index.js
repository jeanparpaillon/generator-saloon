'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var mustache = require('mustache');
var cmd = require('spawn-sync');
var chalk = require('chalk');
var fws = require('fixed-width-string');
var grunt = require('gruntfile-editor');

var Saloon = generators.Base.extend({
  render: function (tmplFile, dest, ctx) {
		var tmpl = this.fs.read(this.templatePath(tmplFile));
		this.fs.write(this.destinationPath(dest), mustache.render(tmpl, ctx));
  },

	copy_or_render: function (name, ctx) {
		var dest = mustache.render(name, ctx);
		if (this.fs.exists(this.templatePath(name + '.in'))) {
			this.render(name + '.in', dest, ctx);
		} else {
			this.fs.copy(this.templatePath(name), this.destinationPath(dest));
		}
	},

	ctx: function () {
		return {
	    name: this.appname,
	    description: this.description,
			versions: {
				ng: "1.4.0",
				boostrapsass: "3.2.0"
			},
			ngVer: "1.4.0",
	    curlyOpen: '{{',
	    curlyEnd: '}}'
		};
	},

	log2: function (cmd, target) {
		this.log(fws(chalk.green(cmd), 9, {align: 'right'}) + ' ' + target);		
	}
});

module.exports = Saloon.extend({

  constructor: function() {
		generators.Base.apply(this, arguments);

		this.sourceRoot(path.join(__dirname, '../templates'));
	},

  initializing: function () {
		true;
  },

  writing: function () {
		var files = ['.yo-rc.json', '.gitignore', '.editorconfig',
								 'README.md', 'Makefile', 'start.sh', 'version.sh', 'erlang.mk',
								 'include/{{name}}_log.hrl',
								 'src/{{name}}_app.erl', 'src/{{name}}.app.src.in', 'src/{{name}}.erl',
								 'src/{{name}}_http.erl', 'src/{{name}}_index.erl', 'src/{{name}}_sup.erl',
								 'priv/package.json', 'priv/.bowerrc', 'priv/bower.json',
								 'priv/styles/main.scss',
								 'priv/www/index.html', 'priv/www/favicon.ico',
								 'priv/www/robots.txt', 'priv/www/images/yeoman.png',
								 'priv/www/views/main.html', 'priv/www/views/view.html'];
		var i = 0;
		for (i = 0; i < files.length; i++) {
	    this.copy_or_render(files[i], this.ctx());
		};
		
		// Grunt
		var gruntfile = new grunt();
		gruntfile.insertConfig("sass",
													 "{ dist: { files: { 'www/styles/main.css': 'styles/main.scss' } } }");
		gruntfile.insertConfig("watch",
													 "{ source: " + 
													 "  {" +
													 "    files:  ['styles/main.scss']," +
													 "    tasks:  ['sass']," +
													 "    options: { livereload: true }" +
													 "  }" +
													 "}");
		gruntfile.loadNpmTasks(['grunt-sass', 'grunt-contrib-watch']);
		gruntfile.registerTask('default', ['sass']);
		this.fs.write(this.destinationPath('priv/Gruntfile.js'), gruntfile.toString());

  },

	install: function () {
		this.log2('chmod', 'start.sh');
		cmd('chmod', ['a+x', this.destinationPath('start.sh')]);

		this.log2('bootstrap', 'erlang.mk');
		cmd('make', ['-f', 'erlang.mk', 'erlang.mk']);

		chalk.blue.bold("Saloon ready for gig. Let's dance !");
		chalk.bold("Now, type 'make' for building.");
	}
});
