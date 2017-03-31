/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Algorithm = (function () {
	    function Algorithm() {
	    }
	    Algorithm.prototype.run = function (trackQueue) {
	    };
	    return Algorithm;
	}());
	exports.default = Algorithm;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var paper = __webpack_require__(3);
	var OSKApp = (function () {
	    function OSKApp(canvas) {
	        this.canvas = canvas;
	        paper.setup(this.canvas);
	    }
	    return OSKApp;
	}());
	exports.default = OSKApp;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = paper;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OSKApp_1 = __webpack_require__(2);
	document.addEventListener('DOMContentLoaded', function (event) {
	    var targetCanvas = document.getElementById('main-canvas');
	    var oskAlgorithms = new OSKApp_1.default(targetCanvas);
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Algorithm_1 = __webpack_require__(1);
	var FCFS = (function (_super) {
	    __extends(FCFS, _super);
	    function FCFS() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return FCFS;
	}(Algorithm_1.default));


/***/ }
/******/ ]);