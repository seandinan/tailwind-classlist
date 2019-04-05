'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _mergeClassLists;

var _classList = _interopRequireDefault(require('./classList'));

var _parseClassList = _interopRequireDefault(require('./parseClassList'));

var _adjustableClasses = _interopRequireDefault(
  require('./constants/adjustableClasses')
);

var _standaloneClasses = _interopRequireDefault(
  require('./constants/standaloneClasses')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var adjustableClassesArray = Object.keys(_adjustableClasses.default);

var standaloneClassesArray = _standaloneClasses.default.reduce(function(a, b) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
}, []);

var isString = function isString(val) {
  return typeof val === 'string';
};

var isNumber = function isNumber(val) {
  return typeof val === 'number';
};

var isBool = function isBool(val) {
  return val === true || val === false;
};

var isArray = function isArray(val) {
  return val instanceof Array;
};

var isObject = function isObject(val) {
  return val instanceof Object;
};

var isBasicValue = function isBasicValue(val) {
  return isString(val) || isNumber(val) || isBool(val);
};

function _mergeClassLists() {
  // Parse the classes lists into objects
  var parsedClasses = Array.prototype.slice
    .call(arguments)
    .map(_parseClassList.default);
  var prefixes = {}; // Convert the classes object into an array of [ key, value ] pairs

  var classArray = parsedClasses.reduce(function(classObjArray, classObj) {
    var classes = [];
    Object.keys(classObj).forEach(function(key) {
      if (isBasicValue(classObj[key])) {
        classes.push([key, classObj[key]]);
      } else if (isArray(classObj[key])) {
        classes.push.apply(
          classes,
          _toConsumableArray(
            classObj[key].map(function(val) {
              return [key, val];
            })
          )
        );
      } else if (isObject(classObj[key])) {
        if (prefixes[key]) {
          prefixes[key] = (0, _parseClassList.default)(
            _mergeClassLists.apply(
              void 0,
              _toConsumableArray(
                [prefixes[key], classObj[key]].map(_classList.default)
              )
            )
          );
        } else {
          prefixes[key] = classObj[key];
        }
      } else {
        throw new Error('Unable to process key: '.concat(key));
      }
    });
    return [].concat(_toConsumableArray(classObjArray), classes);
  }, []); // Group the individual values together

  var batchedValues = classArray.reduce(function(a, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

    var _formatBatchData = formatBatchData(key, value),
      _formatBatchData2 = _slicedToArray(_formatBatchData, 2),
      batchKey = _formatBatchData2[0],
      batchValue = _formatBatchData2[1];

    return _objectSpread(
      {},
      a,
      _defineProperty(
        {},
        batchKey,
        a[batchKey]
          ? [].concat(_toConsumableArray(a[batchKey]), [batchValue])
          : [batchValue]
      )
    );
  }, {});
  var result = Object.keys(batchedValues).reduce(function(a, key) {
    var valuesArray = batchedValues[key];

    if (key !== 'standalone') {
      return _objectSpread({}, a, overrideAdjustable(key, valuesArray));
    } else return a;
  }, {});

  if (batchedValues.standalone) {
    var standaloneList = overrideStandalone(batchedValues.standalone);
    Object.keys(standaloneList).forEach(function(key) {
      if (result[key]) result[key].unshift(standaloneList[key]);
      else result[key] = [standaloneList[key]];
    });
  } // console.log(result);

  return (0, _classList.default)(_objectSpread({}, result, prefixes));
}

function overrideStandalone(valuesArray) {
  return valuesArray
    .reduce(function(valList, val) {
      var overrideGroup = getOverrideGroups('standalone', val)[0];
      return [].concat(
        _toConsumableArray(
          valList.filter(function(v) {
            return !overrideGroup.includes(v);
          })
        ),
        [val]
      );
    }, [])
    .reduce(function(a, b) {
      return _objectSpread({}, a, _defineProperty({}, b, true));
    }, {});
}

function overrideAdjustable(key, valuesArray) {
  if (valuesArray.length > 1) {
    return _defineProperty(
      {},
      key,
      valuesArray.reduce(function(valList, val) {
        var overrideGroups = getOverrideGroups(key, val);

        var removeOverridenValues = function removeOverridenValues(v) {
          return !overrideGroups.reduce(function(a, group) {
            return a || group.includes(v);
          }, false);
        };

        return [].concat(
          _toConsumableArray(valList.filter(removeOverridenValues)),
          [val]
        );
      }, [])
    );
  } else {
    return _defineProperty({}, key, valuesArray);
  }
}

function getOverrideGroups(key, val) {
  if (key === 'standalone' && standaloneClassesArray.includes(val)) {
    return _standaloneClasses.default.filter(function(c) {
      return c.includes(val);
    });
  } else if (adjustableClassesArray.includes(key)) {
    return _adjustableClasses.default[key].filter(function(c) {
      return c.includes(val);
    });
  } else if (key === 'extraClasses') {
    return [[]];
  } else {
    throw Error('Unrecognized key: '.concat(key));
  }
}

function formatBatchData(key, value) {
  var isExtra = key === 'extraClasses';

  if (standaloneClassesArray.includes(key) && isBool(value)) {
    return ['standalone', key];
  } else if (isExtra || adjustableClassesArray.includes(key)) {
    return [key, value];
  } else {
    throw Error('Unrecognized key: '.concat(key));
  }
}
