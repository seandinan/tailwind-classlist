import { classList, mergeClassLists } from './../index';
// import classList from './../src/classList';
// import mergeClassLists from './../src/mergeClassLists';

describe('mergeClassList', () => {
  it('merges 2 basic classLists together', () => {
    const a = 'bg-blue m-4';
    const b = 'bg-red p-4';
    const result = 'bg-red m-4 p-4';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with batched key values together', () => {
    const a = 'bg-blue bg-bottom m-4';
    const b = 'bg-red p-4';
    const result = 'bg-bottom bg-red m-4 p-4';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with multiple batched key values together', () => {
    const a = 'bg-blue bg-bottom text-xs m-4 static';
    const b = 'bg-red p-4 text-lg fixed';
    const result = 'bg-bottom bg-red text-lg m-4 fixed p-4';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it(`merges 2 classLists with classes that aren't valid Tailwind classes`, () => {
    const a = 'bg-blue text-xs sc-0dWm9Vdw2';
    const b = 'bg-red fixed test-class';
    const result = 'sc-0dWm9Vdw2 test-class bg-red text-xs fixed';
    expect(mergeClassLists(a, b)).toEqual(result);
  });
  //
  it('merges 2 classLists with single prefixes', () => {
    const a = 'bg-blue hover:bg-blue-darker';
    const b = 'bg-red hover:bg-red-darker fixed';
    const result = 'bg-red fixed hover:bg-red-darker';
    expect(mergeClassLists(a, b)).toEqual(result);
  });

  it('merges 2 classLists with double prefixes', () => {
    const a =
      'bg-blue md:hover:bg-blue-darker sm:hover:bg-blue-light hover:bg-blue-lighter';
    const b = 'bg-red md:hover:bg-red-darker hover:bg-red-darker fixed';
    const result =
      'bg-red fixed md:hover:bg-red-darker sm:hover:bg-blue-light hover:bg-red-darker';
    expect(mergeClassLists(a, b)).toEqual(result);
  });
});
