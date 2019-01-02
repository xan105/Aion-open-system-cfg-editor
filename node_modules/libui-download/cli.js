#!/usr/bin/env node

var tar = require('tar');
var download = require('./');

download({version: process.argv[2] || process.env.npm_package_libui})
	.then(function (zipPath) {
		console.log('Downloaded zip:', zipPath);
		return tar.extract({file: zipPath});
	})
	.then(function () {
		console.log('Libui binaries extracted to:', process.cwd());
	})
	.catch(function (err) {
		console.error(err.stack);
		process.exit(1);
	});

