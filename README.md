# tailwind-classlist

This library provides a few utility functions to simplify use of [TailwindCSS](https://tailwindcss.com) in Javascript. Its primary purpose is to make it easier to create and combine className strings in JSX.

This repository follows [semver](https://semver.org/) versioning and any versions prior to 1.x.x are liable to experience changes in later releases and contain bugs.

---

## Methods

### `classList`
The `classList` method accepts an object that defines the TailwindCSS classes that you wish to use. It converts this object into a string of classnames.

For basic cases, you simply provide an object where the keys are the part of a Tailwind class before the first `-`. For example, `text-center` would be represented by `{ text: 'center' }` and `bg-blue-darker` would be represented by `{ bg: 'blue-darker' }`.

```javascript
import { classList } from 'tailwind-classlist';

const classes = classList({
  m: 2,
  cursor: 'pointer',
  bg: 'grey-light',
});

// Outputs "m-2 cursor-pointer bg-grey-light"
```

To use multiple classes with the same Tailwind prefix, group them together into an array.

```javascript
const classes = classList({
  text: ['lg', 'grey-dark']
});

// Outputs "text-lg text-grey-dark"
```

To use state variants and responsive prefixes, group them together into an object.

```javascript
const classes = classList({
  bg: 'white',
  text: 'red-light',
  hover: { 
  	bg: 'red-light', 
  	text: 'white',
  },
  focus: {
  	outline: 'none',
  },
  md: {
  	text: 'lg',
  }
});

// Outputs "bg-white text-red-light hover:bg-red-light hover:text-white focus:outline-none"
```

To use both state variants *and* responsive prefixes, use a nested object that begins with the responsive prefix first.

```javascript
const classes = classlist({
  md: {
  	hover: {
  		bg: 'red-darker',
  		text: 'blue-light',
  	}
  }  
});

// Outputs "md:hover:bg-red-darker md:hover:text-blue-light"
```

Some classes in Tailwind don't have any dashes in their name. These can be included by setting their value to `true`.

```javascript
const classes = classList({
  fixed: true,
  italic: true,
});

// Outputs "fixed italic"
```
---
### `mergeClassLists`
The `mergeClassLists` method accepts 2 or more classList strings and merges them together, overwriting any conflicting classes as it goes.

```javascript
import { mergeClassLists } from 'tailwind-classlist';

const classListA = 'bg-blue m-4';
const classListB = 'bg-red p-4';
const combinedClasses = mergeClassLists(classListA, classListB); 

// Outputs 'bg-red m-4 p-4'
```

It recognizes when multiple classes have the same prefix but shouldn't overwrite eachother. In the example below, `bg-red` overwrites `bg-blue`, but it has no effect on `bg-bottom`.
```javascript
const classListA = 'bg-blue bg-bottom m-4';
const classListB = 'bg-red p-4';
const combinedClasses = mergeClassLists(classListA, classListB);

// Outputs 'bg-red bg-bottom m-4 p-4';
```

Similarly, it recognizes classes with conflicting styles that don't have the same prefix. In the example below, `static` and `fixed` both affect the `position` CSS property, so `fixed` will overwrite `static`.
```javascript
const classListA = 'bg-blue bg-bottom text-xs m-4 static';
const classListB = 'bg-red p-4 text-lg fixed';
const result = mergeClassLists(classListA, classListB);

// Outputs 'bg-red bg-bottom text-lg m-4 p-4 fixed'
```

Any classes that aren't part of the default Tailwind library will pass through without any filtering.
```javascript
const classListA = 'bg-blue text-xs sc-0dWm9Vdw2';
const classListB = 'bg-red fixed test-class';
const result = mergeClassLists(classListA, classListB);

// Outputs 'sc-0dWm9Vdw2 test-class bg-red text-xs fixed'
```
---
### `parseClassList`
The `parseClassList` method performs the opposite operation as classList. It takes a string of classnames and returns a parsed classList object. Any classes that aren't a part of the default Tailwind library will be grouped into an array under the key `extraKeys`.

```javascript
import { parseClassList } from 'tailwind-classlist';

const classes = 'm-2 cursor-pointer bg-grey-light';
const classObj = parseClassList(classes);
// Outputs { m: 2, cursor: 'pointer', bg: 'grey-light' };
```

```javascript
const classes = 'm-2 cursor-pointer sc-8d3jd6Ko customclass';
const classObj = parseClassList(classes);
// Outputs { m: 2, cursor: 'pointer', extraClasses: ['sc-8d3jd6Ko', 'customclass'] };
```

