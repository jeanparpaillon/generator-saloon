'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var mustache = require('mustache');
var cmd = require('spawn-sync');

var Saloon = generators.Base.extend({
    render: function(tmplFile, dest, ctx) {
        var tmpl = this.fs.read(this.templatePath(tmplFile));
        this.fs.write(this.destinationPath(dest), mustache.render(tmpl, ctx));
    },

    copy_or_render: function(name, ctx) {
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

        this.sourceRoot(path.join(__dirname, '../templates'));
    },

    initializing: function() {
        true;
    },

    writing: function() {
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

        ['.yo-rc.json', '.gitignore',
            'README.md', 'Makefile', 'start.sh', 'version.sh', 'erlang.mk',
            'include/{{name}}_log.hrl',
            'src/{{name}}_app.erl', 'src/{{name}}.app.src.in', 'src/{{name}}.erl',
            'src/{{name}}_http.erl', 'src/{{name}}_index.erl', 'src/{{name}}_sup.erl',
            'priv/www/bower.json', 'priv/www/index.html', 'priv/www/favicon.ico',
            'priv/www/robots.txt', 'priv/www/styles/main.scss', 'priv/www/images/yeoman.png',
            'priv/www/views/main.html', 'priv/www/views/view.html'
        ].forEach(function (file) {
            this.copy_or_render(file, ctx);
        }.bind(this));
    },

    install: function() {
        cmd('chmod', ['a+x', this.destinationPath('start.sh')]);
        cmd('make', ['-f', 'erlang.mk', 'erlang.mk']);
        this.log("###\n" + "### Your app is ready. You can build it with 'make'\n" + "###");
    }

});
