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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var doc = document;
var the = doc.querySelector.bind(doc);
var all = doc.querySelectorAll.bind(doc);

// Detect request animation frame
var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
// IE Fallback, you can even fallback to onscroll
function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

var getElemOffset = function getElemOffset(elem) {

  // Width and height of container or element
  /// const width = elem.offsetWidth
  var height = elem.offsetHeight;

  // Default top and left position of container or element
  var top = 0;
  //let left = 0

  // Get total distance of container or element to document's top and left origin
  do {
    if (!isNaN(elem.offsetTop)) {
      top += elem.offsetTop;
    }
    // if (!isNaN(elem.offsetLeft)) {
    //   left += elem.offsetLeft
    // }
  } while ((elem = elem.offsetParent) !== null);

  // Return dimensions and position
  return { height: height, top: top };
};

exports.doc = doc;
exports.the = the;
exports.all = all;
exports.animation = animation;
exports.getElemOffset = getElemOffset;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = polyfillIntersectionObserver;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

// (function(window, document) {
// 'use strict'

function polyfillIntersectionObserver() {

  // Exits early if all IntersectionObserver and IntersectionObserverEntry
  // features are natively supported.
  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get() {
          return this.intersectionRatio > 0;
        }
      });
    }

    return;
  }

  /**
   * An IntersectionObserver registry. This registry exists to hold a strong
   * reference to IntersectionObserver instances currently observering a target
   * element. Without this registry, instances without another reference may be
   * garbage collected.
   */
  var registry = [];

  /**
   * Creates the global IntersectionObserverEntry constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
   * @param {Object} entry A dictionary of instance properties.
   * @constructor
   */
  function IntersectionObserverEntry(entry) {

    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = entry.rootBounds;
    this.boundingClientRect = entry.boundingClientRect;
    this.intersectionRect = entry.intersectionRect || getEmptyRect();
    this.isIntersecting = !!entry.intersectionRect;

    // Calculates the intersection ratio.
    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height;

    // Sets intersection ratio.
    if (targetArea) {
      this.intersectionRatio = intersectionArea / targetArea;
    } else {
      // If area is zero and is intersecting, sets to 1, otherwise to 0
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }

  /**
   * Creates the global IntersectionObserver constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
   * @param {Function} callback The function to be invoked after intersection
   *     changes have queued. The function is not invoked if the queue has
   *     been emptied by calling the `takeRecords` method.
   * @param {Object=} opt_options Optional configuration options.
   * @constructor
   */
  function IntersectionObserver(callback, opt_options) {

    var options = opt_options || {};

    if (typeof callback != 'function') {
      throw new Error('callback must be a function');
    }

    if (options.root && options.root.nodeType != 1) {
      throw new Error('root must be an Element');
    }

    // Binds and throttles `this._checkForIntersections`.
    this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

    // Private properties.
    this._callback = callback;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin);

    // Public properties.
    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function (margin) {
      return margin.value + margin.unit;
    }).join(' ');
  }

  /**
   * The minimum interval within which the document will be checked for
   * intersection changes.
   */
  IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;

  /**
   * The frequency in which the polyfill polls for intersection changes.
   * this can be updated on a per instance basis and must be set prior to
   * calling `observe` on the first target.
   */
  IntersectionObserver.prototype.POLL_INTERVAL = null;

  /**
   * Use a mutation observer on the root element
   * to detect intersection changes.
   */
  IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;

  /**
   * Starts observing a target element for intersection changes based on
   * the thresholds values.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserver.prototype.observe = function (target) {

    var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
      return item.element == target;
    });

    if (isTargetAlreadyObserved) {
      return;
    }

    if (!(target && target.nodeType == 1)) {
      throw new Error('target must be an Element');
    }

    this._registerInstance();
    this._observationTargets.push({ element: target, entry: null });
    this._monitorIntersections();
    this._checkForIntersections();
  };

  /**
   * Stops observing a target element for intersection changes.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserver.prototype.unobserve = function (target) {
    this._observationTargets = this._observationTargets.filter(function (item) {

      return item.element != target;
    });

    if (!this._observationTargets.length) {
      this._unmonitorIntersections();
      this._unregisterInstance();
    }
  };

  /**
   * Stops observing all target elements for intersection changes.
   */
  IntersectionObserver.prototype.disconnect = function () {
    this._observationTargets = [];
    this._unmonitorIntersections();
    this._unregisterInstance();
  };

  /**
   * Returns any queue entries that have not yet been reported to the
   * callback and clears the queue. This can be used in conjunction with the
   * callback to obtain the absolute most up-to-date intersection information.
   * @return {Array} The currently queued entries.
   */
  IntersectionObserver.prototype.takeRecords = function () {
    var records = this._queuedEntries.slice();
    this._queuedEntries = [];
    return records;
  };

  /**
   * Accepts the threshold value from the user configuration object and
   * returns a sorted array of unique threshold values. If a value is not
   * between 0 and 1 and error is thrown.
   * @private
   * @param {Array|number=} opt_threshold An optional threshold value or
   *     a list of threshold values, defaulting to [0].
   * @return {Array} A sorted list of unique and valid threshold values.
   */
  IntersectionObserver.prototype._initThresholds = function (opt_threshold) {

    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold)) threshold = [threshold];

    return threshold.sort().filter(function (t, i, a) {

      if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
        throw new Error('threshold must be a number between 0 and 1 inclusively');
      }

      return t !== a[i - 1];
    });
  };

  /**
   * Accepts the rootMargin value from the user configuration object
   * and returns an array of the four margin values as an object containing
   * the value and unit properties. If any of the values are not properly
   * formatted or use a unit other than px or %, and error is thrown.
   * @private
   * @param {string=} opt_rootMargin An optional rootMargin value,
   *     defaulting to '0px'.
   * @return {Array<Object>} An array of margin objects with the keys
   *     value and unit.
   */
  IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
    var marginString = opt_rootMargin || '0px';
    var margins = marginString.split(/\s+/).map(function (margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }
      return { value: parseFloat(parts[1]), unit: parts[2] };
    });

    // Handles shorthand.
    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];

    return margins;
  };

  /**
   * Starts polling for intersection changes if the polling is not already
   * happening, and if the page's visibilty state is visible.
   * @private
   */
  IntersectionObserver.prototype._monitorIntersections = function () {
    if (!this._monitoringIntersections) {
      this._monitoringIntersections = true;

      // If a poll interval is set, use polling instead of listening to
      // resize and scroll events or DOM mutations.
      if (this.POLL_INTERVAL) {
        this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
      } else {
        addEvent(window, 'resize', this._checkForIntersections, true);
        addEvent(document, 'scroll', this._checkForIntersections, true);

        if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
          this._domObserver = new MutationObserver(this._checkForIntersections);
          this._domObserver.observe(this.root || document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
    }
  };

  /**
   * Stops polling for intersection changes.
   * @private
   */
  IntersectionObserver.prototype._unmonitorIntersections = function () {
    if (this._monitoringIntersections) {
      this._monitoringIntersections = false;

      clearInterval(this._monitoringInterval);
      this._monitoringInterval = null;

      removeEvent(window, 'resize', this._checkForIntersections, true);
      removeEvent(document, 'scroll', this._checkForIntersections, true);

      if (this._domObserver) {
        this._domObserver.disconnect();
        this._domObserver = null;
      }
    }
  };

  /**
   * Scans each observation target for intersection changes and adds them
   * to the internal entries queue. If new entries are found, it
   * schedules the callback to be invoked.
   * @private
   */
  IntersectionObserver.prototype._checkForIntersections = function () {

    var rootIsInDom = this._rootIsInDom();
    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

    this._observationTargets.forEach(function (item) {
      var target = item.element;
      var targetRect = getBoundingClientRect(target);
      var rootContainsTarget = this._rootContainsTarget(target);
      var oldEntry = item.entry;
      var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

      var newEntry = item.entry = new IntersectionObserverEntry({
        time: now(),
        target: target,
        boundingClientRect: targetRect,
        rootBounds: rootRect,
        intersectionRect: intersectionRect
      });

      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        // If the new entry intersection ratio has crossed any of the
        // thresholds, add a new entry.
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        // If the root is not in the DOM or target is not contained within
        // root but the previous entry for this target had an intersection,
        // add a new record indicating removal.
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }, this);

    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };

  /**
   * Accepts a target and root rect computes the intersection between then
   * following the algorithm in the spec.
   * TODO(philipwalton): at this time clip-path is not considered.
   * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
   * @param {Element} target The target DOM element
   * @param {Object} rootRect The bounding rect of the root after being
   *     expanded by the rootMargin value.
   * @return {?Object} The final intersection rect object or undefined if no
   *     intersection is found.
   * @private
   */
  IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {

    // If the element isn't displayed, an intersection can't happen.
    if (window.getComputedStyle(target).display == 'none') return;

    var targetRect = getBoundingClientRect(target);
    var intersectionRect = targetRect;
    var parent = getParentNode(target);
    var atRoot = false;

    while (!atRoot) {
      var parentRect = null;

      var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

      // If the parent isn't displayed, an intersection can't happen.
      if (parentComputedStyle.display == 'none') return;

      if (parent == this.root || parent == document) {
        atRoot = true;
        parentRect = rootRect;
      } else {
        // If the element has a non-visible overflow, and it's not the <body>
        // or <html> element, update the intersection rect.
        // Note: <body> and <html> cannot be clipped to a rect that's not also
        // the document rect, so no need to compute a new intersection.
        if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
          parentRect = getBoundingClientRect(parent);
        }
      }

      // If either of the above conditionals set a new parentRect,
      // calculate new intersection data.
      if (parentRect) {
        intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        if (!intersectionRect) break;
      }

      parent = getParentNode(parent);
    }
    return intersectionRect;
  };

  /**
   * Returns the root rect after being expanded by the rootMargin value.
   * @return {Object} The expanded root rect.
   * @private
   */
  IntersectionObserver.prototype._getRootRect = function () {

    var rootRect = void 0;

    if (this.root) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      var html = document.documentElement;
      var body = document.body;

      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }

    return this._expandRectByRootMargin(rootRect);
  };

  /**
   * Accepts a rect and expands it by the rootMargin value.
   * @param {Object} rect The rect object to expand.
   * @return {Object} The expanded rect.
   * @private
   */
  IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
    var margins = this._rootMarginValues.map(function (margin, i) {
      return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
    });

    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };

    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;

    return newRect;
  };

  /**
   * Accepts an old and new entry and returns true if at least one of the
   * threshold values has been crossed.
   * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
   *    particular target element or null if no previous entry exists.
   * @param {IntersectionObserverEntry} newEntry The current entry for a
   *    particular target element.
   * @return {boolean} Returns true if a any threshold has been crossed.
   * @private
   */
  IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {

    // To make comparing easier, an entry that has a ratio of 0
    // but does not actually intersect is given a value of -1
    var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
    var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;

    // Ignore unchanged ratios
    if (oldRatio === newRatio) return;

    for (var i = 0; i < this.thresholds.length; i++) {
      var threshold = this.thresholds[i];

      // Return true if an entry matches a threshold or if the new ratio
      // and the old ratio are on the opposite sides of a threshold.
      if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
        return true;
      }
    }
  };

  /**
   * Returns whether or not the root element is an element and is in the DOM.
   * @return {boolean} True if the root element is an element and is in the DOM.
   * @private
   */
  IntersectionObserver.prototype._rootIsInDom = function () {
    return !this.root || containsDeep(document, this.root);
  };

  /**
   * Returns whether or not the target element is a child of root.
   * @param {Element} target The target element to check.
   * @return {boolean} True if the target element is a child of root.
   * @private
   */
  IntersectionObserver.prototype._rootContainsTarget = function (target) {
    return containsDeep(this.root || document, target);
  };

  /**
   * Adds the instance to the global IntersectionObserver registry if it isn't
   * already present.
   * @private
   */
  IntersectionObserver.prototype._registerInstance = function () {
    if (registry.indexOf(this) < 0) {
      registry.push(this);
    }
  };

  /**
   * Removes the instance from the global IntersectionObserver registry.
   * @private
   */
  IntersectionObserver.prototype._unregisterInstance = function () {
    var index = registry.indexOf(this);
    if (index != -1) registry.splice(index, 1);
  };

  /**
   * Returns the result of the performance.now() method or null in browsers
   * that don't support the API.
   * @return {number} The elapsed time since the page was requested.
   */
  function now() {
    return window.performance && performance.now && performance.now();
  }

  /**
   * Throttles a function and delays its executiong, so it's only called at most
   * once within a given time period.
   * @param {Function} fn The function to throttle.
   * @param {number} timeout The amount of time that must pass before the
   *     function can be called again.
   * @return {Function} The throttled function.
   */
  function throttle(fn, timeout) {
    var timer = null;

    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }

  /**
   * Adds an event handler to a DOM node ensuring cross-browser compatibility.
   * @param {Node} node The DOM node to add the event handler to.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to add.
   * @param {boolean} opt_useCapture Optionally adds the even to the capture
   *     phase. Note: this only works in modern browsers.
   */
  function addEvent(node, event, fn, opt_useCapture) {

    if (typeof node.addEventListener == 'function') {
      node.addEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.attachEvent == 'function') {
      node.attachEvent('on' + event, fn);
    }
  }

  /**
   * Removes a previously added event handler from a DOM node.
   * @param {Node} node The DOM node to remove the event handler from.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to remove.
   * @param {boolean} opt_useCapture If the event handler was added with this
   *     flag set to true, it should be set to true here in order to remove it.
   */
  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == 'function') {
      node.removeEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.detatchEvent == 'function') {
      node.detatchEvent('on' + event, fn);
    }
  }

  /**
   * Returns the intersection between two rect objects.
   * @param {Object} rect1 The first rect.
   * @param {Object} rect2 The second rect.
   * @return {?Object} The intersection rect or undefined if no intersection
   *     is found.
   */
  function computeRectIntersection(rect1, rect2) {

    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;

    return width >= 0 && height >= 0 && {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: width,
      height: height
    };
  }

  /**
   * Shims the native getBoundingClientRect for compatibility with older IE.
   * @param {Element} el The element whose bounding rect to get.
   * @return {Object} The (possibly shimmed) rect of the element.
   */
  function getBoundingClientRect(el) {

    var rect = void 0;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {
      // Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) return getEmptyRect();

    // Older IE
    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }
    return rect;
  }

  /**
   * Returns an empty rect object. An empty rect is returned when an element
   * is not in the DOM.
   * @return {Object} The empty rect.
   */
  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }

  /**
   * Checks to see if a parent element contains a child elemnt (including inside
   * shadow DOM).
   * @param {Node} parent The parent element.
   * @param {Node} child The child element.
   * @return {boolean} True if the parent node contains the child node.
   */
  function containsDeep(parent, child) {

    var node = child;

    while (node) {
      if (node == parent) return true;
      node = getParentNode(node);
    }

    return false;
  }

  /**
   * Gets the parent node of an element or its host element if the parent node
   * is a shadow root.
   * @param {Node} node The node whose parent to get.
   * @return {Node|null} The parent node or null if no parent exists.
   */
  function getParentNode(node) {

    var parent = node.parentNode;

    if (parent && parent.nodeType == 11 && parent.host) {
      // If the parent is a shadow root, return the host element.
      return parent.host;
    }
    return parent;
  }

  // Exposes the constructors globally.
  window.IntersectionObserver = IntersectionObserver;
  window.IntersectionObserverEntry = IntersectionObserverEntry;
}
//}(window, document))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webfontloader = __webpack_require__(3);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fonts = _webfontloader2.default.load({
  google: {
    families: ['Poppins:100,300,400,700']
  }
});

exports.default = fonts;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function () {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }function ba(a, b, c) {
    if (!a) throw Error();if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);return function () {
        var c = Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c, d);return a.apply(b, c);
      };
    }return function () {
      return a.apply(b, arguments);
    };
  }function p(a, b, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;return p.apply(null, arguments);
  }var q = Date.now || function () {
    return +new Date();
  };function ca(a, b) {
    this.a = a;this.o = b || a;this.c = this.o.document;
  }var da = !!window.FontFace;function t(a, b, c, d) {
    b = a.c.createElement(b);if (c) for (var e in c) {
      c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
    }d && b.appendChild(a.c.createTextNode(d));return b;
  }function u(a, b, c) {
    a = a.c.getElementsByTagName(b)[0];a || (a = document.documentElement);a.insertBefore(c, a.lastChild);
  }function v(a) {
    a.parentNode && a.parentNode.removeChild(a);
  }
  function w(a, b, c) {
    b = b || [];c = c || [];for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1) {
        if (b[e] === d[g]) {
          f = !0;break;
        }
      }f || d.push(b[e]);
    }b = [];for (e = 0; e < d.length; e += 1) {
      f = !1;for (g = 0; g < c.length; g += 1) {
        if (d[e] === c[g]) {
          f = !0;break;
        }
      }f || b.push(d[e]);
    }a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }function y(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) {
      if (c[d] == b) return !0;
    }return !1;
  }
  function ea(a) {
    return a.o.location.hostname || a.a.location.hostname;
  }function z(a, b, c) {
    function d() {
      m && e && f && (m(g), m = null);
    }b = t(a, "link", { rel: "stylesheet", href: b, media: "all" });var e = !1,
        f = !0,
        g = null,
        m = c || null;da ? (b.onload = function () {
      e = !0;d();
    }, b.onerror = function () {
      e = !0;g = Error("Stylesheet failed to load");d();
    }) : setTimeout(function () {
      e = !0;d();
    }, 0);u(a, "head", b);
  }
  function A(a, b, c, d) {
    var e = a.c.getElementsByTagName("head")[0];if (e) {
      var f = t(a, "script", { src: b }),
          g = !1;f.onload = f.onreadystatechange = function () {
        g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
      };e.appendChild(f);setTimeout(function () {
        g || (g = !0, c && c(Error("Script load timeout")));
      }, d || 5E3);return f;
    }return null;
  };function B() {
    this.a = 0;this.c = null;
  }function C(a) {
    a.a++;return function () {
      a.a--;D(a);
    };
  }function E(a, b) {
    a.c = b;D(a);
  }function D(a) {
    0 == a.a && a.c && (a.c(), a.c = null);
  };function F(a) {
    this.a = a || "-";
  }F.prototype.c = function (a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
      b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
    }return b.join(this.a);
  };function G(a, b) {
    this.c = a;this.f = 4;this.a = "n";var c = (b || "n4").match(/^([nio])([1-9])$/i);c && (this.a = c[1], this.f = parseInt(c[2], 10));
  }function fa(a) {
    return H(a) + " " + (a.f + "00") + " 300px " + I(a.c);
  }function I(a) {
    var b = [];a = a.split(/,\s*/);for (var c = 0; c < a.length; c++) {
      var d = a[c].replace(/['"]/g, "");-1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
    }return b.join(",");
  }function J(a) {
    return a.a + a.f;
  }function H(a) {
    var b = "normal";"o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");return b;
  }
  function ga(a) {
    var b = 4,
        c = "n",
        d = null;a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));return c + b;
  };function ha(a, b) {
    this.c = a;this.f = a.o.document.documentElement;this.h = b;this.a = new F("-");this.j = !1 !== b.events;this.g = !1 !== b.classes;
  }function ia(a) {
    a.g && w(a.f, [a.a.c("wf", "loading")]);K(a, "loading");
  }function L(a) {
    if (a.g) {
      var b = y(a.f, a.a.c("wf", "active")),
          c = [],
          d = [a.a.c("wf", "loading")];b || c.push(a.a.c("wf", "inactive"));w(a.f, c, d);
    }K(a, "inactive");
  }function K(a, b, c) {
    if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));else a.h[b]();
  };function ja() {
    this.c = {};
  }function ka(a, b, c) {
    var d = [],
        e;for (e in b) {
      if (b.hasOwnProperty(e)) {
        var f = a.c[e];f && d.push(f(b[e], c));
      }
    }return d;
  };function M(a, b) {
    this.c = a;this.f = b;this.a = t(this.c, "span", { "aria-hidden": "true" }, this.f);
  }function N(a) {
    u(a.c, "body", a.a);
  }function O(a) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(a.c) + ";" + ("font-style:" + H(a) + ";font-weight:" + (a.f + "00") + ";");
  };function P(a, b, c, d, e, f) {
    this.g = a;this.j = b;this.a = d;this.c = c;this.f = e || 3E3;this.h = f || void 0;
  }P.prototype.start = function () {
    var a = this.c.o.document,
        b = this,
        c = q(),
        d = new Promise(function (d, e) {
      function f() {
        q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {
          1 <= a.length ? d() : setTimeout(f, 25);
        }, function () {
          e();
        });
      }f();
    }),
        e = null,
        f = new Promise(function (a, d) {
      e = setTimeout(d, b.f);
    });Promise.race([f, d]).then(function () {
      e && (clearTimeout(e), e = null);b.g(b.a);
    }, function () {
      b.j(b.a);
    });
  };function Q(a, b, c, d, e, f, g) {
    this.v = a;this.B = b;this.c = c;this.a = d;this.s = g || "BESbswy";this.f = {};this.w = e || 3E3;this.u = f || null;this.m = this.j = this.h = this.g = null;this.g = new M(this.c, this.s);this.h = new M(this.c, this.s);this.j = new M(this.c, this.s);this.m = new M(this.c, this.s);a = new G(this.a.c + ",serif", J(this.a));a = O(a);this.g.a.style.cssText = a;a = new G(this.a.c + ",sans-serif", J(this.a));a = O(a);this.h.a.style.cssText = a;a = new G("serif", J(this.a));a = O(a);this.j.a.style.cssText = a;a = new G("sans-serif", J(this.a));a = O(a);this.m.a.style.cssText = a;N(this.g);N(this.h);N(this.j);N(this.m);
  }var R = { D: "serif", C: "sans-serif" },
      S = null;function T() {
    if (null === S) {
      var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
    }return S;
  }Q.prototype.start = function () {
    this.f.serif = this.j.a.offsetWidth;this.f["sans-serif"] = this.m.a.offsetWidth;this.A = q();U(this);
  };
  function la(a, b, c) {
    for (var d in R) {
      if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;
    }return !1;
  }function U(a) {
    var b = a.g.a.offsetWidth,
        c = a.h.a.offsetWidth,
        d;(d = b === a.f.serif && c === a.f["sans-serif"]) || (d = T() && la(a, b, c));d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);
  }function ma(a) {
    setTimeout(p(function () {
      U(this);
    }, a), 50);
  }function V(a, b) {
    setTimeout(p(function () {
      v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a);
    }, a), 0);
  };function W(a, b, c) {
    this.c = a;this.a = b;this.f = 0;this.m = this.j = !1;this.s = c;
  }var X = null;W.prototype.g = function (a) {
    var b = this.a;b.g && w(b.f, [b.a.c("wf", a.c, J(a).toString(), "active")], [b.a.c("wf", a.c, J(a).toString(), "loading"), b.a.c("wf", a.c, J(a).toString(), "inactive")]);K(b, "fontactive", a);this.m = !0;na(this);
  };
  W.prototype.h = function (a) {
    var b = this.a;if (b.g) {
      var c = y(b.f, b.a.c("wf", a.c, J(a).toString(), "active")),
          d = [],
          e = [b.a.c("wf", a.c, J(a).toString(), "loading")];c || d.push(b.a.c("wf", a.c, J(a).toString(), "inactive"));w(b.f, d, e);
    }K(b, "fontinactive", a);na(this);
  };function na(a) {
    0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), K(a, "active")) : L(a.a));
  };function oa(a) {
    this.j = a;this.a = new ja();this.h = 0;this.f = this.g = !0;
  }oa.prototype.load = function (a) {
    this.c = new ca(this.j, a.context || this.j);this.g = !1 !== a.events;this.f = !1 !== a.classes;pa(this, new ha(this.c, a), a);
  };
  function qa(a, b, c, d, e) {
    var f = 0 == --a.h;(a.f || a.g) && setTimeout(function () {
      var a = e || null,
          m = d || null || {};if (0 === c.length && f) L(b.a);else {
        b.f += c.length;f && (b.j = f);var h,
            l = [];for (h = 0; h < c.length; h++) {
          var k = c[h],
              n = m[k.c],
              r = b.a,
              x = k;r.g && w(r.f, [r.a.c("wf", x.c, J(x).toString(), "loading")]);K(r, "fontloading", x);r = null;if (null === X) if (window.FontFace) {
            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                xa = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
            X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;
          } else X = !1;X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);l.push(r);
        }for (h = 0; h < l.length; h++) {
          l[h].start();
        }
      }
    }, 0);
  }function pa(a, b, c) {
    var d = [],
        e = c.timeout;ia(b);var d = ka(a.a, c, a.c),
        f = new W(a.c, b, e);a.h = d.length;b = 0;for (c = d.length; b < c; b++) {
      d[b].load(function (b, d, c) {
        qa(a, f, b, d, c);
      });
    }
  };function ra(a, b) {
    this.c = a;this.a = b;
  }
  ra.prototype.load = function (a) {
    function b() {
      if (f["__mti_fntLst" + d]) {
        var c = f["__mti_fntLst" + d](),
            e = [],
            h;if (c) for (var l = 0; l < c.length; l++) {
          var k = c[l].fontfamily;void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));
        }a(e);
      } else setTimeout(function () {
        b();
      }, 50);
    }var c = this,
        d = c.a.projectId,
        e = c.a.version;if (d) {
      var f = c.c.o;A(this.c, (c.a.api || "https://fast.fonts.net/jsapi") + "/" + d + ".js" + (e ? "?v=" + e : ""), function (e) {
        e ? a([]) : (f["__MonotypeConfiguration__" + d] = function () {
          return c.a;
        }, b());
      }).id = "__MonotypeAPIScript__" + d;
    } else a([]);
  };function sa(a, b) {
    this.c = a;this.a = b;
  }sa.prototype.load = function (a) {
    var b,
        c,
        d = this.a.urls || [],
        e = this.a.families || [],
        f = this.a.testStrings || {},
        g = new B();b = 0;for (c = d.length; b < c; b++) {
      z(this.c, d[b], C(g));
    }var m = [];b = 0;for (c = e.length; b < c; b++) {
      if (d = e[b].split(":"), d[1]) for (var h = d[1].split(","), l = 0; l < h.length; l += 1) {
        m.push(new G(d[0], h[l]));
      } else m.push(new G(d[0]));
    }E(g, function () {
      a(m, f);
    });
  };function ta(a, b) {
    a ? this.c = a : this.c = ua;this.a = [];this.f = [];this.g = b || "";
  }var ua = "https://fonts.googleapis.com/css";function va(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = b[d].split(":");3 == e.length && a.f.push(e.pop());var f = "";2 == e.length && "" != e[1] && (f = ":");a.a.push(e.join(f));
    }
  }
  function wa(a) {
    if (0 == a.a.length) throw Error("No fonts to load!");if (-1 != a.c.indexOf("kit=")) return a.c;for (var b = a.a.length, c = [], d = 0; d < b; d++) {
      c.push(a.a[d].replace(/ /g, "+"));
    }b = a.c + "?family=" + c.join("%7C");0 < a.f.length && (b += "&subset=" + a.f.join(","));0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));return b;
  };function ya(a) {
    this.f = a;this.a = [];this.c = {};
  }
  var za = { latin: "BESbswy", "latin-ext": "\xE7\xF6\xFC\u011F\u015F", cyrillic: "\u0439\u044F\u0416", greek: "\u03B1\u03B2\u03A3", khmer: "\u1780\u1781\u1782", Hanuman: "\u1780\u1781\u1782" },
      Aa = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" },
      Ba = { i: "i", italic: "i", n: "n", normal: "n" },
      Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Da(a) {
    for (var b = a.f.length, c = 0; c < b; c++) {
      var d = a.f[c].split(":"),
          e = d[0].replace(/\+/g, " "),
          f = ["n4"];if (2 <= d.length) {
        var g;var m = d[1];g = [];if (m) for (var m = m.split(","), h = m.length, l = 0; l < h; l++) {
          var k;k = m[l];if (k.match(/^[\w-]+$/)) {
            var n = Ca.exec(k.toLowerCase());if (null == n) k = "";else {
              k = n[2];k = null == k || "" == k ? "n" : Ba[k];n = n[1];if (null == n || "" == n) n = "4";else var r = Aa[n],
                  n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);k = [k, n].join("");
            }
          } else k = "";k && g.push(k);
        }0 < g.length && (f = g);3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));
      }a.c[e] || (d = za[e]) && (a.c[e] = d);for (d = 0; d < f.length; d += 1) {
        a.a.push(new G(e, f[d]));
      }
    }
  };function Ea(a, b) {
    this.c = a;this.a = b;
  }var Fa = { Arimo: !0, Cousine: !0, Tinos: !0 };Ea.prototype.load = function (a) {
    var b = new B(),
        c = this.c,
        d = new ta(this.a.api, this.a.text),
        e = this.a.families;va(d, e);var f = new ya(e);Da(f);z(c, wa(d), C(b));E(b, function () {
      a(f.a, f.c, Fa);
    });
  };function Ga(a, b) {
    this.c = a;this.a = b;
  }Ga.prototype.load = function (a) {
    var b = this.a.id,
        c = this.c.o;b ? A(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function (b) {
      if (b) a([]);else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
        b = c.Typekit.config.fn;for (var e = [], f = 0; f < b.length; f += 2) {
          for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) {
            e.push(new G(g, m[h]));
          }
        }try {
          c.Typekit.load({ events: !1, classes: !1, async: !0 });
        } catch (l) {}a(e);
      }
    }, 2E3) : a([]);
  };function Ha(a, b) {
    this.c = a;this.f = b;this.a = [];
  }Ha.prototype.load = function (a) {
    var b = this.f.id,
        c = this.c.o,
        d = this;b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
      for (var g = 0, m = c.fonts.length; g < m; ++g) {
        var h = c.fonts[g];d.a.push(new G(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
      }a(d.a);
    }, A(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function (b) {
      b && a([]);
    })) : a([]);
  };var Y = new oa(window);Y.a.c.custom = function (a, b) {
    return new sa(b, a);
  };Y.a.c.fontdeck = function (a, b) {
    return new Ha(b, a);
  };Y.a.c.monotype = function (a, b) {
    return new ra(b, a);
  };Y.a.c.typekit = function (a, b) {
    return new Ga(b, a);
  };Y.a.c.google = function (a, b) {
    return new Ea(b, a);
  };var Z = { load: p(Y.load, Y) }; true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return Z;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (true) module.exports = definition();else if (typeof define == 'function' && _typeof(define.amd) == 'object') define(definition);else this[name] = definition();
}('domready', function () {

  var fns = [],
      _listener,
      doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
    doc.removeEventListener(domContentLoaded, _listener);
    loaded = 1;
    while (_listener = fns.shift()) {
      _listener();
    }
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lazzyLoad;

var _utils = __webpack_require__(0);

var _polyfillIntersectionObserver = __webpack_require__(1);

var _polyfillIntersectionObserver2 = _interopRequireDefault(_polyfillIntersectionObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// preload images
function lazzyLoad() {

  (0, _polyfillIntersectionObserver2.default)();

  var lazys = (0, _utils.all)('.lazzy');

  var preloadImage = function preloadImage(img) {
    return img.src = img.dataset.src;
  };

  var config = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  var scroll = new IntersectionObserver(onIntersection, config);

  lazys.forEach(function (lazy) {
    return scroll.observe(lazy);
  });

  function onIntersection(entries) {

    // Loop through the entries
    entries.forEach(function (entry) {

      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        scroll.unobserve(entry.target);
        preloadImage(entry.target);
      }
    });
  }
}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fontLoader = __webpack_require__(2);

var _fontLoader2 = _interopRequireDefault(_fontLoader);

var _utils = __webpack_require__(0);

var _domready = __webpack_require__(4);

var _domready2 = _interopRequireDefault(_domready);

var _Tabs = __webpack_require__(13);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _scrollHandler = __webpack_require__(14);

var _scrollHandler2 = _interopRequireDefault(_scrollHandler);

var _lazzyLoad = __webpack_require__(5);

var _lazzyLoad2 = _interopRequireDefault(_lazzyLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _domready2.default)(function () {

  new _Tabs2.default();
  (0, _lazzyLoad2.default)();
  (0, _scrollHandler2.default)('.pushs', -50);
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tabs = function () {
  function Tabs() {
    _classCallCheck(this, Tabs);

    this.cnt = (0, _utils.the)('.tabs') || false;

    if (!this.cnt) return;

    this.triggers = this.cnt.querySelectorAll('.tabber li');
    this.tabs = this.cnt.querySelectorAll('.tab');
    this.controler = [];
    this.init();
  }

  _createClass(Tabs, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.triggers.forEach(function (trigger) {

        var selector = trigger.dataset.tab;
        var tab = (0, _utils.the)('.tab[data-tab=' + selector + ']');
        _this.controler.push({ trigger: trigger, tab: tab, selector: selector });

        trigger.addEventListener('click', function () {
          _this.tabIt(selector);
          _this.updateHash(selector);
        });
      });

      var hash = window.location.hash || false;

      if (hash) {
        var selector = hash.replace("#", "");
        this.tabIt(selector);
      }
    }
  }, {
    key: 'updateHash',
    value: function updateHash(selector) {
      window.location.hash = selector;
    }
  }, {
    key: 'tabIt',
    value: function tabIt(selector) {

      this.controler.filter(function (e) {
        return e.selector === selector;
      }).forEach(function (active) {
        active.tab.classList.add('active');
        active.trigger.classList.add('active');
      });

      this.controler.filter(function (e) {
        return e.selector !== selector;
      }).forEach(function (inactive) {
        inactive.tab.classList.remove('active');
        inactive.trigger.classList.remove('active');
      });
    }
  }]);

  return Tabs;
}();

exports.default = Tabs;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollHandler;

var _utils = __webpack_require__(0);

var _polyfillIntersectionObserver = __webpack_require__(1);

var _polyfillIntersectionObserver2 = _interopRequireDefault(_polyfillIntersectionObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onScroll = function onScroll(element) {
  return element.classList.add('visible');
};

function scrollHandler(element, distance) {

  (0, _polyfillIntersectionObserver2.default)();

  var lazys = (0, _utils.all)(element);

  var config = {
    rootMargin: distance + 'px 0px',
    threshold: 0.01
  };

  var scroll = new IntersectionObserver(onIntersection, config);

  lazys.forEach(function (lazy) {
    return scroll.observe(lazy);
  });

  function onIntersection(entries) {

    // Loop through the entries
    entries.forEach(function (entry) {

      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        scroll.unobserve(entry.target);
        onScroll(entry.target);
      }
    });
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=solution.js.map