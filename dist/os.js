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
	__webpack_require__(3);
	__webpack_require__(6);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ReadDirection;
	(function (ReadDirection) {
	    ReadDirection[ReadDirection["Left"] = 0] = "Left";
	    ReadDirection[ReadDirection["Right"] = 1] = "Right";
	})(ReadDirection || (ReadDirection = {}));
	var AlgorithmBase = (function () {
	    function AlgorithmBase() {
	    }
	    return AlgorithmBase;
	}());
	exports.default = AlgorithmBase;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Controller = (function () {
	    function Controller() {
	        this.algorithmSelect = document.getElementById('algorithm-select');
	        this.setupSelectListener();
	        this.algorithmQueue = document.getElementById('algorithm-queue');
	        this.setupTextareaCharacterCheck();
	        this.algorithmRunButton = document.getElementById('algorithm-run');
	        this.setupRunButton();
	    }
	    Controller.prototype.setupSelectListener = function () {
	        var _this = this;
	        this.algorithmSelect.addEventListener('change', function () {
	            console.log(_this.algorithmSelect.value);
	            _this.algorithmChangeCallback(_this.algorithmSelect.value);
	        });
	    };
	    Controller.prototype.onAlgorithmChange = function (callback) {
	        this.algorithmChangeCallback = callback;
	    };
	    Controller.prototype.setupTextareaCharacterCheck = function () {
	        this.algorithmQueue.addEventListener('keypress', function (event) {
	            var keycode = event.which;
	            console.log(keycode);
	            if ((keycode >= 48 && keycode <= 57) || keycode == 44) {
	                return true;
	            }
	            else {
	                event.preventDefault();
	                return false;
	            }
	        });
	    };
	    Controller.prototype.setupRunButton = function () {
	        var _this = this;
	        this.algorithmRunButton.addEventListener('click', function (event) {
	            event.preventDefault();
	            var queueString = _this.getSanitizedQueueString();
	            var queue = queueString.split(',').map(function (str) { return parseInt(str); });
	            console.log(queue);
	        });
	    };
	    Controller.prototype.getSanitizedQueueString = function () {
	        var queue = this.algorithmQueue.value;
	        queue = queue.replace(/[^\d\,]/gi, '');
	        this.algorithmQueue.value = queue;
	        return queue;
	    };
	    return Controller;
	}());
	exports.default = Controller;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var paper = __webpack_require__(4);
	var Controller_1 = __webpack_require__(2);
	var FCFS_1 = __webpack_require__(5);
	var OSKApp = (function () {
	    function OSKApp(canvas) {
	        this.canvas = canvas;
	        this.controller = new Controller_1.default();
	        this.algorithms = {
	            fcfs: new FCFS_1.default(),
	        };
	        this.setCurrentAlgorithm('fcfs');
	        this.controller.onAlgorithmChange(this.setCurrentAlgorithm.bind(this));
	        paper.setup(this.canvas);
	        var path = new paper.Path();
	        var start = new paper.Point(100, 100);
	        path.moveTo(start);
	        path.strokeColor = 'black';
	        path.lineTo(start.add([150, 100]));
	        path.lineTo(start.add([100, -50]));
	        path.smooth();
	        paper.view.draw();
	    }
	    OSKApp.prototype.setCurrentAlgorithm = function (algorithmID) {
	        if (this.algorithms.hasOwnProperty(algorithmID)) {
	            this.currentAlgorithm = this.algorithms[algorithmID];
	            console.log(this.currentAlgorithm);
	        }
	    };
	    return OSKApp;
	}());
	exports.default = OSKApp;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = paper;

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
	var AlgorithmBase_1 = __webpack_require__(1);
	var FCFS = (function (_super) {
	    __extends(FCFS, _super);
	    function FCFS() {
	        return _super.call(this) || this;
	    }
	    FCFS.prototype.run = function (trackQueue) {
	        return trackQueue;
	    };
	    return FCFS;
	}(AlgorithmBase_1.default));
	exports.default = FCFS;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OSKApp_1 = __webpack_require__(3);
	document.addEventListener('DOMContentLoaded', function (event) {
	    var targetCanvas = document.getElementById('main-canvas');
	    var oskAlgorithms = new OSKApp_1.default(targetCanvas);
	});


/***/ }
/******/ ]);