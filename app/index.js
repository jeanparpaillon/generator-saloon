'use strict';

var generators = require('yeoman-generator');
var mustache = require('mustache');

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
	}
});

module.exports = Saloon.extend({

  constructor: function() {
		generators.Base.apply(this, arguments);

		//this.sourceRoot(this.path.join(__dirname, '../templates'));
	},

  initializing: function () {
		true;
  },

  writing: function () {
		var ctx = {
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

		var files = ['README.md', 'Makefile', 'start.sh', 'version.sh', 'erlang.mk',
								 'include/{{name}}_log.hrl',
								 'src/{{name}}_app.erl', 'src/{{name}}.app.src', 'src/{{name}}.erl',
								 'src/{{name}}_http.erl', 'src/{{name}}_index.erl', 'src/{{name}}_sup.erl',
								 'priv/www/bower.json', 'priv/www/index.html', 'priv/www/favicon.ico',
								 'priv/www/robots.txt', 'priv/www/styles/main.scss', 'priv/www/images/yeoman.png',
								 'priv/www/views/main.html', 'priv/www/views/view.html'];
		var i = 0;
		for (i = 0; i < files.length; i++) {
	    this.copy_or_render(files[i], ctx);
		}
  },

	install: function () {
		this.spawnCommand('make', ['-f', 'erlang.mk', 'erlang.mk']);
	}

});
