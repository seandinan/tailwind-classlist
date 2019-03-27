import classList from './classList';
import parseClasses from './parseClassList';
import ADJUSTABLE_CLASSES from './constants/adjustableClasses';
import STANDALONE_CLASSES from './constants/standaloneClasses';

const FLATTENED_STANDALONE_CLASSES = STANDALONE_CLASSES.reduce(
  (a, b) => [...a, ...b],
  []
);

const ADJUSTABLE_CLASS_KEYS = Object.keys(ADJUSTABLE_CLASSES);

const includes = (val) => (arr) => arr.includes(val);

const getCommonValues = (arr1, arr2) => arr1.filter((v) => arr2.includes(v));

export default function mergeClassLists() {
  const classLists = [...arguments].map(parseClasses);
  // Each successive classList object overwrites the previous one
  // Use the combinations in the constants files to determine whether or not something belongs to an overwrite family
  let result = classLists.reduce((a, b) => {
    let classes = { ...a };
    Object.keys(b).forEach((key) => {
      if (!classes[key]) {
        if (FLATTENED_STANDALONE_CLASSES.includes(key)) {
          const category = STANDALONE_CLASSES.filter(includes(key))[0];
          const matches = getCommonValues(Object.keys(classes), category);
          if (matches.length > 0) delete classes[matches[0]];
          classes[key] = b[key];
        } else {
          classes[key] = b[key];
        }
      } else {
        if (key === 'extraClasses') {
          classes[key] += ` ${b[key]}`;
        } else if (FLATTENED_STANDALONE_CLASSES.includes(key)) {
          // It's fine as it is (value will just be `true`).
          return;
        } else if (ADJUSTABLE_CLASS_KEYS.includes(key)) {
          // Iterate through array of arrays to see where the value is
          const category = ADJUSTABLE_CLASSES[key].filter(includes(b[key]))[0];
          if (typeof classes[key] === 'string') {
            if (category.includes(classes[key])) {
              // It needs to to be overwritten
              classes[key] = b[key];
            }
          } else if (classes[key] instanceof Array) {
            classes[key] = classes[key].map((existingVal) => {
              if (category.includes(existingVal)) {
                return b[key];
              } else return existingVal;
            });
          } else {
            console.error('unable to process key: ', key);
          }
        } else if (classes[key] instanceof Object) {
          classes[key] = parseClasses(
            mergeClassLists(classList(classes[key]), classList(b[key]))
          );
        } else {
          console.error('unable to process key: ', key);
        }
      }
    });
    return classes;
  }, {});
  return classList(result);
}
