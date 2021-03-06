var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var process = require('process');

describe('saloon', function () {
	this.timeout(10000);

	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.on('end', done);
  });	

	it('check installed files', function() {
		var appname = path.basename(process.cwd());
		assert.file([
			'.yo-rc.json', '.gitignore', 'README.md', 'Makefile', 'version.sh', '.editorconfig',
			'erlang.mk', 'include/' + appname + '_log.hrl', 'priv/Makefile',
			'relx.config', 'config/sys.config',
			'src/' + appname + '.app.src.in',
			'src/' + appname + '.erl', 'src/' + appname + '_sup.erl',
			'src/' + appname + '_desc_handler.erl', 'src/' + appname + '_echo_handler.erl', 
			'priv/bower.json', 'priv/.bowerrc', 'priv/styles/main.scss', 
			'priv/www/index.html', 'priv/www/favicon.ico',
			'priv/www/robots.txt', 'priv/www/images/yeoman.png',
			'priv/www/views/main.html', 'priv/www/views/view.html'
		]);
	});
});
