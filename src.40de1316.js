// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"..\\smooth-dnd\\src\\polyfills.js":[function(require,module,exports) {
var global = arguments[3];
(function (constructor) {
  if (constructor && constructor.prototype && !constructor.prototype.matches) {
    constructor.prototype.matches = constructor.prototype.matchesSelector || constructor.prototype.mozMatchesSelector || constructor.prototype.msMatchesSelector || constructor.prototype.oMatchesSelector || constructor.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
})(global.Node || global.Element);

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
(function (constructor) {
  if (constructor && constructor.prototype && constructor.prototype.firstElementChild == null) {
    Object.defineProperty(constructor.prototype, "firstElementChild", {
      get: function get() {
        var node,
            nodes = this.childNodes,
            i = 0;
        while (node = nodes[i++]) {
          if (node.nodeType === 1) {
            return node;
          }
        }
        return null;
      }
    });
  }
})(global.Node || global.Element);

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function (fun /*, thisArg*/) {
    "use strict";

    if (this == null) {
      throw new TypeError("Array.prototype.some called on null or undefined");
    }

    if (typeof fun !== "function") {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
},{}],"..\\smooth-dnd\\src\\utils.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _this = undefined;
var getIntersection = exports.getIntersection = function getIntersection(rect1, rect2) {
  return {
    left: Math.max(rect1.left, rect2.left),
    top: Math.max(rect1.top, rect2.top),
    right: Math.min(rect1.right, rect2.right),
    bottom: Math.min(rect1.bottom, rect2.bottom)
  };
};

var getIntersectionOnAxis = exports.getIntersectionOnAxis = function getIntersectionOnAxis(rect1, rect2, axis) {
  if (axis === "x") {
    return {
      left: Math.max(rect1.left, rect2.left),
      top: rect1.top,
      right: Math.min(rect1.right, rect2.right),
      bottom: rect1.bottom
    };
  } else {
    return {
      left: rect1.left,
      top: Math.max(rect1.top, rect2.top),
      right: rect1.right,
      bottom: Math.min(rect1.bottom, rect2.bottom)
    };
  }
};

var getContainerRect = exports.getContainerRect = function getContainerRect(element) {
  var _rect = element.getBoundingClientRect();
  var rect = {
    left: _rect.left,
    right: _rect.right + 10,
    top: _rect.top,
    bottom: _rect.bottom
  };

  if (hasBiggerChild(element, "x") && !isScrollingOrHidden(element, "x")) {
    var width = rect.right - rect.left;
    rect.right = rect.right + element.scrollWidth - width;
  }

  if (hasBiggerChild(element, "y") && !isScrollingOrHidden(element, "y")) {
    var height = rect.bottom - rect.top;
    rect.bottom = rect.bottom + element.scrollHeight - height;
  }

  return rect;
};

var getScrollingAxis = exports.getScrollingAxis = function getScrollingAxis(element) {
  var style = global.getComputedStyle(element);
  var overflow = style["overflow"];
  var general = overflow === "auto" || overflow === "scroll";
  if (general) return "xy";
  var overFlowX = style["overflow-x"];
  var xScroll = overFlowX === "auto" || overFlowX === "scroll";
  var overFlowY = style["overflow-y"];
  var yScroll = overFlowY === "auto" || overFlowY === "scroll";

  return "" + (xScroll ? "x" : "") + (yScroll ? "y" : "") || null;
};

var isScrolling = exports.isScrolling = function isScrolling(element, axis) {
  var style = global.getComputedStyle(element);
  var overflow = style["overflow"];
  var overFlowAxis = style["overflow-" + axis];
  var general = overflow === "auto" || overflow === "scroll";
  var dimensionScroll = overFlowAxis === "auto" || overFlowAxis === "scroll";
  return general || dimensionScroll;
};

var isScrollingOrHidden = exports.isScrollingOrHidden = function isScrollingOrHidden(element, axis) {
  var style = global.getComputedStyle(element);
  var overflow = style["overflow"];
  var overFlowAxis = style["overflow-" + axis];
  var general = overflow === "auto" || overflow === "scroll" || overflow === "hidden";
  var dimensionScroll = overFlowAxis === "auto" || overFlowAxis === "scroll" || overFlowAxis === "hidden";
  return general || dimensionScroll;
};

var hasBiggerChild = exports.hasBiggerChild = function hasBiggerChild(element, axis) {
  if (axis === "x") {
    return element.scrollWidth > element.clientWidth;
  } else {
    return element.scrollHeight > element.clientHeight;
  }
};

var hasScrollBar = exports.hasScrollBar = function hasScrollBar(element, axis) {
  return hasBiggerChild(element, axis) && isScrolling(element, axis);
};

var getVisibleRect = exports.getVisibleRect = function getVisibleRect(element, elementRect) {
  var currentElement = element;
  var rect = elementRect || getContainerRect(element);
  currentElement = element.parentElement;
  while (currentElement) {
    if (hasBiggerChild(currentElement, "x") && isScrollingOrHidden(currentElement, "x")) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), "x");
    }

    if (hasBiggerChild(currentElement, "y") && isScrollingOrHidden(currentElement, "y")) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), "y");
    }

    currentElement = currentElement.parentElement;
  }

  return rect;
};

var listenScrollParent = exports.listenScrollParent = function listenScrollParent(element, clb) {
  var scrollers = [];
  var dispose = function dispose() {
    scrollers.forEach(function (p) {
      p.removeEventListener("scroll", clb);
    });
    global.removeEventListener("scroll", clb);
  };

  setTimeout(function () {
    var currentElement = element;
    while (currentElement) {
      if (isScrolling(currentElement, "x") || isScrolling(currentElement, "y")) {
        currentElement.addEventListener("scroll", clb);
        scrollers.push(currentElement);
      }
      currentElement = currentElement.parentElement;
    }

    global.addEventListener("scroll", clb);
  }, 10);

  return {
    dispose: dispose
  };
};

var hasParent = exports.hasParent = function hasParent(element, parent) {
  var current = element;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};

var getParent = exports.getParent = function getParent(element, selector) {
  var current = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

var hasClass = exports.hasClass = function hasClass(element, cls) {
  return element.className.split(" ").map(function (p) {
    return p;
  }).indexOf(cls) > -1;
};

var addClass = exports.addClass = function addClass(element, cls) {
  if (element) {
    var classes = element.className.split(" ").filter(function (p) {
      return p;
    });
    if (classes.indexOf(cls) === -1) {
      classes.unshift(cls);
      element.className = classes.join(" ");
    }
  }
};

var removeClass = exports.removeClass = function removeClass(element, cls) {
  if (element) {
    var classes = element.className.split(" ").filter(function (p) {
      return p && p !== cls;
    });
    element.className = classes.join(" ");
  }
};

var debounce = exports.debounce = function debounce(fn, delay, immediate) {
  var timer = null;
  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.call.apply(fn, [_this].concat(params));
    } else {
      timer = setTimeout(function () {
        timer = null;
        fn.call.apply(fn, [_this].concat(params));
      }, delay);
    }
  };
};

var removeChildAt = exports.removeChildAt = function removeChildAt(parent, index) {
  return parent.removeChild(parent.children[index]);
};

var addChildAt = exports.addChildAt = function addChildAt(parent, child, index) {
  if (index >= parent.children.lenght) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
};

var isMobile = exports.isMobile = function isMobile() {
  if (typeof window !== 'undefined') {
    if (global.navigator.userAgent.match(/Android/i) || global.navigator.userAgent.match(/webOS/i) || global.navigator.userAgent.match(/iPhone/i) || global.navigator.userAgent.match(/iPad/i) || global.navigator.userAgent.match(/iPod/i) || global.navigator.userAgent.match(/BlackBerry/i) || global.navigator.userAgent.match(/Windows Phone/i)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

var clearSelection = exports.clearSelection = function clearSelection() {
  if (global.getSelection) {
    if (global.getSelection().empty) {
      // Chrome
      global.getSelection().empty();
    } else if (global.getSelection().removeAllRanges) {
      // Firefox
      global.getSelection().removeAllRanges();
    }
  } else if (global.document.selection) {
    // IE?
    global.document.selection.empty();
  }
};
},{}],"..\\smooth-dnd\\src\\constants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var containerInstance = exports.containerInstance = 'smooth-dnd-container-instance';
var containersInDraggable = exports.containersInDraggable = 'smooth-dnd-containers-in-draggable';

var defaultGroupName = exports.defaultGroupName = '@@smooth-dnd-default-group@@';
var wrapperClass = exports.wrapperClass = 'smooth-dnd-draggable-wrapper';
var defaultGrabHandleClass = exports.defaultGrabHandleClass = 'smooth-dnd-default-grap-handle';
var animationClass = exports.animationClass = 'animated';
var translationValue = exports.translationValue = '__smooth_dnd_draggable_translation_value';
var visibilityValue = exports.visibilityValue = '__smooth_dnd_draggable_visibility_value';
var ghostClass = exports.ghostClass = 'smooth-dnd-ghost';

var containerClass = exports.containerClass = 'smooth-dnd-container';

var extraSizeForInsertion = exports.extraSizeForInsertion = 'smooth-dnd-extra-size-for-insertion';
var stretcherElementClass = exports.stretcherElementClass = 'smooth-dnd-stretcher-element';
var stretcherElementInstance = exports.stretcherElementInstance = 'smooth-dnd-stretcher-instance';

var isDraggableDetached = exports.isDraggableDetached = 'smoth-dnd-is-draggable-detached';

var disbaleTouchActions = exports.disbaleTouchActions = 'smooth-dnd-disable-touch-action';
var noUserSelectClass = exports.noUserSelectClass = 'smooth-dnd-no-user-select';

var originalTrasitionDuration = exports.originalTrasitionDuration = "smooth-dnd-original-trasition-duration";
},{}],"..\\smooth-dnd\\src\\styles.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addStyleToHead = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _css;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var verticalWrapperClass = {
	'overflow': 'hidden'
};

var horizontalWrapperClass = {
	'height': '100%',
	'display': 'inline-block',
	'vertical-align': 'top',
	'white-space': 'normal'
};

var css = (_css = {}, _defineProperty(_css, '.' + constants.containerClass, {
	'position': 'relative'
}), _defineProperty(_css, '.' + constants.containerClass + ' *', {
	'box-sizing': 'border-box'
}), _defineProperty(_css, '.' + constants.containerClass + '.horizontal', {
	'white-space': 'nowrap'
}), _defineProperty(_css, '.' + constants.containerClass + '.horizontal > .' + constants.wrapperClass, horizontalWrapperClass), _defineProperty(_css, '.' + constants.containerClass + '.vertical > .' + constants.wrapperClass, verticalWrapperClass), _defineProperty(_css, '.' + constants.wrapperClass, {
	// 'overflow': 'hidden'
}), _defineProperty(_css, '.' + constants.wrapperClass + '.horizontal', horizontalWrapperClass), _defineProperty(_css, '.' + constants.wrapperClass + '.vertical', verticalWrapperClass), _defineProperty(_css, '.' + constants.wrapperClass + '.animated', {
	'transition': 'transform ease'
}), _defineProperty(_css, '.' + constants.ghostClass + ' *', {
	//'perspective': '800px',
	'box-sizing': 'border-box'
}), _defineProperty(_css, '.' + constants.ghostClass + '.animated', {
	'transition': 'all ease-in-out'
}), _defineProperty(_css, '.' + constants.disbaleTouchActions + ' *', {
	'touch-actions': 'none',
	'-ms-touch-actions': 'none'
}), _defineProperty(_css, '.' + constants.noUserSelectClass + ' *', {
	'-webkit-touch-callout': 'none',
	'-webkit-user-select': 'none',
	'-khtml-user-select': 'none',
	'-moz-user-select': 'none',
	'-ms-user-select': 'none',
	'user-select': 'none'
}), _css);

function convertToCssString(css) {
	return Object.keys(css).reduce(function (styleString, propName) {
		var propValue = css[propName];
		if ((typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) === 'object') {
			return '' + styleString + propName + '{' + convertToCssString(propValue) + '}';
		}
		return '' + styleString + propName + ':' + propValue + ';';
	}, '');
}

function addStyleToHead() {
	if (typeof window !== 'undefined') {
		var head = global.document.head || global.document.getElementsByTagName("head")[0];
		var style = global.document.createElement("style");
		var cssString = convertToCssString(css);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = cssString;
		} else {
			style.appendChild(global.document.createTextNode(cssString));
		}

		head.appendChild(style);
	}
}

exports.addStyleToHead = addStyleToHead;
},{"./constants":"..\\smooth-dnd\\src\\constants.js"}],"..\\smooth-dnd\\src\\dragscroller.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var maxSpeed = 1500; // px/s
var minSpeed = 20; // px/s

function addScrollValue(element, axis, value) {
	if (element) {
		if (element !== window) {
			if (axis === 'x') {
				element.scrollLeft += value;
			} else {
				element.scrollTop += value;
			}
		} else {
			if (axis === 'x') {
				element.scrollBy(value, 0);
			} else {
				element.scrollBy(0, value);
			}
		}
	}
}

var createAnimator = function createAnimator(element) {
	var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';

	var isAnimating = false;
	var request = null;
	var startTime = null;
	var direction = null;
	var speed = null;

	function animate(_direction, _speed) {
		direction = _direction;
		speed = _speed;
		isAnimating = true;
		if (isAnimating) {
			start();
		}
	}

	function start() {
		if (request === null) {
			request = requestAnimationFrame(function (timestamp) {
				if (startTime === null) {
					startTime = timestamp;
				}
				var timeDiff = timestamp - startTime;
				startTime = timestamp;
				var distanceDiff = timeDiff / 1000 * speed;
				distanceDiff = direction === 'begin' ? 0 - distanceDiff : distanceDiff;
				addScrollValue(element, axis, distanceDiff);
				request = null;
				start();
			});
		}
	}

	function stop() {
		if (isAnimating) {
			cancelAnimationFrame(request);
			isAnimating = false;
			startTime = null;
			request = null;
		}
	}

	return {
		animate: animate,
		stop: stop
	};
};

function getAutoScrollInfo(position, scrollableInfo) {
	var _scrollableInfo$rect = scrollableInfo.rect,
	    left = _scrollableInfo$rect.left,
	    right = _scrollableInfo$rect.right,
	    top = _scrollableInfo$rect.top,
	    bottom = _scrollableInfo$rect.bottom;
	var x = position.x,
	    y = position.y;

	if (x < left || x > right || y < top || y > bottom) {
		return null;
	}

	var begin = void 0;
	var end = void 0;
	var pos = void 0;
	if (scrollableInfo.axis === 'x') {
		begin = left;
		end = right;
		pos = x;
	} else {
		begin = top;
		end = bottom;
		pos = y;
	}

	var moveDistance = 100;
	if (end - pos < moveDistance) {
		return {
			direction: 'end',
			speedFactor: (moveDistance - (end - pos)) / moveDistance
		};
	} else if (pos - begin < moveDistance) {
		// console.log(pos - begin);
		return {
			direction: 'begin',
			speedFactor: (moveDistance - (pos - begin)) / moveDistance
		};
	}
}

function scrollableInfo(element) {
	var result = {
		element: element,
		rect: (0, _utils.getVisibleRect)(element, element.getBoundingClientRect()),
		descendants: [],
		invalidate: invalidate,
		axis: null,
		dispose: dispose
	};

	function dispose() {
		element.removeEventListener('scroll', invalidate);
	}

	function invalidate() {
		result.rect = (0, _utils.getVisibleRect)(element, element.getBoundingClientRect());
		result.descendants.forEach(function (p) {
			return p.invalidate();
		});
	}

	element.addEventListener('scroll', invalidate);

	return result;
}

function getScrollableElements(containerElements) {
	var scrollables = [];
	var firstDescendentScrollable = null;
	containerElements.forEach(function (el) {
		var current = el;
		firstDescendentScrollable = null;
		while (current) {
			var scrollingAxis = (0, _utils.getScrollingAxis)(current);
			if (scrollingAxis) {
				if (!scrollables.some(function (p) {
					return p.element === current;
				})) {
					var info = scrollableInfo(current);
					if (firstDescendentScrollable) {
						info.descendants.push(firstDescendentScrollable);
					}
					firstDescendentScrollable = info;
					if (scrollingAxis === 'xy') {
						scrollables.push(Object.assign({}, info, { axis: 'x' }));
						scrollables.push(Object.assign({}, info, { axis: 'y' }, { descendants: [] }));
					} else {
						scrollables.push(Object.assign({}, info, { axis: scrollingAxis }));
					}
				}
			}
			current = current.parentElement;
		}
	});
	return scrollables;
}

function getScrollableAnimator(scrollableInfo) {
	return Object.assign(scrollableInfo, createAnimator(scrollableInfo.element, scrollableInfo.axis));
}

function getWindowAnimators() {
	function getWindowRect() {
		return {
			left: 0, right: global.innerWidth, top: 0, bottom: global.innerHeight
		};
	}

	return [Object.assign({ rect: getWindowRect(), axis: 'y' }, createAnimator(global)), Object.assign({ rect: getWindowRect(), axis: 'x' }, createAnimator(global, 'x'))];
}

exports.default = function (containers) {
	var scrollablesInfo = getScrollableElements(containers.map(function (p) {
		return p.element;
	}));
	var animators = [].concat(_toConsumableArray(scrollablesInfo.map(getScrollableAnimator)), _toConsumableArray(getWindowAnimators()));
	return function (_ref) {
		var draggableInfo = _ref.draggableInfo,
		    reset = _ref.reset;

		if (animators.length) {
			if (reset) {
				animators.forEach(function (p) {
					return p.stop();
				});
				scrollablesInfo.forEach(function (p) {
					return p.dispose();
				});
				return null;
			}

			animators.forEach(function (animator) {
				var scrollParams = getAutoScrollInfo(draggableInfo.mousePosition, animator);
				if (scrollParams) {
					animator.animate(scrollParams.direction, scrollParams.speedFactor * maxSpeed);
				} else {
					animator.stop();
				}
			});
		}
	};
	return null;
};
},{"./utils":"..\\smooth-dnd\\src\\utils.js"}],"..\\smooth-dnd\\src\\mediator.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./polyfills');

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _styles = require('./styles');

var _dragscroller = require('./dragscroller');

var _dragscroller2 = _interopRequireDefault(_dragscroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var grabEvents = ['mousedown', 'touchstart'];
var moveEvents = ['mousemove', 'touchmove'];
var releaseEvents = ['mouseup', 'touchend'];

var dragListeningContainers = null;
var grabbedElement = null;
var ghostInfo = null;
var draggableInfo = null;
var containers = [];
var isDragging = false;
var removedElement = null;

var handleDrag = null;
var handleScroll = null;
var sourceContainer = null;
var sourceContainerLockAxis = null;

var isMobile = Utils.isMobile();

function listenEvents() {
  var listen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (typeof window !== 'undefined') {
    if (listen) {
      addGrabListeners();
    } else {
      removeGrabListeners();
    }
  }
}

function addGrabListeners() {
  grabEvents.forEach(function (e) {
    global.document.addEventListener(e, onMouseDown, { passive: false });
  });
}

function removeGrabListeners() {
  grabEvents.forEach(function (e) {
    global.document.removeEventListener(e, onMouseDown, { passive: false });
  });
}

function addMoveListeners() {
  moveEvents.forEach(function (e) {
    global.document.addEventListener(e, onMouseMove, { passive: false });
  });
}

function removeMoveListeners() {
  moveEvents.forEach(function (e) {
    global.document.removeEventListener(e, onMouseMove, { passive: false });
  });
}

function addReleaseListeners() {
  releaseEvents.forEach(function (e) {
    global.document.addEventListener(e, onMouseUp, { passive: false });
  });
}

function removeReleaseListeners() {
  releaseEvents.forEach(function (e) {
    global.document.removeEventListener(e, onMouseUp, { passive: false });
  });
}

function getGhostParent() {
  if (grabbedElement) {
    return grabbedElement.parentElement || global.document.body;
  } else {
    return global.document.body;
  }
}

function getGhostElement(wrapperElement, _ref, container, cursor) {
  var x = _ref.x,
      y = _ref.y;

  var _container$getScale = container.getScale(),
      _container$getScale$s = _container$getScale.scaleX,
      scaleX = _container$getScale$s === undefined ? 1 : _container$getScale$s,
      _container$getScale$s2 = _container$getScale.scaleY,
      scaleY = _container$getScale$s2 === undefined ? 1 : _container$getScale$s2;

  var _wrapperElement$getBo = wrapperElement.getBoundingClientRect(),
      left = _wrapperElement$getBo.left,
      top = _wrapperElement$getBo.top,
      right = _wrapperElement$getBo.right,
      bottom = _wrapperElement$getBo.bottom;

  var midX = left + (right - left) / 2;
  var midY = top + (bottom - top) / 2;
  var ghost = wrapperElement.cloneNode(true);
  ghost.style.zIndex = 1000;
  ghost.style.boxSizing = 'border-box';
  ghost.style.position = 'fixed';
  ghost.style.left = left + 'px';
  ghost.style.top = top + 'px';
  ghost.style.width = right - left + 'px';
  ghost.style.height = bottom - top + 'px';
  ghost.style.overflow = 'visible';
  ghost.style.transition = null;
  ghost.style.removeProperty('transition');
  ghost.style.pointerEvents = 'none';
  // ghost.style.cursor = cursor;
  setTimeout(function () {
    if (container.getOptions().dragClass) {
      Utils.addClass(ghost.firstElementChild, container.getOptions().dragClass);
    }
  });
  Utils.addClass(ghost, container.getOptions().orientation);
  Utils.addClass(ghost, constants.ghostClass);

  return {
    ghost: ghost,
    centerDelta: { x: midX - x, y: midY - y },
    positionDelta: { left: left - x, top: top - y }
  };
}

function getDraggableInfo(draggableElement) {
  var container = containers.filter(function (p) {
    return draggableElement.parentElement === p.element;
  })[0];
  var draggableIndex = container.draggables.indexOf(draggableElement);
  return {
    container: container,
    element: draggableElement,
    elementIndex: draggableIndex,
    payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload(draggableIndex) : undefined,
    targetElement: null,
    position: { x: 0, y: 0 },
    groupName: container.getOptions().groupName
  };
}

function handleDropAnimation(callback) {
  function endDrop() {
    Utils.removeClass(ghostInfo.ghost, 'animated');
    ghostInfo.ghost.style.transitionDuration = null;
    getGhostParent().removeChild(ghostInfo.ghost);
    callback();
  }

  function animateGhostToPosition(_ref2, duration, dropClass) {
    var top = _ref2.top,
        left = _ref2.left;

    Utils.addClass(ghostInfo.ghost, 'animated');
    if (dropClass) {
      Utils.addClass(ghostInfo.ghost.firstElementChild, dropClass);
    }
    ghostInfo.ghost.style.transitionDuration = duration + 'ms';
    ghostInfo.ghost.style.left = left + 'px';
    ghostInfo.ghost.style.top = top + 'px';
    setTimeout(function () {
      endDrop();
    }, duration + 20);
  }

  function shouldAnimateDrop(options) {
    return options.shouldAnimateDrop ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload) : true;
  }

  if (draggableInfo.targetElement) {
    var container = containers.filter(function (p) {
      return p.element === draggableInfo.targetElement;
    })[0];
    if (shouldAnimateDrop(container.getOptions())) {
      var dragResult = container.getDragResult();
      animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2), container.getOptions().dropClass);
    } else {
      endDrop();
    }
  } else {
    var _container = containers.filter(function (p) {
      return p === draggableInfo.container;
    })[0];
    if (_container.getOptions().behaviour === 'move' && _container.getDragResult()) {
      var _container$getDragRes = _container.getDragResult(),
          removedIndex = _container$getDragRes.removedIndex,
          elementSize = _container$getDragRes.elementSize;

      var layout = _container.layout;
      // drag ghost to back
      _container.getTranslateCalculator({
        dragResult: {
          removedIndex: removedIndex,
          addedIndex: removedIndex,
          elementSize: elementSize
        }
      });
      var prevDraggableEnd = removedIndex > 0 ? layout.getBeginEnd(_container.draggables[removedIndex - 1]).end : layout.getBeginEndOfContainer().begin;
      animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), _container.getOptions().animationDuration, _container.getOptions().dropClass);
    } else {
      Utils.addClass(ghostInfo.ghost, 'animated');
      ghostInfo.ghost.style.transitionDuration = _container.getOptions().animationDuration + 'ms';
      ghostInfo.ghost.style.opacity = '0';
      ghostInfo.ghost.style.transform = 'scale(0.90)';
      setTimeout(function () {
        endDrop();
      }, _container.getOptions().animationDuration);
    }
  }
}

var handleDragStartConditions = function handleDragStartConditions() {
  var startEvent = void 0;
  var delay = void 0;
  var clb = void 0;
  var timer = null;
  var moveThreshold = 1;
  var maxMoveInDelay = 5;

  function onMove(event) {
    var _getPointerEvent = getPointerEvent(event),
        currentX = _getPointerEvent.clientX,
        currentY = _getPointerEvent.clientY;

    if (!delay) {
      if (Math.abs(startEvent.clientX - currentX) > moveThreshold || Math.abs(startEvent.clientY - currentY) > moveThreshold) {
        return callCallback();
      }
    } else {
      if (Math.abs(startEvent.clientX - currentX) > maxMoveInDelay || Math.abs(startEvent.clientY - currentY) > maxMoveInDelay) {
        deregisterEvent();
      }
    }
  }

  function onUp() {
    deregisterEvent();
  }
  function onHTMLDrag() {
    deregisterEvent();
  }

  function registerEvents() {
    if (delay) {
      timer = setTimeout(callCallback, delay);
    }

    moveEvents.forEach(function (e) {
      return global.document.addEventListener(e, onMove);
    }, {
      passive: false
    });
    releaseEvents.forEach(function (e) {
      return global.document.addEventListener(e, onUp);
    }, {
      passive: false
    });
    global.document.addEventListener('drag', onHTMLDrag, {
      passive: false
    });
  }

  function deregisterEvent() {
    clearTimeout(timer);
    moveEvents.forEach(function (e) {
      return global.document.removeEventListener(e, onMove);
    }, {
      passive: false
    });
    releaseEvents.forEach(function (e) {
      return global.document.removeEventListener(e, onUp);
    }, {
      passive: false
    });
    global.document.removeEventListener('drag', onHTMLDrag, {
      passive: false
    });
  }

  function callCallback() {
    clearTimeout(timer);
    deregisterEvent();
    clb();
  }

  return function (_startEvent, _delay, _clb) {
    startEvent = getPointerEvent(_startEvent);
    delay = typeof _delay === 'number' ? _delay : isMobile ? 200 : 0;
    clb = _clb;

    registerEvents();
  };
}();

function onMouseDown(event) {
  var e = getPointerEvent(event);
  if (!isDragging && (e.button === undefined || e.button === 0)) {
    grabbedElement = Utils.getParent(e.target, '.' + constants.wrapperClass);
    if (grabbedElement) {
      var containerElement = Utils.getParent(grabbedElement, '.' + constants.containerClass);
      var container = containers.filter(function (p) {
        return p.element === containerElement;
      })[0];
      var dragHandleSelector = container.getOptions().dragHandleSelector;
      var nonDragAreaSelector = container.getOptions().nonDragAreaSelector;

      var startDrag = true;
      if (dragHandleSelector && !Utils.getParent(e.target, dragHandleSelector)) {
        startDrag = false;
      }

      if (nonDragAreaSelector && Utils.getParent(e.target, nonDragAreaSelector)) {
        startDrag = false;
      }

      if (startDrag) {
        handleDragStartConditions(e, container.getOptions().dragBeginDelay, function () {
          Utils.clearSelection();
          initiateDrag(e);
          addMoveListeners();
          addReleaseListeners();
        });
      }
    }
  }
}

function onMouseUp() {
  removeMoveListeners();
  removeReleaseListeners();
  handleScroll({ reset: true });
  if (draggableInfo) {
    handleDropAnimation(function () {
      Utils.removeClass(global.document.body, constants.disbaleTouchActions);
      Utils.removeClass(global.document.body, constants.noUserSelectClass);
      fireOnDragStartEnd(false);
      (dragListeningContainers || []).forEach(function (p) {
        p.handleDrop(draggableInfo);
      });

      dragListeningContainers = null;
      grabbedElement = null;
      ghostInfo = null;
      draggableInfo = null;
      isDragging = false;
      sourceContainer = null;
      sourceContainerLockAxis = null;
      handleDrag = null;
    });
  }
}

function getPointerEvent(e) {
  return e.touches ? e.touches[0] : e;
}

function dragHandler(dragListeningContainers) {
  var targetContainers = dragListeningContainers;
  return function (draggableInfo) {
    var containerBoxChanged = false;
    targetContainers.forEach(function (p) {
      var dragResult = p.handleDrag(draggableInfo);
      containerBoxChanged |= dragResult.containerBoxChanged || false;
      dragResult.containerBoxChanged = false;
    });
    handleScroll({ draggableInfo: draggableInfo });

    if (containerBoxChanged) {
      containerBoxChanged = false;
      setTimeout(function () {
        containers.forEach(function (p) {
          p.layout.invalidateRects();
          p.onTranslated();
        });
      }, 10);
    }
  };
}

function getScrollHandler(container, dragListeningContainers) {
  if (container.getOptions().autoScrollEnabled) {
    return (0, _dragscroller2.default)(dragListeningContainers);
  } else {
    return function () {
      return null;
    };
  }
}

function fireOnDragStartEnd(isStart) {
  containers.forEach(function (p) {
    var fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;
    if (fn) {
      var options = {
        isSource: p === draggableInfo.container,
        payload: draggableInfo.payload
      };
      if (p.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
        options.willAcceptDrop = true;
      } else {
        options.willAcceptDrop = false;
      }
      fn(options);
    }
  });
}

function initiateDrag(position, cursor) {
  isDragging = true;
  var container = containers.filter(function (p) {
    return grabbedElement.parentElement === p.element;
  })[0];
  container.setDraggables();
  sourceContainer = container;
  sourceContainerLockAxis = container.getOptions().lockAxis ? container.getOptions().lockAxis.toLowerCase() : null;

  draggableInfo = getDraggableInfo(grabbedElement);
  ghostInfo = getGhostElement(grabbedElement, { x: position.clientX, y: position.clientY }, draggableInfo.container, cursor);
  draggableInfo.position = {
    x: position.clientX + ghostInfo.centerDelta.x,
    y: position.clientY + ghostInfo.centerDelta.y
  };
  draggableInfo.mousePosition = {
    x: position.clientX,
    y: position.clientY
  };

  Utils.addClass(global.document.body, constants.disbaleTouchActions);
  Utils.addClass(global.document.body, constants.noUserSelectClass);

  dragListeningContainers = containers.filter(function (p) {
    return p.isDragRelevant(container, draggableInfo.payload);
  });
  handleDrag = dragHandler(dragListeningContainers);
  if (handleScroll) {
    handleScroll({ reset: true });
  }
  handleScroll = getScrollHandler(container, dragListeningContainers);
  dragListeningContainers.forEach(function (p) {
    return p.prepareDrag(p, dragListeningContainers);
  });
  fireOnDragStartEnd(true);
  handleDrag(draggableInfo);
  getGhostParent().appendChild(ghostInfo.ghost);
}

function onMouseMove(event) {
  event.preventDefault();
  var e = getPointerEvent(event);
  if (!draggableInfo) {
    initiateDrag(e);
  } else {
    // just update ghost position && draggableInfo position
    if (sourceContainerLockAxis) {
      if (sourceContainerLockAxis === 'y') {
        ghostInfo.ghost.style.top = e.clientY + ghostInfo.positionDelta.top + 'px';
        draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
        draggableInfo.mousePosition.y = e.clientY;
      } else if (sourceContainerLockAxis === 'x') {
        ghostInfo.ghost.style.left = e.clientX + ghostInfo.positionDelta.left + 'px';
        draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
        draggableInfo.mousePosition.x = e.clientX;
      }
    } else {
      ghostInfo.ghost.style.left = e.clientX + ghostInfo.positionDelta.left + 'px';
      ghostInfo.ghost.style.top = e.clientY + ghostInfo.positionDelta.top + 'px';
      draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
      draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
      draggableInfo.mousePosition.x = e.clientX;
      draggableInfo.mousePosition.y = e.clientY;
    }

    handleDrag(draggableInfo);
  }
}

function Mediator() {
  return {
    register: function register(container) {
      containers.push(container);
      if (containers.length === 1) {
        listenEvents();
      }
    },
    unregister: function unregister(container) {
      containers.splice(containers.indexOf(container), 1);
      if (containers.length === 0) {
        listenEvents(false);
      }
    }
  };
}

(0, _styles.addStyleToHead)();

exports.default = Mediator();
},{"./polyfills":"..\\smooth-dnd\\src\\polyfills.js","./utils":"..\\smooth-dnd\\src\\utils.js","./constants":"..\\smooth-dnd\\src\\constants.js","./styles":"..\\smooth-dnd\\src\\styles.js","./dragscroller":"..\\smooth-dnd\\src\\dragscroller.js"}],"..\\smooth-dnd\\src\\layoutManager.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = layoutManager;

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var horizontalMap = {
	size: 'offsetWidth',
	distanceToParent: 'offsetLeft',
	translate: 'transform',
	begin: 'left',
	end: 'right',
	dragPosition: 'x',
	scrollSize: 'scrollWidth',
	offsetSize: 'offsetWidth',
	scrollValue: 'scrollLeft',
	scale: 'scaleX',
	setSize: 'width',
	setters: {
		'translate': function translate(val) {
			return 'translate3d(' + val + 'px, 0, 0)';
		}
	}
};

var verticalMap = {
	size: 'offsetHeight',
	distanceToParent: 'offsetTop',
	translate: 'transform',
	begin: 'top',
	end: 'bottom',
	dragPosition: 'y',
	scrollSize: 'scrollHeight',
	offsetSize: 'offsetHeight',
	scrollValue: 'scrollTop',
	scale: 'scaleY',
	setSize: 'height',
	setters: {
		'translate': function translate(val) {
			return 'translate3d(0,' + val + 'px, 0)';
		}
	}
};

function orientationDependentProps(map) {
	function get(obj, prop) {
		var mappedProp = map[prop];
		return obj[mappedProp || prop];
	}

	function set(obj, prop, value) {
		requestAnimationFrame(function () {
			obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
		});
	}

	return { get: get, set: set };
}

function layoutManager(containerElement, orientation, _animationDuration) {
	containerElement[_constants.extraSizeForInsertion] = 0;
	var animationDuration = _animationDuration;
	var map = orientation === 'horizontal' ? horizontalMap : verticalMap;
	var propMapper = orientationDependentProps(map);
	var values = {
		translation: 0
	};
	var registeredScrollListener = null;

	global.addEventListener('resize', function () {
		invalidateContainerRectangles(containerElement);
		// invalidateContainerScale(containerElement);
	});

	setTimeout(function () {
		invalidate();
	}, 10);
	// invalidate();

	var scrollListener = Utils.listenScrollParent(containerElement, function () {
		invalidateContainerRectangles(containerElement);
		registeredScrollListener && registeredScrollListener();
	});
	function invalidate() {
		invalidateContainerRectangles(containerElement);
		invalidateContainerScale(containerElement);
	}

	var visibleRect = void 0;
	function invalidateContainerRectangles(containerElement) {
		values.rect = Utils.getContainerRect(containerElement);
		values.visibleRect = Utils.getVisibleRect(containerElement, values.rect);
	}

	function invalidateContainerScale(containerElement) {
		var rect = containerElement.getBoundingClientRect();
		values.scaleX = containerElement.offsetWidth ? (rect.right - rect.left) / containerElement.offsetWidth : 1;
		values.scaleY = containerElement.offsetHeight ? (rect.bottom - rect.top) / containerElement.offsetHeight : 1;
	}

	function getContainerRectangles() {
		return {
			rect: values.rect,
			visibleRect: values.visibleRect
		};
	}

	function getBeginEndOfDOMRect(rect) {
		return {
			begin: propMapper.get(rect, 'begin'),
			end: propMapper.get(rect, 'end')
		};
	}

	function getBeginEndOfContainer() {
		var begin = propMapper.get(values.rect, 'begin') + values.translation;
		var end = propMapper.get(values.rect, 'end') + values.translation;
		return { begin: begin, end: end };
	}

	function getBeginEndOfContainerVisibleRect() {
		var begin = propMapper.get(values.visibleRect, 'begin') + values.translation;
		var end = propMapper.get(values.visibleRect, 'end') + values.translation;
		return { begin: begin, end: end };
	}

	function getContainerScale() {
		return { scaleX: values.scaleX, scaleY: values.scaleY };
	}

	function getSize(element) {
		return propMapper.get(element, 'size') * propMapper.get(values, 'scale');
	}

	function getDistanceToOffsetParent(element) {
		var distance = propMapper.get(element, 'distanceToParent') + (element[_constants.translationValue] || 0);
		return distance * propMapper.get(values, 'scale');
	}

	function getBeginEnd(element) {
		var begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, 'begin') + values.translation) - propMapper.get(containerElement, 'scrollValue');
		return {
			begin: begin,
			end: begin + getSize(element) * propMapper.get(values, 'scale')
		};
	}

	function setSize(element, size) {
		propMapper.set(element, 'setSize', size);
	}

	function getAxisValue(position) {
		return propMapper.get(position, 'dragPosition');
	}

	function updateDescendantContainerRects(container) {
		container.layout.invalidateRects();
		container.onTranslated();
		if (container.getChildContainers()) {
			container.getChildContainers().forEach(function (p) {
				return updateDescendantContainerRects(p);
			});
		}
	}

	function setTranslation(element, translation) {
		if (!translation) {
			element.style.removeProperty('transform');
		} else {
			propMapper.set(element.style, 'translate', translation);
		}
		element[_constants.translationValue] = translation;

		if (element[_constants.containersInDraggable]) {
			setTimeout(function () {
				element[_constants.containersInDraggable].forEach(function (p) {
					updateDescendantContainerRects(p);
				});
			}, animationDuration + 20);
		}
	}

	function getTranslation(element) {
		return element[_constants.translationValue];
	}

	function setVisibility(element, isVisible) {
		if (element[_constants.visibilityValue] === undefined || element[_constants.visibilityValue] !== isVisible) {
			if (isVisible) {
				element.style.removeProperty('visibility');
			} else {
				element.style.visibility = 'hidden';
			}
			element[_constants.visibilityValue] = isVisible;
		}
	}

	function isVisible(element) {
		return element[_constants.visibilityValue] === undefined || element[_constants.visibilityValue];
	}

	function isInVisibleRect(x, y) {
		var _values$visibleRect = values.visibleRect,
		    left = _values$visibleRect.left,
		    top = _values$visibleRect.top,
		    right = _values$visibleRect.right,
		    bottom = _values$visibleRect.bottom;

		// if there is no wrapper in rect size will be 0 and wont accept any drop
		// so make sure at least there is 30px difference

		if (bottom - top < 2) {
			bottom = top + 30;
		}
		var containerRect = values.rect;
		if (orientation === 'vertical') {
			return x > containerRect.left && x < containerRect.right && y > top && y < bottom;
		} else {
			return x > left && x < right && y > containerRect.top && y < containerRect.bottom;
		}
	}

	function setScrollListener(callback) {
		registeredScrollListener = callback;
	}

	function getTopLeftOfElementBegin(begin) {
		var top = 0;
		var left = 0;
		if (orientation === 'horizontal') {
			left = begin;
			top = values.rect.top;
		} else {
			left = values.rect.left;
			top = begin;
		}

		return {
			top: top, left: left
		};
	}

	function getScrollSize(element) {
		return propMapper.get(element, 'scrollSize');
	}

	function getScrollValue(element) {
		return propMapper.get(element, 'scrollValue');
	}

	function setScrollValue(element, val) {
		return propMapper.set(element, 'scrollValue', val);
	}

	function dispose() {
		if (scrollListener) {
			scrollListener.dispose();
		}

		if (visibleRect) {
			visibleRect.parentNode.removeChild(visibleRect);
			visibleRect = null;
		}
	}

	function getPosition(position) {
		return isInVisibleRect(position.x, position.y) ? getAxisValue(position) : null;
	}

	function invalidateRects() {
		invalidateContainerRectangles(containerElement);
	}

	return {
		getSize: getSize,
		//getDistanceToContainerBegining,
		getContainerRectangles: getContainerRectangles,
		getBeginEndOfDOMRect: getBeginEndOfDOMRect,
		getBeginEndOfContainer: getBeginEndOfContainer,
		getBeginEndOfContainerVisibleRect: getBeginEndOfContainerVisibleRect,
		getBeginEnd: getBeginEnd,
		getAxisValue: getAxisValue,
		setTranslation: setTranslation,
		getTranslation: getTranslation,
		setVisibility: setVisibility,
		isVisible: isVisible,
		isInVisibleRect: isInVisibleRect,
		dispose: dispose,
		getContainerScale: getContainerScale,
		setScrollListener: setScrollListener,
		setSize: setSize,
		getTopLeftOfElementBegin: getTopLeftOfElementBegin,
		getScrollSize: getScrollSize,
		getScrollValue: getScrollValue,
		setScrollValue: setScrollValue,
		invalidate: invalidate,
		invalidateRects: invalidateRects,
		getPosition: getPosition
	};
}
},{"./utils":"..\\smooth-dnd\\src\\utils.js","./constants":"..\\smooth-dnd\\src\\constants.js"}],"..\\smooth-dnd\\src\\dropHandlers.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domDropHandler = domDropHandler;
exports.reactDropHandler = reactDropHandler;

var _utils = require('./utils');

var _constants = require('./constants');

function domDropHandler(_ref) {
	var element = _ref.element,
	    draggables = _ref.draggables,
	    layout = _ref.layout,
	    options = _ref.options;

	return function (dropResult, onDrop) {
		// const { removedIndex, addedIndex, droppedElement } = dropResult;
		// let removedWrapper = null;
		// if (removedIndex !== null) {
		// 	removedWrapper = removeChildAt(element, removedIndex);
		// 	draggables.splice(removedIndex, 1);
		// }

		// if (addedIndex !== null) {
		// 	const wrapper = removedWrapper || droppedElement;
		// 	wrapper[containersInDraggable] = [];
		// 	addChildAt(element, wrapper, addedIndex);			
		// }

		if (onDrop) {
			onDrop(dropResult);
		}
	};
}

function reactDropHandler() {
	var handler = function handler(_ref2) {
		var element = _ref2.element,
		    draggables = _ref2.draggables,
		    layout = _ref2.layout,
		    options = _ref2.options;

		return function (dropResult, onDrop) {
			if (onDrop) {
				onDrop(dropResult);
			}
		};
	};

	return {
		handler: handler
	};
}
},{"./utils":"..\\smooth-dnd\\src\\utils.js","./constants":"..\\smooth-dnd\\src\\constants.js"}],"..\\smooth-dnd\\src\\container.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediator = require('./mediator');

var _mediator2 = _interopRequireDefault(_mediator);

var _layoutManager = require('./layoutManager');

var _layoutManager2 = _interopRequireDefault(_layoutManager);

var _utils = require('./utils');

var _dropHandlers = require('./dropHandlers');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  groupName: null,
  behaviour: 'move', // move | copy
  orientation: 'vertical', // vertical | horizontal
  getChildPayload: null,
  animationDuration: 250,
  autoScrollEnabled: true,
  shouldAcceptDrop: null,
  shouldAnimateDrop: null
};

function setAnimation(element, add, animationDuration) {
  if (add) {
    (0, _utils.addClass)(element, _constants.animationClass);
    element[_constants.originalTrasitionDuration] = element.style.getPropertyValue('transition-duration');
    element.style.transitionDuration = animationDuration + 'ms';
  } else {
    (0, _utils.removeClass)(element, _constants.animationClass);
    element.style.removeProperty('transition-duration');
    if (element[_constants.originalTrasitionDuration]) {
      element.style.setProperty('transition-duration', element[_constants.originalTrasitionDuration]);
      element[_constants.originalTrasitionDuration] = null;
    }
  }
}

function getContainer(element) {
  return element ? element[_constants.containerInstance] : null;
}

function initOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

  return Object.assign({}, defaultOptions, props);
}

function isDragRelevant(_ref) {
  var element = _ref.element,
      options = _ref.options;

  return function (sourceContainer, payload) {
    if (options.shouldAcceptDrop) {
      return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
    }
    var sourceOptions = sourceContainer.getOptions();
    if (options.behaviour === 'copy') return false;

    var parentWrapper = (0, _utils.getParent)(element, '.' + _constants.wrapperClass);
    if (parentWrapper === sourceContainer.element) {
      return false;
    }

    if (sourceContainer.element === element) return true;
    if (sourceOptions.groupName && sourceOptions.groupName === options.groupName) return true;

    return false;
  };
}

function wrapChild(child) {
  if (SmoothDnD.wrapChild) {
    return SmoothDnD.wrapChild(child);
  }
  // const div = global.document.createElement('div');
  // div.className = `${wrapperClass}`;
  // child.parentElement.insertBefore(div, child);
  // div.appendChild(child);
  (0, _utils.addClass)(child, _constants.wrapperClass);
  return child;
}

function wrapChildren(element) {
  var draggables = [];
  Array.prototype.map.call(element.children, function (child) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      var wrapper = child;
      if (!(0, _utils.hasClass)(child, _constants.wrapperClass)) {
        wrapper = wrapChild(child);
      }
      wrapper[_constants.containersInDraggable] = [];
      wrapper[_constants.translationValue] = 0;
      draggables.push(wrapper);
    } else {
      element.removeChild(child);
    }
  });
  return draggables;
}

function unwrapChildren(element) {
  // Array.prototype.map.call(element.children, child => {
  //   if (child.nodeType === Node.ELEMENT_NODE) {
  //     let wrapper = child;
  //     if (hasClass(child, wrapperClass)) {
  //       element.insertBefore(wrapper, wrapChild.firstElementChild);
  //       element.removeChild(wrapper);
  //     }
  //   }
  // });
}

function findDraggebleAtPos(_ref2) {
  var layout = _ref2.layout;

  var find = function find(draggables, pos, startIndex, endIndex) {
    var withRespectToMiddlePoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (endIndex < startIndex) {
      return startIndex;
    }
    // binary serach draggable
    if (startIndex === endIndex) {
      var _layout$getBeginEnd = layout.getBeginEnd(draggables[startIndex]),
          begin = _layout$getBeginEnd.begin,
          end = _layout$getBeginEnd.end;
      // mouse pos is inside draggable
      // now decide which index to return


      if (pos > begin && pos <= end) {
        if (withRespectToMiddlePoints) {
          return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
        } else {
          return startIndex;
        }
      } else {
        return null;
      }
    } else {
      var middleIndex = Math.floor((endIndex + startIndex) / 2);

      var _layout$getBeginEnd2 = layout.getBeginEnd(draggables[middleIndex]),
          _begin = _layout$getBeginEnd2.begin,
          _end = _layout$getBeginEnd2.end;

      if (pos < _begin) {
        return find(draggables, pos, startIndex, middleIndex - 1, withRespectToMiddlePoints);
      } else if (pos > _end) {
        return find(draggables, pos, middleIndex + 1, endIndex, withRespectToMiddlePoints);
      } else {
        if (withRespectToMiddlePoints) {
          return pos < (_end + _begin) / 2 ? middleIndex : middleIndex + 1;
        } else {
          return middleIndex;
        }
      }
    }
  };

  return function (draggables, pos) {
    var withRespectToMiddlePoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return find(draggables, pos, 0, draggables.length - 1, withRespectToMiddlePoints);
  };
}

function resetDraggables(_ref3) {
  var element = _ref3.element,
      draggables = _ref3.draggables,
      layout = _ref3.layout,
      options = _ref3.options;

  return function () {
    draggables.forEach(function (p) {
      setAnimation(p, false);
      layout.setTranslation(p, 0);
      layout.setVisibility(p, true);
      p[_constants.containersInDraggable] = [];
    });

    if (element[_constants.stretcherElementInstance]) {
      element[_constants.stretcherElementInstance].parentNode.removeChild(element[_constants.stretcherElementInstance]);
      element[_constants.stretcherElementInstance] = null;
    }
  };
}

function setTargetContainer(draggableInfo, element) {
  var set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (element && set) {
    draggableInfo.targetElement = element;
  } else {
    if (draggableInfo.targetElement === element) {
      draggableInfo.targetElement = null;
    }
  }
}

function handleDrop(_ref4) {
  var element = _ref4.element,
      draggables = _ref4.draggables,
      layout = _ref4.layout,
      options = _ref4.options;

  var draggablesReset = resetDraggables({ element: element, draggables: draggables, layout: layout, options: options });
  var dropHandler = (SmoothDnD.dropHandler || _dropHandlers.domDropHandler)({ element: element, draggables: draggables, layout: layout, options: options });
  return function (draggableInfo, _ref5) {
    var addedIndex = _ref5.addedIndex,
        removedIndex = _ref5.removedIndex;

    draggablesReset();
    // if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()
    if (draggableInfo.targetElement) {
      var actualAddIndex = addedIndex !== null ? removedIndex !== null && removedIndex < addedIndex ? addedIndex - 1 : addedIndex : null;
      var dropHandlerParams = {
        removedIndex: removedIndex,
        addedIndex: actualAddIndex,
        payload: draggableInfo.payload,
        droppedElement: draggableInfo.element
      };
      dropHandler(dropHandlerParams, options.onDrop);
    }
  };
}

function getContainerProps(element, initialOptions) {
  var options = initOptions(initialOptions);
  var draggables = wrapChildren(element, options.orientation, options.animationDuration);
  // set flex classes before layout is inited for scroll listener
  (0, _utils.addClass)(element, _constants.containerClass + ' ' + options.orientation);
  var layout = (0, _layoutManager2.default)(element, options.orientation, options.animationDuration);
  return {
    element: element,
    draggables: draggables,
    options: options,
    layout: layout
  };
}

function getRelaventParentContainer(container, relevantContainers) {
  var current = container.element;
  while (current) {
    var containerOfParentElement = getContainer(current.parentElement);
    if (containerOfParentElement && relevantContainers.indexOf(containerOfParentElement) > -1) {
      return {
        container: containerOfParentElement,
        draggable: current
      };
    }
    current = current.parentElement;
  }

  return null;
}

function registerToParentContainer(container, relevantContainers) {
  var parentInfo = getRelaventParentContainer(container, relevantContainers);
  if (parentInfo) {
    parentInfo.container.getChildContainers().push(container);
    container.setParentContainer(parentInfo.container);
    //current should be draggable
    parentInfo.draggable[_constants.containersInDraggable].push(container);
  }
}

function getRemovedItem(_ref6) {
  var draggables = _ref6.draggables,
      element = _ref6.element,
      options = _ref6.options;

  var prevRemovedIndex = null;
  return function (_ref7) {
    var draggableInfo = _ref7.draggableInfo,
        dragResult = _ref7.dragResult;

    var removedIndex = prevRemovedIndex;
    if (prevRemovedIndex == null && draggableInfo.container.element === element && options.behaviour !== 'copy') {
      removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
    }

    return { removedIndex: removedIndex };
  };
}

function setRemovedItemVisibilty(_ref8) {
  var draggables = _ref8.draggables,
      layout = _ref8.layout;

  return function (_ref9) {
    var draggableInfo = _ref9.draggableInfo,
        dragResult = _ref9.dragResult;

    if (dragResult.removedIndex !== null) {
      layout.setVisibility(draggables[dragResult.removedIndex], false);
    }
  };
}

function getPosition(_ref10) {
  var element = _ref10.element,
      layout = _ref10.layout;

  return function (_ref11) {
    var draggableInfo = _ref11.draggableInfo;

    return {
      pos: !getContainer(element).isPosInChildContainer() ? layout.getPosition(draggableInfo.position) : null
    };
  };
}

function notifyParentOnPositionCapture(_ref12) {
  var element = _ref12.element;

  var isCaptured = false;
  return function (_ref13) {
    var draggableInfo = _ref13.draggableInfo,
        dragResult = _ref13.dragResult;

    if (getContainer(element).getParentContainer() && isCaptured !== (dragResult.pos !== null)) {
      isCaptured = dragResult.pos !== null;
      getContainer(element).getParentContainer().onChildPositionCaptured(isCaptured);
    }
  };
}

function getElementSize(_ref14) {
  var layout = _ref14.layout;

  var elementSize = null;
  return function (_ref15) {
    var draggableInfo = _ref15.draggableInfo,
        dragResult = _ref15.dragResult;

    if (dragResult.pos === null) {
      return elementSize = null;
    } else {
      elementSize = elementSize || layout.getSize(draggableInfo.element);
    }
    return { elementSize: elementSize };
  };
}

function handleTargetContainer(_ref16) {
  var element = _ref16.element;

  return function (_ref17) {
    var draggableInfo = _ref17.draggableInfo,
        dragResult = _ref17.dragResult;

    setTargetContainer(draggableInfo, element, !!dragResult.pos);
  };
}

function getDragInsertionIndex(_ref18) {
  var draggables = _ref18.draggables,
      layout = _ref18.layout;

  var findDraggable = findDraggebleAtPos({ layout: layout });
  return function (_ref19) {
    var _ref19$dragResult = _ref19.dragResult,
        shadowBeginEnd = _ref19$dragResult.shadowBeginEnd,
        pos = _ref19$dragResult.pos;

    if (!shadowBeginEnd) {
      var index = findDraggable(draggables, pos, true);
      return index !== null ? index : draggables.length;
    } else {
      if (shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos && shadowBeginEnd.end >= pos) {
        // position inside ghost
        return null;
      }
    }

    if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
      return findDraggable(draggables, pos);
    } else if (pos > shadowBeginEnd.end) {
      return findDraggable(draggables, pos) + 1;
    } else {
      return draggables.length;
    }
  };
}

function getDragInsertionIndexForDropZone(_ref20) {
  var draggables = _ref20.draggables,
      layout = _ref20.layout;

  return function (_ref21) {
    var pos = _ref21.dragResult.pos;

    return pos !== null ? { addedIndex: 0 } : { addedIndex: null };
  };
}

function getShadowBeginEndForDropZone(_ref22) {
  var draggables = _ref22.draggables,
      layout = _ref22.layout;

  var prevAddedIndex = null;
  return function (_ref23) {
    var addedIndex = _ref23.dragResult.addedIndex;

    if (addedIndex !== prevAddedIndex) {
      prevAddedIndex = addedIndex;

      var _layout$getBeginEndOf = layout.getBeginEndOfContainer(),
          begin = _layout$getBeginEndOf.begin,
          end = _layout$getBeginEndOf.end;

      return {
        shadowBeginEnd: {
          rect: layout.getTopLeftOfElementBegin(begin, end)
        }
      };
    }
  };
}

function invalidateShadowBeginEndIfNeeded(params) {
  var shadowBoundsGetter = getShadowBeginEnd(params);
  return function (_ref24) {
    var draggableInfo = _ref24.draggableInfo,
        dragResult = _ref24.dragResult;

    if (draggableInfo.invalidateShadow) {
      return shadowBoundsGetter({ draggableInfo: draggableInfo, dragResult: dragResult });
    }
    return null;
  };
}

function getNextAddedIndex(params) {
  var getIndexForPos = getDragInsertionIndex(params);
  return function (_ref25) {
    var dragResult = _ref25.dragResult;

    var index = null;
    if (dragResult.pos !== null) {
      index = getIndexForPos({ dragResult: dragResult });
      if (index === null) {
        index = dragResult.addedIndex;
      }
    }
    return {
      addedIndex: index
    };
  };
}

function resetShadowAdjustment() {
  var lastAddedIndex = null;
  return function (_ref26) {
    var _ref26$dragResult = _ref26.dragResult,
        addedIndex = _ref26$dragResult.addedIndex,
        shadowBeginEnd = _ref26$dragResult.shadowBeginEnd;

    if (addedIndex !== lastAddedIndex && lastAddedIndex !== null && shadowBeginEnd) {
      shadowBeginEnd.beginAdjustment = 0;
    }
    lastAddedIndex = addedIndex;
  };
}

function handleInsertionSizeChange(_ref27) {
  var element = _ref27.element,
      draggables = _ref27.draggables,
      layout = _ref27.layout,
      options = _ref27.options;

  var strectherElement = null;
  return function (_ref28) {
    var _ref28$dragResult = _ref28.dragResult,
        addedIndex = _ref28$dragResult.addedIndex,
        removedIndex = _ref28$dragResult.removedIndex,
        elementSize = _ref28$dragResult.elementSize;

    if (removedIndex === null) {
      if (addedIndex !== null) {
        if (!strectherElement) {
          var containerBeginEnd = layout.getBeginEndOfContainer();
          containerBeginEnd.end = containerBeginEnd.begin + layout.getSize(element);
          var hasScrollBar = layout.getScrollSize(element) > layout.getSize(element);
          var containerEnd = hasScrollBar ? containerBeginEnd.begin + layout.getScrollSize(element) - layout.getScrollValue(element) : containerBeginEnd.end;
          var lastDraggableEnd = draggables.length > 0 ? layout.getBeginEnd(draggables[draggables.length - 1]).end - draggables[draggables.length - 1][_constants.translationValue] : containerBeginEnd.begin;
          if (lastDraggableEnd + elementSize > containerEnd) {
            strectherElement = global.document.createElement('div');
            strectherElement.className = _constants.stretcherElementClass + ' ' + options.orientation;
            var stretcherSize = elementSize + lastDraggableEnd - containerEnd;
            layout.setSize(strectherElement.style, stretcherSize + 'px');
            element.appendChild(strectherElement);
            element[_constants.stretcherElementInstance] = strectherElement;
            return {
              containerBoxChanged: true
            };
          }
        }
      } else {
        if (strectherElement) {
          layout.setTranslation(strectherElement, 0);
          var toRemove = strectherElement;
          strectherElement = null;
          element.removeChild(toRemove);
          element[_constants.stretcherElementInstance] = null;
          return {
            containerBoxChanged: true
          };
        }
      }
    }
  };
}

function calculateTranslations(_ref29) {
  var element = _ref29.element,
      draggables = _ref29.draggables,
      layout = _ref29.layout;

  var prevAddedIndex = null;
  var prevRemovedIndex = null;
  return function (_ref30) {
    var _ref30$dragResult = _ref30.dragResult,
        addedIndex = _ref30$dragResult.addedIndex,
        removedIndex = _ref30$dragResult.removedIndex,
        elementSize = _ref30$dragResult.elementSize;

    if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
      for (var index = 0; index < draggables.length; index++) {
        if (index !== removedIndex) {
          var draggable = draggables[index];
          var translate = 0;
          if (removedIndex !== null && removedIndex < index) {
            translate -= layout.getSize(draggables[removedIndex]);
          }
          if (addedIndex !== null && addedIndex <= index) {
            translate += elementSize;
          }
          layout.setTranslation(draggable, translate);
        }
      }

      prevAddedIndex = addedIndex;
      prevRemovedIndex = removedIndex;

      return { addedIndex: addedIndex, removedIndex: removedIndex };
    }
  };
}

function getShadowBeginEnd(_ref31) {
  var draggables = _ref31.draggables,
      layout = _ref31.layout;

  var prevAddedIndex = null;
  return function (_ref32) {
    var draggableInfo = _ref32.draggableInfo,
        dragResult = _ref32.dragResult;
    var addedIndex = dragResult.addedIndex,
        removedIndex = dragResult.removedIndex,
        elementSize = dragResult.elementSize,
        pos = dragResult.pos,
        shadowBeginEnd = dragResult.shadowBeginEnd;

    if (pos !== null) {
      if (addedIndex !== null && (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)) {
        if (prevAddedIndex) prevAddedIndex = addedIndex;
        var beforeIndex = addedIndex - 1;
        var begin = 0;
        var afterBounds = null;
        var beforeBounds = null;
        if (beforeIndex === removedIndex) {
          beforeIndex--;
        }
        if (beforeIndex > -1) {
          var beforeSize = layout.getSize(draggables[beforeIndex]);
          beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
          if (elementSize < beforeSize) {
            var threshold = (beforeSize - elementSize) / 2;
            begin = beforeBounds.end - threshold;
          } else {
            begin = beforeBounds.end;
          }
        } else {
          beforeBounds = { end: layout.getBeginEndOfContainer().begin };
        }

        var end = 10000;
        var afterIndex = addedIndex;
        if (afterIndex === removedIndex) {
          afterIndex++;
        }
        if (afterIndex < draggables.length) {
          var afterSize = layout.getSize(draggables[afterIndex]);
          afterBounds = layout.getBeginEnd(draggables[afterIndex]);

          if (elementSize < afterSize) {
            var _threshold = (afterSize - elementSize) / 2;
            end = afterBounds.begin + _threshold;
          } else {
            end = afterBounds.begin;
          }
        } else {
          afterBounds = { begin: layout.getContainerRectangles().end };
        }

        var shadowRectTopLeft = beforeBounds && afterBounds ? layout.getTopLeftOfElementBegin(beforeBounds.end, afterBounds.begin) : null;

        return {
          shadowBeginEnd: {
            begin: begin,
            end: end,
            rect: shadowRectTopLeft,
            beginAdjustment: shadowBeginEnd ? shadowBeginEnd.beginAdjustment : 0
          }
        };
      } else {
        return null;
      }
    } else {
      prevAddedIndex = null;
      return {
        shadowBeginEnd: null
      };
    }
  };
}

function handleFirstInsertShadowAdjustment() {
  var lastAddedIndex = null;
  return function (_ref33) {
    var _ref33$dragResult = _ref33.dragResult,
        pos = _ref33$dragResult.pos,
        addedIndex = _ref33$dragResult.addedIndex,
        shadowBeginEnd = _ref33$dragResult.shadowBeginEnd,
        invalidateShadow = _ref33.draggableInfo.invalidateShadow;

    if (pos !== null) {
      if (addedIndex != null && lastAddedIndex === null) {
        if (pos < shadowBeginEnd.begin) {
          var beginAdjustment = pos - shadowBeginEnd.begin - 5;
          shadowBeginEnd.beginAdjustment = beginAdjustment;
        }
        lastAddedIndex = addedIndex;
      }
    } else {
      lastAddedIndex = null;
    }
  };
}

function fireDragEnterLeaveEvents(_ref34) {
  var options = _ref34.options;

  var wasDragIn = false;
  return function (_ref35) {
    var pos = _ref35.dragResult.pos;

    var isDragIn = !!pos;
    if (isDragIn !== wasDragIn) {
      wasDragIn = isDragIn;
      if (isDragIn) {
        options.onDragEnter && options.onDragEnter();
      } else {
        options.onDragLeave && options.onDragLeave();
        return {
          dragLeft: true
        };
      }
    }
  };
}

function getDragHandler(params) {
  if (params.options.behaviour === 'drop-zone') {
    // sorting is disabled in container, addedIndex will always be 0 if dropped in
    return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, notifyParentOnPositionCapture, getElementSize, handleTargetContainer, getDragInsertionIndexForDropZone, getShadowBeginEndForDropZone, fireDragEnterLeaveEvents);
  } else {
    return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, notifyParentOnPositionCapture, getElementSize, handleTargetContainer, invalidateShadowBeginEndIfNeeded, getNextAddedIndex, resetShadowAdjustment, handleInsertionSizeChange, calculateTranslations, getShadowBeginEnd, handleFirstInsertShadowAdjustment, fireDragEnterLeaveEvents);
  }
}

function getDefaultDragResult() {
  return {
    addedIndex: null,
    removedIndex: null,
    elementSize: null,
    pos: null,
    shadowBeginEnd: null
  };
}

function compose(params) {
  return function () {
    for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    var hydratedFunctions = functions.map(function (p) {
      return p(params);
    });
    var result = null;
    return function (draggableInfo) {
      result = hydratedFunctions.reduce(function (dragResult, fn) {
        return Object.assign(dragResult, fn({ draggableInfo: draggableInfo, dragResult: dragResult }));
      }, result || getDefaultDragResult());
      return result;
    };
  };
}

// Container definition begin
function Container(element) {
  return function (options) {
    var dragResult = null;
    var lastDraggableInfo = null;
    var props = getContainerProps(element, options);
    var dragHandler = getDragHandler(props);
    var dropHandler = handleDrop(props);
    var parentContainer = null;
    var posIsInChildContainer = false;
    var childContainers = [];

    function processLastDraggableInfo() {
      if (lastDraggableInfo !== null) {
        lastDraggableInfo.invalidateShadow = true;
        dragResult = dragHandler(lastDraggableInfo);
        lastDraggableInfo.invalidateShadow = false;
      }
    }

    function onChildPositionCaptured(isCaptured) {
      posIsInChildContainer = isCaptured;
      if (parentContainer) {
        parentContainer.onChildPositionCaptured(isCaptured);
        if (lastDraggableInfo) {
          dragResult = dragHandler(lastDraggableInfo);
        }
      }
    }

    function _setDraggables(draggables, element, options) {
      var newDraggables = wrapChildren(element, options.orientation, options.animationDuration);
      for (var i = 0; i < newDraggables.length; i++) {
        draggables[i] = newDraggables[i];
      }

      for (var _i = 0; _i < draggables.length - newDraggables.length; _i++) {
        draggables.pop();
      }
    }

    function prepareDrag(container, relevantContainers) {
      var element = container.element;
      var draggables = props.draggables;
      var options = container.getOptions();
      _setDraggables(draggables, element, options);
      container.layout.invalidateRects();
      registerToParentContainer(container, relevantContainers);
      draggables.forEach(function (p) {
        return setAnimation(p, true, options.animationDuration);
      });
    }

    props.layout.setScrollListener(function () {
      processLastDraggableInfo();
    });

    function handleDragLeftDeferedTranslation() {
      if (dragResult.dragLeft && props.options.behaviour !== 'drop-zone') {
        dragResult.dragLeft = false;
        setTimeout(function () {
          if (dragResult) calculateTranslations(props)({ dragResult: dragResult });
        }, 20);
      }
    }

    function dispose(container) {
      unwrapChildren(container.element);
      (0, _utils.removeClass)(container.element, _constants.containerClass);
      (0, _utils.removeClass)(container.element, container.getOptions().orientation);
    }

    return {
      element: element,
      draggables: props.draggables,
      isDragRelevant: isDragRelevant(props),
      getScale: props.layout.getContainerScale,
      layout: props.layout,
      getChildContainers: function getChildContainers() {
        return childContainers;
      },
      onChildPositionCaptured: onChildPositionCaptured,
      dispose: dispose,
      prepareDrag: prepareDrag,
      isPosInChildContainer: function isPosInChildContainer() {
        return posIsInChildContainer;
      },
      handleDrag: function handleDrag(draggableInfo) {
        lastDraggableInfo = draggableInfo;
        dragResult = dragHandler(draggableInfo);
        handleDragLeftDeferedTranslation();
        return dragResult;
      },
      handleDrop: function handleDrop(draggableInfo) {
        lastDraggableInfo = null;
        onChildPositionCaptured(false);
        dragHandler = getDragHandler(props);
        dropHandler(draggableInfo, dragResult);
        dragResult = null;
        parentContainer = null;
        childContainers = [];
      },
      getDragResult: function getDragResult() {
        return dragResult;
      },
      getTranslateCalculator: function getTranslateCalculator() {
        return calculateTranslations(props).apply(undefined, arguments);
      },
      setParentContainer: function setParentContainer(e) {
        parentContainer = e;
      },
      getParentContainer: function getParentContainer() {
        return parentContainer;
      },
      onTranslated: function onTranslated() {
        processLastDraggableInfo();
      },
      getOptions: function getOptions() {
        return props.options;
      },
      setDraggables: function setDraggables() {
        _setDraggables(props.draggables, element, props.options);
      }
    };
  };
}

var options = {
  behaviour: 'move',
  groupName: 'bla bla', // if not defined => container will not interfere with other containers
  orientation: 'vertical',
  dragHandleSelector: null,
  nonDragAreaSelector: 'some selector',
  dragBeginDelay: 0,
  animationDuration: 180,
  autoScrollEnabled: true,
  lockAxis: true,
  dragClass: null,
  dropClass: null,
  onDragStart: function onDragStart(index, payload) {},
  onDrop: function onDrop(_ref36) {
    var removedIndex = _ref36.removedIndex,
        addedIndex = _ref36.addedIndex,
        payload = _ref36.payload,
        element = _ref36.element;
  },
  getChildPayload: function getChildPayload(index) {
    return null;
  },
  shouldAnimateDrop: function shouldAnimateDrop(sourceContainerOptions, payload) {
    return true;
  },
  shouldAcceptDrop: function shouldAcceptDrop(sourceContainerOptions, payload) {
    return true;
  },
  onDragEnter: function onDragEnter() {},
  onDragLeave: function onDragLeave() {}
};

// exported part of container
function SmoothDnD(element, options) {
  var containerIniter = Container(element);

  function initContainer(element, options) {
    var dndContainer = containerIniter(options);
    element[_constants.containerInstance] = dndContainer;
    _mediator2.default.register(dndContainer);
    return dndContainer;
  }

  var container = initContainer(element, options);

  function dispose() {
    _mediator2.default.unregister(container);
    container.layout.dispose();
    container.dispose(container);
  }

  return {
    dispose: dispose,
    setOptions: function setOptions(newOptions) {
      var mergedOptions = Object.assign({}, container.getOptions(), newOptions);
      dispose();
      container = initContainer(element, mergedOptions);
    }
  };
}

exports.default = SmoothDnD;
},{"./mediator":"..\\smooth-dnd\\src\\mediator.js","./layoutManager":"..\\smooth-dnd\\src\\layoutManager.js","./utils":"..\\smooth-dnd\\src\\utils.js","./dropHandlers":"..\\smooth-dnd\\src\\dropHandlers.js","./constants":"..\\smooth-dnd\\src\\constants.js"}],"src\\utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var applyDrag = exports.applyDrag = function applyDrag(arr, dragResult) {
	var removedIndex = dragResult.removedIndex,
	    addedIndex = dragResult.addedIndex,
	    payload = dragResult.payload;

	if (removedIndex === null && addedIndex === null) return arr;

	var result = [].concat(_toConsumableArray(arr));
	var itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0];
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};

var generateItems = exports.generateItems = function generateItems(count, creator) {
	var result = [];
	for (var i = 0; i < count; i++) {
		result.push(creator(i));
	}
	return result;
};
},{}],"src\\index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addChildAt = undefined;

var _container = require("../../smooth-dnd/src/container");

var _container2 = _interopRequireDefault(_container);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

var cardColors = ["azure", "beige", "bisque", "blanchedalmond", "burlywood", "cornsilk", "gainsboro", "ghostwhite", "ivory", "khaki"];
var pickColor = function pickColor() {
	var rand = Math.floor(Math.random() * 10);
	return cardColors[rand];
};

var addChildAt = exports.addChildAt = function addChildAt(parent, child, index) {
	if (index >= parent.children.length) {
		parent.appendChild(child);
	} else {
		parent.insertBefore(child, parent.children[index]);
	}
};

function createVerticalContainer(cardCount) {
	var container = document.createElement('div');

	for (var i = 0; i < cardCount; i++) {
		var wrapper = document.createElement('div');
		var card = document.createElement('div');
		card.className = 'card';
		card.innerText = lorem.slice(0, Math.floor(Math.random() * 150) + 30);
		wrapper.appendChild(card);
		container.appendChild(wrapper);
	}

	return container;
}

function initScene(colCount) {
	var cardScene = document.querySelector('.card-scene');
	var mainContainer = document.createElement('div');
	var innerContainers = [];

	for (var i = 0; i < colCount; i++) {
		var draggable = document.createElement('div');
		var verticalContainerHolder = document.createElement('div');
		var header = document.createElement('div');
		header.className = 'card-column-header';
		header.innerHTML = '<span class="column-drag-handle">&#x2630;</span> Header';
		verticalContainerHolder.appendChild(header);
		draggable.appendChild(verticalContainerHolder);
		verticalContainerHolder.className = 'card-container';
		var innerContainer = createVerticalContainer(+(Math.random() * 10).toFixed() + 5);
		innerContainers.push(innerContainer);
		verticalContainerHolder.appendChild(innerContainer);
		mainContainer.appendChild(draggable);
	}

	cardScene.appendChild(mainContainer);

	return {
		mainContainer: mainContainer,
		innerContainers: innerContainers
	};
}

var verticalContainers = void 0;

function main() {
	var containers = initScene(5);

	function _onDrop(dropResult, containerElement) {
		var removedIndex = dropResult.removedIndex,
		    addedIndex = dropResult.addedIndex,
		    droppedElement = dropResult.droppedElement;


		if (addedIndex !== null) {
			var dropped = droppedElement;
			addChildAt(containerElement, dropped, removedIndex !== null && removedIndex < addedIndex ? addedIndex + 1 : addedIndex);
		}
	}

	var mainContainer = (0, _container2.default)(containers.mainContainer, {
		orientation: 'horizontal',
		onDrop: function onDrop(p) {
			return _onDrop(p, containers.mainContainer);
		}
	});

	verticalContainers = containers.innerContainers.map(function (p) {
		return (0, _container2.default)(p, {
			groupName: 'cards',
			onDrop: function onDrop(q) {
				return _onDrop(q, p);
			}
		});
	});
}

main();

var btn = document.getElementById('btn-setoptions');

btn.addEventListener('click', function () {
	verticalContainers[0].setOptions({
		behaviour: 'copy'
	});
});
},{"../../smooth-dnd/src/container":"..\\smooth-dnd\\src\\container.js","./utils":"src\\utils.js"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50658' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\index.js"], null)
//# sourceMappingURL=/src.40de1316.map