import { parseClassList } from './../index';

describe('parseClassList', () => {
  it('parses a basic TailwindCSS classlist', () => {
    const classList = 'bg-blue text-white font-bold py-2 px-4 rounded';
    const result = {
      bg: 'blue',
      text: 'white',
      font: 'bold',
      px: '4',
      py: '2',
      rounded: true,
    };
    expect(parseClassList(classList)).toEqual(result);
  });

  it('parses a classlist with multiple values for one key', () => {
    const classList = 'bg-blue text-white text-lg font-bold py-2 px-4 rounded';
    const result = {
      bg: 'blue',
      text: ['white', 'lg'],
      font: 'bold',
      px: '4',
      py: '2',
      rounded: true,
    };
    expect(parseClassList(classList)).toEqual(result);
  });

  it('parses a classlist with a state variant in it', () => {
    const classList =
      'bg-blue hover:bg-blue-darker text-white text-lg font-bold rounded';
    const result = {
      bg: 'blue',
      hover: {
        bg: 'blue-darker',
      },
      text: ['white', 'lg'],
      font: 'bold',
      rounded: true,
    };
    expect(parseClassList(classList)).toEqual(result);
  });

  it('parses a classlist with a responsive prefix in it', () => {
    const classList = 'bg-blue md:text-sm text-white text-lg font-bold rounded';
    const result = {
      bg: 'blue',
      md: {
        text: 'sm',
      },
      text: ['white', 'lg'],
      font: 'bold',
      rounded: true,
    };
    expect(parseClassList(classList)).toEqual(result);
  });

  it('parses a classlist with a responsive prefix & a state variant in it', () => {
    const classList =
      'bg-blue md:hover:text-blue md:text-sm ' +
      'text-white text-lg font-bold rounded';
    const result = {
      bg: 'blue',
      md: [{ hover: { text: 'blue' } }, { text: 'sm' }],
      text: ['white', 'lg'],
      font: 'bold',
      rounded: true,
    };
    expect(parseClassList(classList)).toEqual(result);
  });

  it(`pull out any classes that don't match the Tailwind values`, () => {
    const classList =
      'bg-blue md:text-sm other-class externalclass sc-0dCml3mK';
    const result = {
      bg: 'blue',
      md: { text: 'sm' },
      extraClasses: ['other-class', 'externalclass', 'sc-0dCml3mK'],
    };
    expect(parseClassList(classList)).toEqual(result);
  });
});
