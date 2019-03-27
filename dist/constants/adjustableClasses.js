'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _colors = _interopRequireDefault(require('./colors'));

var _spacing = _interopRequireDefault(require('./spacing'));

var _sizing = _interopRequireDefault(require('./sizing'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var ADJUSTABLE_CLASSES = Object.freeze({
  float: [['right', 'left', 'none']],
  object: [
    ['contain', 'cover', 'fill', 'none', 'scale-down'],
    [
      'bottom',
      'center',
      'left',
      'left-bottom',
      'left-top',
      'right',
      'right-bottom',
      'right-top',
      'top',
    ],
  ],
  overflow: [
    ['auto', 'hidden', 'visible', 'scroll'],
    ['x-auto', 'x-hidden', 'x-visible', 'x-scroll'],
    ['y-auto', 'y-hidden', 'y-visible', 'y-scroll'],
  ],
  pin: [[true, 't', 'r', 'b', 'l', 'y', 'x', 'none']],
  z: [['0', '10', '20', '30', '40', '50', 'auto']],
  text: [
    _toConsumableArray(_colors.default),
    ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    ['left', 'center', 'right', 'justify'],
  ],
  font: [
    ['sans', 'serif', 'mono'],
    [
      'hairline',
      'thin',
      'light',
      'normal',
      'medium',
      'semibold',
      'bold',
      'extrabold',
      'black',
    ],
  ],
  tracking: [['tight', 'normal', 'wide']],
  leading: [['none', 'tight', 'normal', 'loose']],
  align: [['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom']],
  whitespace: [['normal', 'no-wrap', 'pre', 'pre-line', 'pre-wrap']],
  break: [['words', 'normal']],
  bg: [
    _toConsumableArray(_colors.default),
    ['fixed', 'local', 'scroll'],
    [
      'bottom',
      'center',
      'left',
      'left-bottom',
      'left-top',
      'right',
      'right-bottom',
      'right-top',
      'top',
    ],
    ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'],
    ['auto', 'cover', 'contain'],
  ],
  border: [
    _toConsumableArray(_colors.default),
    ['collapse', 'separate'],
    ['solid', 'dashed', 'dotted', 'none'],
    ['t', 't-0', 't-2', 't-4', 't-8'],
    ['r', 'r-0', 'r-2', 'r-4', 'r-8'],
    ['b', 'b-0', 'b-2', 'b-4', 'b-8'],
    ['l', 'l-0', 'l-2', 'l-4', 'l-8'],
  ],
  rounded: [
    [
      true,
      'none',
      'sm',
      'lg',
      'full',
      't-none',
      'r-none',
      'b-none',
      'l-none',
      't-sm',
      'r-sm',
      'b-sm',
      'l-sm',
      't',
      'r',
      'b',
      'l',
      't-lg',
      'r-lg',
      'b-lg',
      'l-lg',
      't-full',
      'r-full',
      'b-full',
      'l-full',
      'tl-none',
      'tr-none',
      'br-none',
      'bl-none',
      'tl-sm',
      'tr-sm',
      'br-sm',
      'bl-sm',
      'tl',
      'tr',
      'br',
      'bl',
      'tl-lg',
      'tr-lg',
      'br-lg',
      'bl-lg',
      'tl-full',
      'tr-full',
      'br-full',
      'bl-full',
    ],
  ],
  flex: [
    ['row', 'row-reverse', 'col', 'col-reverse'],
    ['wrap', 'no-wrap', 'wrap-reverse'],
    ['initial', '1', 'auto', 'none'],
    ['grow', 'no-grow'],
    ['shrink', 'no-shrink'],
  ],
  items: [['stretch', 'start', 'center', 'end', 'baseline']],
  content: [['start', 'center', 'end', 'between', 'around']],
  self: [['start', 'center', 'end', 'auto', 'stretch']],
  justify: [['start', 'center', 'end', 'between', 'around']],
  p: [_toConsumableArray(_spacing.default)],
  m: [_toConsumableArray(_spacing.default)],
  '-m': [_toConsumableArray(_spacing.default)],
  pt: [_toConsumableArray(_spacing.default)],
  mt: [_toConsumableArray(_spacing.default)],
  '-mt': [_toConsumableArray(_spacing.default)],
  pr: [_toConsumableArray(_spacing.default)],
  mr: [_toConsumableArray(_spacing.default)],
  '-mr': [_toConsumableArray(_spacing.default)],
  pb: [_toConsumableArray(_spacing.default)],
  mb: [_toConsumableArray(_spacing.default)],
  '-mb': [_toConsumableArray(_spacing.default)],
  pl: [_toConsumableArray(_spacing.default)],
  ml: [_toConsumableArray(_spacing.default)],
  '-ml': [_toConsumableArray(_spacing.default)],
  px: [_toConsumableArray(_spacing.default)],
  mx: [_toConsumableArray(_spacing.default)],
  '-mx': [_toConsumableArray(_spacing.default)],
  py: [_toConsumableArray(_spacing.default)],
  my: [_toConsumableArray(_spacing.default)],
  '-my': [_toConsumableArray(_spacing.default)],
  w: [
    [].concat(_toConsumableArray(_sizing.default), [
      '1/2',
      '1/3',
      '2/3',
      '1/4',
      '3/4',
      '1/5',
      '2/5',
      '3/5',
      '4/5',
      '1/6',
      '5/6',
      'full',
      'screen',
    ]),
  ],
  h: [[].concat(_toConsumableArray(_sizing.default), ['full', 'screen'])],
  min: [['w-0', 'w-full'], ['h-0', 'h-full', 'h-screen']],
  max: [
    [
      'w-xs',
      'w-sm',
      'w-md',
      'w-lg',
      'w-xl',
      'w-2xl',
      'w-3xl',
      'w-4xl',
      'w-5xl',
      'w-full',
    ],
    ['h-full', 'h-screen'],
  ],
  table: [['auto', 'fixed']],
  shadow: [[true, 'md', 'lg', 'inner', 'outline', 'none']],
  opacity: [['100', '75', '50', '25', '0']],
  cursor: [['auto', 'default', 'pointer', 'wait', 'move', 'not-allowed']],
  pointer: [['events-none', 'events-auto']],
  resize: [[true, 'none', 'x', 'y']],
  select: [['none', 'text']],
});
var _default = ADJUSTABLE_CLASSES;
exports.default = _default;
