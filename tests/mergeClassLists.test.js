import { classList, mergeClassLists } from './../index';
// import classList from './../src/classList';
// import mergeClassLists from './../src/mergeClassLists';

describe('mergeClassList', () => {
  it('merges 2 basic classLists together', () => {
    const a = 'bg-blue-500 m-4';
    const b = 'bg-red-500 p-4';
    const result = 'bg-red-500 m-4 p-4';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with batched key values together', () => {
    const a = 'bg-blue-500 bg-bottom m-4';
    const b = 'bg-red-500 p-4';
    const result = 'bg-bottom bg-red-500 m-4 p-4';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with multiple batched key values together', () => {
    const a = 'bg-blue-500 bg-bottom text-xs m-4 static';
    const b = 'bg-red-500 p-4 text-lg fixed';
    const result = 'bg-bottom bg-red-500 text-lg m-4 p-4 fixed';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it(`merges 2 classLists with classes that aren't valid Tailwind classes`, () => {
    const a = 'bg-blue-500 text-xs sc-0dWm9Vdw2';
    const b = 'bg-red-500 fixed test-class';
    const result = 'sc-0dWm9Vdw2 test-class bg-red-500 text-xs fixed';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with single prefixes', () => {
    const a = 'bg-blue-500 hover:bg-blue-600';
    const b = 'bg-red-500 hover:bg-red-600 fixed';
    const result = 'bg-red-500 fixed hover:bg-red-600';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with double prefixes', () => {
    const a =
      'bg-blue-500 md:hover:bg-blue-600 sm:hover:bg-blue-400 hover:bg-blue-200';
    const b = 'bg-red-500 md:hover:bg-red-600 hover:bg-red-600 fixed';
    const result =
      'bg-red-500 fixed md:hover:bg-red-600 sm:hover:bg-blue-400 hover:bg-red-600';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with common keys between adjustable & standalone classes', () => {
    const a = classList({
      bg: 'blue-600',
      'inline-flex': true,
      flex: ['col', 'no-shrink', 'no-grow'],
      justify: 'between',
      h: 'full',
    });
    const b = classList({
      flex: true,
    });

    const result =
      'bg-blue-600 flex flex-col flex-no-shrink flex-no-grow justify-between h-full';
    expect(mergeClassLists(a, b)).toEqual(result);
  });
});
