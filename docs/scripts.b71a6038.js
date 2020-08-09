// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts.js":[function(require,module,exports) {
var hexInput = document.getElementById("hex-input");
var rgbInputOne = document.getElementById("rgb-input-1");
var rgbInputTwo = document.getElementById("rgb-input-2");
var rgbInputThree = document.getElementById("rgb-input-3");
var hexOutput = document.getElementById("hex-output");
var rgbOutput = document.getElementById("rgb-output");
hexInput.addEventListener("focus", function () {
  hexInput.value = "#";
});
hexInput.addEventListener("input", function () {
  var input = hexInput.value;
  hexOutput.style.backgroundColor = input;

  if (input === "") {
    input.value = "#";
    document.getElementById("hex-error").innerText = "";
  }

  if (input.split("").length == 7) {
    //Calculate our colour
    //Check if we have any invalid characters
    var regex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

    if (regex.test(input)) {
      document.getElementById("hex-error").innerText = "";
      calculateRGB(input);
    } else {
      document.getElementById("hex-error").innerText = "Your color contains incorrect characters";
    }
  }
});
rgbInputOne.addEventListener("focus", function () {
  rgbInputOne.value = "";
});
rgbInputTwo.addEventListener("focus", function () {
  rgbInputTwo.value = "";
});
rgbInputThree.addEventListener("focus", function () {
  rgbInputThree.value = "";
});
rgbInputOne.addEventListener("input", function () {
  var input = rgbInputOne.value;

  if (input.length >= 2 || input === 0) {
    //This means we can try and work out the value
    validateRgb(input);
  }
});
rgbInputTwo.addEventListener("input", function () {
  var input = rgbInputTwo.value;

  if (input.length >= 2 || input === "0") {
    //This means we can try and work out the value
    validateRgb(input);
  }
});
rgbInputThree.addEventListener("input", function () {
  var input = rgbInputThree.value;

  if (input.length >= 2 || input == 0) {
    validateRgb(input);
  }
}); //Need to think about value of 0

var calculateRGB = function calculateRGB(input) {
  var splitInput = input.split("");
  var newArr = [];
  var rgb; //Convert hex to numbers

  for (var i = 1; i < splitInput.length; i++) {
    switch (splitInput[i]) {
      case "A":
      case "a":
        newArr.push(10);
        break;

      case "B":
      case "b":
        newArr.push(11);
        break;

      case "C":
      case "c":
        newArr.push(12);
        break;

      case "D":
      case "d":
        newArr.push(13);
        break;

      case "E":
      case "e":
        newArr.push(14);
        break;

      case "F":
      case "f":
        newArr.push(15);
        break;

      default:
        newArr.push(splitInput[i]);
        break;
    }
  }

  var rgb1 = parseInt(newArr[0]) * 16 + parseInt(newArr[1]);
  var rgb2 = parseInt(newArr[2]) * 16 + parseInt(newArr[3]);
  var rgb3 = parseInt(newArr[4]) * 16 + parseInt(newArr[5]);
  rgbInputOne.value = rgb1;
  rgbInputTwo.value = rgb2;
  rgbInputThree.value = rgb3;
  hexOutput.style.backgroundColor = input;
  rgbOutput.style.backgroundColor = input;
};

var calculateHex = function calculateHex(a, b, c) {
  var numCalcA, numCalcB, numCalcC;

  if (parseInt(a)) {
    numCalcA = (parseInt(a) / 16).toFixed(2).split(".");
  } else {
    numCalcA = (parseInt(0) / 16).toFixed(2).split(".");
  }

  if (parseInt(b)) {
    numCalcB = (parseInt(b) / 16).toFixed(2).split(".");
  } else {
    numCalcB = (parseInt(0) / 16).toFixed(2).split(".");
  }

  if (parseInt(c)) {
    numCalcC = (parseInt(c) / 16).toFixed(2).split(".");
  } else {
    numCalcC = (parseInt(0) / 16).toFixed(2).split(".");
  }

  numCalcA[1] = (parseFloat("0.".concat(numCalcA[1])) * 16).toFixed(0);
  numCalcB[1] = (parseFloat("0.".concat(numCalcB[1])) * 16).toFixed(0);
  numCalcC[1] = (parseFloat("0.".concat(numCalcC[1])) * 16).toFixed(0);
  var array = numCalcA.concat(numCalcB).concat(numCalcC);
  var hex = []; //Now convert them to hex

  for (var i = 0; i < array.length; i++) {
    switch (array[i]) {
      case "10":
        hex.push("A");
        break;

      case "11":
        hex.push("B");
        break;

      case "12":
        hex.push("C");
        break;

      case "13":
        hex.push("D");
        break;

      case "14":
        hex.push("E");
        break;

      case "15":
        hex.push("F");
        break;

      default:
        hex.push(array[i]);
    }
  }

  hexInput.value = "#" + hex.join("");
  hexOutput.style.backgroundColor = "#" + hex.join("");
  rgbOutput.style.backgroundColor = "#" + hex.join("");
};

var validateRgb = function validateRgb(input) {
  if (parseInt(input) > 255) {
    document.getElementById("rgb-error").innerText = "Values cannot be higher than 255";
  } else if (parseInt(input) < 0) {
    document.getElementById("rgb-error").innerText = "Values cannot be lower than 0";
  } else {
    document.getElementById("rgb-error").innerText = "";
    rgbOutput.style.backgroundColor = "rgb(".concat(rgbInputOne.value, ",").concat(rgbInputTwo.value, ",").concat(rgbInputThree.value, ")");
    calculateHex(rgbInputOne.value, input, rgbInputThree.value);
  }
}; //Code for copy buttons


var rgbButton = document.getElementById("rgb-button");
var hexButton = document.getElementById("hex-button"); //rgb-notification

rgbButton.addEventListener("click", function () {
  var itemToCopy = document.createElement("textarea");
  document.body.appendChild(itemToCopy);
  itemToCopy.value = "".concat(rgbInputOne.value, ", ").concat(rgbInputTwo.value, ", ").concat(rgbInputThree.value);
  itemToCopy.select();
  itemToCopy.setSelectionRange(0, 999999);
  document.execCommand("copy");
  document.body.removeChild(itemToCopy);
  document.getElementById("rgb-notification").innerText = "RGB value copied to your clipboard";
  setTimeout(function () {
    document.getElementById("rgb-notification").innerText = "";
  }, 2000);
});
hexButton.addEventListener("click", function () {
  var itemToCopy = document.createElement("textarea");
  document.body.appendChild(itemToCopy);
  itemToCopy.value = hexInput.value;
  itemToCopy.select();
  itemToCopy.setSelectionRange(0, 999999);
  document.execCommand("copy");
  document.body.removeChild(itemToCopy);
  document.getElementById("hex-notification").innerText = "Hex value copied to your clipboard";
  setTimeout(function () {
    document.getElementById("hex-notification").innerText = "";
  }, 2000);
});
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52178" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map