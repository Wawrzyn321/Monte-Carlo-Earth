import { CoordinateFormatterPipe } from './coordinate-formatter.pipe';

describe('CoordinateFormatterPipe', () => {

  const testCases = [
    {
      input: {
        value: 0,
        positivePrefix: 'N',
        negativePrefix: 'S'
      },
      expected: `${0}° ${0}' ${0}'' N`
    },
    {
      input: {
        value: 0,
        positivePrefix: 'E',
        negativePrefix: 'W'
      },
      expected: `${0}° ${0}' ${0}'' E`
    },
    {
      input: {
        value: 90,
        positivePrefix: 'N',
        negativePrefix: 'S'
      },
      expected: `${90}° ${0}' ${0}'' N`
    },
    {
      input: {
        value: 180,
        positivePrefix: 'E',
        negativePrefix: 'W'
      },
      expected: `${180}° ${0}' ${0}'' E`
    },
    {
      input: {
        value: -90,
        positivePrefix: 'N',
        negativePrefix: 'S'
      },
      expected: `${90}° ${0}' ${0}'' S`
    },
    {
      input: {
        value: -180,
        positivePrefix: 'E',
        negativePrefix: 'W'
      },
      expected: `${180}° ${0}' ${0}'' W`
    },
    {
      input: {
        value: -12.102,
        positivePrefix: 'N',
        negativePrefix: 'S'
      },
      expected: `${12}° ${6}' ${7}'' S`
    },
    {
      input: {
        value: 55.378,
        positivePrefix: 'E',
        negativePrefix: 'W'
      },
      expected: `${55}° ${22}' ${40}'' E`
    },
    {
      input: {
        value: 142.5555555,
        positivePrefix: 'N',
        negativePrefix: 'S'
      },
      expected: `${142}° ${33}' ${19}'' N`
    },
    {
      input: {
        value: -20.11,
        positivePrefix: 'E',
        negativePrefix: 'W'
      },
      expected: `${20}° ${6}' ${35}'' W`
    }
  ];

  const stringifyInput = (t: any) =>
    `${t.input.value}(${t.input.positivePrefix}/${t.input.negativePrefix}`;

  testCases.forEach(testCase => {
    it(`converts ${stringifyInput(testCase)} to ${testCase.expected})`, () => {
      const pipe = new CoordinateFormatterPipe();

      const result: String = pipe.transform(testCase.input.value,
        testCase.input.positivePrefix,
        testCase.input.negativePrefix);

      expect(result).toBe(testCase.expected);
    });
  });
});
