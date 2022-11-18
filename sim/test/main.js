'use strict';

before('initialization', function () {
	global.Dex = require('./..').Dex;
	global.toID = Dex.toID;
});
