import _classList from './classList';
import parseClasses from './parseClassList';
import ADJUSTABLE_CLASSES from './constants/adjustableClasses';
import STANDALONE_CLASSES from './constants/standaloneClasses';

const adjustableClassesArray = Object.keys(ADJUSTABLE_CLASSES);
const standaloneClassesArray = STANDALONE_CLASSES.reduce((a, b) => {
  return [...a, ...b];
}, []);

const isString = (val) => typeof val === 'string';
const isNumber = (val) => typeof val === 'number';
const isBool = (val) => val === true || val === false;
const isArray = (val) => val instanceof Array;
const isObject = (val) => val instanceof Object;

const isBasicValue = (val) => {
  return isString(val) || isNumber(val) || isBool(val);
};

export default function _mergeClassLists() {
  // Parse the classes lists into objects
  const parsedClasses = [...arguments].map(parseClasses);
  let prefixes = {};
  // Convert the classes object into an array of [ key, value ] pairs
  let classArray = parsedClasses.reduce((classObjArray, classObj) => {
    let classes = [];
    Object.keys(classObj).forEach((key) => {
      if (isBasicValue(classObj[key])) {
        classes.push([key, classObj[key]]);
      } else if (isArray(classObj[key])) {
        classes.push(...classObj[key].map((val) => [key, val]));
      } else if (isObject(classObj[key])) {
        if (prefixes[key]) {
          prefixes[key] = parseClasses(
            _mergeClassLists(...[prefixes[key], classObj[key]].map(_classList))
          );
        } else {
          prefixes[key] = classObj[key];
        }
      } else {
        throw new Error(`Unable to process key: ${key}`);
      }
    });
    return [...classObjArray, ...classes];
  }, []);

  // Group the individual values together
  let batchedValues = classArray.reduce((a, [key, value]) => {
    const [batchKey, batchValue] = formatBatchData(key, value);
    return {
      ...a,
      [batchKey]: a[batchKey] ? [...a[batchKey], batchValue] : [batchValue],
    };
  }, {});

  let result = Object.keys(batchedValues).reduce((a, key) => {
    const valuesArray = batchedValues[key];
    if (key !== 'standalone') {
      return { ...a, ...overrideAdjustable(key, valuesArray) };
    } else return a;
  }, {});

  if (batchedValues.standalone) {
    let standaloneList = overrideStandalone(batchedValues.standalone);
    Object.keys(standaloneList).forEach((key) => {
      if (result[key]) result[key].unshift(standaloneList[key]);
      else result[key] = [standaloneList[key]];
    });
  }
  return _classList({ ...result, ...prefixes });
}

function overrideStandalone(valuesArray) {
  return valuesArray
    .reduce((valList, val) => {
      const overrideGroup = getOverrideGroups('standalone', val)[0];
      return [...valList.filter((v) => !overrideGroup.includes(v)), val];
    }, [])
    .reduce((a, b) => {
      return { ...a, [b]: true };
    }, {});
}

function overrideAdjustable(key, valuesArray) {
  if (valuesArray.length > 1) {
    return {
      [key]: valuesArray.reduce((valList, val) => {
        const overrideGroups = getOverrideGroups(key, val);
        const removeOverridenValues = (v) => {
          return !overrideGroups.reduce((a, group) => {
            return a || group.includes(v);
          }, false);
        };
        return [...valList.filter(removeOverridenValues), val];
      }, []),
    };
  } else {
    return { [key]: valuesArray };
  }
}

function getOverrideGroups(key, val) {
  if (key === 'standalone' && standaloneClassesArray.includes(val)) {
    return STANDALONE_CLASSES.filter((c) => c.includes(val));
  } else if (adjustableClassesArray.includes(key)) {
    return ADJUSTABLE_CLASSES[key].filter((c) => c.includes(val));
  } else if (key === 'extraClasses') {
    return [[]];
  } else {
    throw Error(`Unrecognized key: ${key}`);
  }
}

function formatBatchData(key, value) {
  const isExtra = key === 'extraClasses';
  if (standaloneClassesArray.includes(key) && isBool(value)) {
    return ['standalone', key];
  } else if (isExtra || adjustableClassesArray.includes(key)) {
    return [key, value];
  } else {
    throw Error(`Unrecognized key: ${key}`);
  }
}
