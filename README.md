generator-saloon
================

[![Build Status](https://travis-ci.org/jeanparpaillon/generator-saloon.svg?branch=master)](https://travis-ci.org/jeanparpaillon/generator-saloon)

Yeoman + Cowboy = Saloon !

Saloon is a yeoman generator for building cowboy-based web app.

A saloon contains:
* Backend:
  * erlang/OTP [cowboy](https://github.com/ninenines/cowboy) (version 2)
  * [cowboy-swagger](https://github.com/jeanparpaillon/cowboy-swagger):
  integrates cowboy with swagger (patched for cowboy 2)
* Frontend:
  * [Angular.js](https://angularjs.org/), with some fancy modules:
  route, touch, resource (see `priv/www/bower.json`);
  * [Bower](http://bower.io/) for managing Javascript dependancies;
  * [Bootstrap SASS](https://github.com/twbs/bootstrap-sass) for easy HTML
* Build system: GNU make + [erlang.mk](http://erlang.mk/)

# Dependencies

* yeoman-generator >= 0.18.0
* mustache >= 2.2.1
* bower
* GNU make

# Quickstart

1. Install npm (see [nvm](https://github.com/creationix/nvm) for easy Node.js + npm install)
2. Install yeoman and this generator
```sh
$ npm install -g yo generator-saloon
```
3. Create a folder for your app
```sh
$ mkdir $HOME/myapp
```
4. Call yeoman to create your app:
```sh
$ cd $HOME/myapp && yo saloon
```
5. You can now build your app and start it:
```sh
$ make && ./start.sh
```
6. You app is running and accessible on port 8080.

# TODO

* Generates a nice(r) frontend
* Integrates a data model ([JHipster](https://jhipster.github.io/jhipster-uml/#jdl) ? [OCCI](https://github.com/erocci/erocci_core/blob/master/priv/schemas/occi-core.xml) ?)
