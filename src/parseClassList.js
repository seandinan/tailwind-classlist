import STANDALONE_CLASSES from './constants/standaloneClasses';
import ADJUSTABLE_CLASSES from './constants/adjustableClasses';
import RESPONSIVE_PREFIXES from './constants/responsivePrefixes';
import STATE_VARIANT_PREFIXES from './constants/stateVariantPrefixes';

const FLATTENED_STANDALONE_CLASSES = STANDALONE_CLASSES.reduce(
  (a, b) => [...a, ...b],
  []
);

const ADJUSTABLE_CLASS_KEYS = Object.keys(ADJUSTABLE_CLASSES);

const isPrefix = (val) => {
  return (
    RESPONSIVE_PREFIXES.includes(val) || STATE_VARIANT_PREFIXES.includes(val)
  );
};

const isValidTailwindClass = (val) => {
  return (
    FLATTENED_STANDALONE_CLASSES.includes(val) ||
    ADJUSTABLE_CLASS_KEYS.includes(val)
  );
};

const classNameRegex = /^-?[a-z:]+-/;

const isClassnameStart = (val) => {
  return val.match(classNameRegex) && val.split(classNameRegex);
};

export default function _parseClasses(classList) {
  let extraClasses = [];
  const parsedClasses = classList
    .split(' ')
    .reduce((a, b) => {
      const isStandaloneClass = FLATTENED_STANDALONE_CLASSES.includes(b);
      const isCompleteAdjustableClass = ADJUSTABLE_CLASS_KEYS.includes(b);

      if (isStandaloneClass || isCompleteAdjustableClass) {
        return [...a, { [b]: true }];
      }

      if (!isClassnameStart(b)) {
        extraClasses.push(b);
        return a;
      }

      const key = b.match(classNameRegex)[0];
      const value = b.split(classNameRegex)[1];

      const trim = (val) => val.slice(0, -1);

      if (key.includes(':')) {
        let keys = key.split(':');
        if (keys.length === 2) {
          if (isPrefix(keys[0])) {
            return [
              ...a,
              {
                [keys[0]]: {
                  [trim(keys[1])]: value,
                },
              },
            ];
          } else {
            extraClasses.push(b);
            return a;
          }
        } else if (keys.length === 3) {
          return [
            ...a,
            {
              [keys[0]]: {
                [keys[1]]: {
                  [trim(keys[2])]: value,
                },
              },
            },
          ];
        }
        return [...a, { [trim(key)]: value }];
      }

      if (isValidTailwindClass(trim(key))) {
        return [...a, { [trim(key)]: value }];
      } else {
        extraClasses.push(b);
        return a;
      }
    }, [])
    .reduce(mergeSubObject, {});
  return extraClasses.length > 0
    ? { ...parsedClasses, extraClasses }
    : parsedClasses;
}

function mergeSubObject(obj, subobj) {
  const key = Object.keys(subobj)[0];
  if (obj[key] && obj[key] instanceof Array) {
    return { ...obj, [key]: [...obj[key], subobj[key]] };
  } else if (obj[key]) {
    return { ...obj, [key]: [obj[key], subobj[key]] };
  } else {
    return { ...obj, [key]: subobj[key] };
  }
}
