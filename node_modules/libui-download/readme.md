# libui-download

[![Build Status](https://travis-ci.org/parro-it/libui-download.svg?branch=master)](https://travis-ci.org/parro-it/libui-download)

[![NPM](https://nodei.co/npm/libui-download.png)](https://nodei.co/npm/libui-download/)

downloads a libui release zip from github

used by [libui-node](https://npmjs.org/libui-node)

### usage

```plain
$ npm install --global libui-download
$ libui-download --version=0.31.1
```

```js
var download = require('libui-download');

const zipPath = await download({
	version: '0.25.1',
	arch: 'ia32',
	platform: 'win32',
	cache: './zips' // defaults to <user home directory>/.libui
});

// zipPath will be the path of the zip that it downloaded.
// if the zip was already cached it will skip
// downloading and call the cb with the cached zip path
// if it wasn't cached it will download the zip and save
// it in the cache path

```

if you don't specify `arch` or `platform` args it will use `require('os')` to get them from the current OS. specifying `version` is mandatory.

If you would like to override the mirror location, three options are available. The mirror URL is composed as `url = LIBUI_MIRROR + LIBUI_CUSTOM_DIR + '/' + LIBUI_CUSTOM_FILENAME`.

You can set the `LIBUI_MIRROR` or [`NPM_CONFIG_LIBUI_MIRROR`](https://docs.npmjs.com/misc/config#environment-variables) env or `mirror` opt variable to use a custom base URL for grabbing libui zips. The same pattern applies to `LIBUI_CUSTOM_DIR` and `LIBUI_CUSTOM_FILENAME`

```plain
## for a local mirror
LIBUI_MIRROR="https://10.1.2.105/"
LIBUI_CUSTOM_DIR="our/internal/filePath"
```

# Attribution

This is based on [electron-download](https://github.com/electron-userland/electron-download)
by @maxogden @mafintosh and @fritx. Thank you!

# License

The MIT License (MIT)

Copyright (c) 2016 parro-it
