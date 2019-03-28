'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _classList;

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

function _classList(classObject) {
  var extraClasses = '';
  var classString = Object.keys(classObject)
    .reduce(function(a, key) {
      if (key === 'extraClasses') {
        extraClasses += ''.concat(classObject[key], ' ');
        return a;
      }

      if (classObject[key] instanceof Array) {
        return [].concat(
          _toConsumableArray(a),
          _toConsumableArray(
            classObject[key].map(function(val) {
              return val === true ? key : ''.concat(key, '-').concat(val);
            })
          )
        );
      }

      if (classObject[key] instanceof Object) {
        return [].concat(
          _toConsumableArray(a),
          _toConsumableArray(getSubclassList(classObject, key))
        );
      }

      if (classObject[key] === true) {
        return [].concat(_toConsumableArray(a), [key]);
      }

      return [].concat(_toConsumableArray(a), [
        ''.concat(key, '-').concat(classObject[key]),
      ]);
    }, [])
    .join(' ');
  return ''.concat(extraClasses).concat(classString);
}

function getSubclassList(classObject, key) {
  return Object.keys(classObject[key]).reduce(function(result, subkey) {
    if (classObject[key][subkey] === true) {
      return [].concat(_toConsumableArray(result), [
        ''.concat(key, ':').concat(subkey),
      ]);
    } else if (classObject[key][subkey] instanceof Object) {
      return [].concat(_toConsumableArray(result), [
        ''
          .concat(key, ':')
          .concat(subkey, ':')
          .concat(_classList(classObject[key][subkey])),
      ]);
    } else {
      return [].concat(_toConsumableArray(result), [
        ''
          .concat(key, ':')
          .concat(subkey, '-')
          .concat(classObject[key][subkey]),
      ]);
    }
  }, []);
}
