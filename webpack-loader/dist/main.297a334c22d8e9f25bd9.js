/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: Cannot find module '@babel/core'\\nRequire stack:\\n- C:\\\\Users\\\\ms\\\\Desktop\\\\up\\\\mode\\\\webpack-loader\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\Compiler.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\webpack.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack-cli\\\\bin\\\\convert-argv.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack-cli\\\\bin\\\\webpack.js\\n- C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\bin\\\\webpack.js\\n babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.\\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:815:15)\\n    at Function.Module._load (internal/modules/cjs/loader.js:667:27)\\n    at Module.require (internal/modules/cjs/loader.js:887:19)\\n    at require (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack-cli\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:159:20)\\n    at Object.<anonymous> (C:\\\\Users\\\\ms\\\\Desktop\\\\up\\\\mode\\\\webpack-loader\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js:10:11)\\n    at Module._compile (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack-cli\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:178:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)\\n    at Module.load (internal/modules/cjs/loader.js:863:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:708:14)\\n    at Module.require (internal/modules/cjs/loader.js:887:19)\\n    at require (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack-cli\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:159:20)\\n    at loadLoader (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:13:17)\\n    at iteratePitchingLoaders (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at runLoaders (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:362:2)\\n    at NormalModule.doBuild (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:235:3)\\n    at NormalModule.build (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:365:15)\\n    at Compilation.buildModule (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:362:10)\\n    at C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:711:12\\n    at C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:366:6\\n    at C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:143:13\\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\tapable\\\\lib\\\\HookCodeFactory.js:24:12), <anonymous>:4:1)\\n    at AsyncSeriesWaterfallHook.lazyCompileHook [as _callAsync] (C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\node_modules\\\\tapable\\\\lib\\\\Hook.js:35:21)\\n    at C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:126:29\\n    at C:\\\\Users\\\\ms\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:304:9\\n    at processTicksAndRejections (internal/process/task_queues.js:79:11)\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });