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
  scrolling: [['touch', 'auto']],
  z: [['0', '10', '20', '30', '40', '50', 'auto']],
  text: [
    _toConsumableArray(_colors.default),
    ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
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
  tracking: [['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']],
  leading: [['none', 'tight', 'snug', 'normal', 'relaxed', 'loose']],
  align: [['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom']],
  list: [['none', 'disc', 'decimal'], ['inside', 'outside']],
  whitespace: [['normal', 'no-wrap', 'pre', 'pre-line', 'pre-wrap']],
  break: [['words', 'normal', 'all']],
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
    [
      'repeat',
      'no-repeat',
      'repeat-x',
      'repeat-y',
      'repeat-round',
      'repeat-space',
    ],
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
  order: [
    [
      'first',
      'last',
      'none',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ],
  ],
  rounded: [
    [true, 'none', 'sm', 'lg', 'full'],
    [
      't-none',
      'l-none',
      't-sm',
      'l-sm',
      't',
      'l',
      't-lg',
      'l-lg',
      't-full',
      'l-full',
      'tl-none',
      'tl-sm',
      'tl',
      'tl-lg',
      'tl-full',
    ],
    [
      't-none',
      'r-none',
      't-sm',
      'r-sm',
      't',
      'r',
      't-lg',
      'r-lg',
      't-full',
      'r-full',
      'tr-none',
      'tr-sm',
      'tr',
      'tr-lg',
      'tr-full',
    ],
    [
      'b-none',
      'l-none',
      'b-sm',
      'l-sm',
      'b',
      'l',
      'b-lg',
      'l-lg',
      'b-full',
      'l-full',
      'bl-none',
      'bl-sm',
      'bl',
      'bl-lg',
      'bl-full',
    ],
    [
      'b-none',
      'r-none',
      'b-sm',
      'r-sm',
      'b',
      'r',
      'b-lg',
      'r-lg',
      'b-full',
      'r-full',
      'br-none',
      'br-sm',
      'br',
      'br-lg',
      'br-full',
    ],
  ],
  flex: [
    ['row', 'row-reverse', 'col', 'col-reverse'],
    ['wrap', 'no-wrap', 'wrap-reverse'],
    ['initial', '1', 'auto', 'none'],
    ['grow', 'grow-0'],
    ['shrink', 'shrink-0'],
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
      '2/4',
      '3/4',
      '1/5',
      '2/5',
      '3/5',
      '4/5',
      '1/6',
      '2/6',
      '3/6',
      '4/6',
      '5/6',
      '1/12',
      '2/12',
      '3/12',
      '4/12',
      '5/12',
      '6/12',
      '7/12',
      '8/12',
      '9/12',
      '10/12',
      '11/12',
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
      'w-6xl',
      'w-full',
    ],
    ['h-full', 'h-screen'],
  ],
  table: [['auto', 'fixed']],
  shadow: [[true, 'md', 'lg', 'xl', '2xl', 'inner', 'outline', 'none']],
  opacity: [['100', '75', '50', '25', '0']],
  cursor: [
    ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'not-allowed'],
  ],
  pointer: [['events-none', 'events-auto']],
  resize: [[true, 'none', 'x', 'y']],
  select: [['none', 'text', 'all', 'auto']],
});
var _default = ADJUSTABLE_CLASSES;
exports.default = _default;
