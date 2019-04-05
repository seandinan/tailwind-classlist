export default function _classList(classObject) {
  let extraClasses = '';
  const classString = Object.keys(classObject)
    .reduce((a, key) => {
      if (key === 'extraClasses') {
        extraClasses += `${classObject[key].join(' ')} `;
        return a;
      }
      if (classObject[key] instanceof Array) {
        return [
          ...a,
          ...classObject[key].map((val) =>
            val === true ? key : `${key}-${val}`
          ),
        ];
      }
      if (classObject[key] instanceof Object) {
        return [...a, ...getSubclassList(classObject, key)];
      }
      if (classObject[key] === true) {
        return [...a, key];
      }
      return [...a, `${key}-${classObject[key]}`];
    }, [])
    .join(' ');
  return `${extraClasses}${classString}`;
}

function getSubclassList(classObject, key) {
  return Object.keys(classObject[key]).reduce((result, subkey) => {
    if (classObject[key][subkey] === true) {
      return [...result, `${key}:${subkey}`];
    } else if (classObject[key][subkey] instanceof Object) {
      return [
        ...result,
        `${key}:${subkey}:${_classList(classObject[key][subkey])}`,
      ];
    } else {
      return [...result, `${key}:${subkey}-${classObject[key][subkey]}`];
    }
  }, []);
}
