'use strict';

before('initialization', function () {
	global.Dex = require('./../build/sim').Dex;
	global.toID = Dex.toID;
});
