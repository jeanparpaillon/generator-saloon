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
			'.yo-rc.json', '.gitignore', 'README.md', 'Makefile', 'start.sh', 'version.sh',
			'erlang.mk', 'include/' + appname + '_log.hrl'
		]);
	});
});
