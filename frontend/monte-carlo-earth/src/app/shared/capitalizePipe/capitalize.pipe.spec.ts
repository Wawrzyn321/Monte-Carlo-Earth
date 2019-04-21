import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('capitalizes lowercase string', () => {
  const pipe = new CapitalizePipe();

  const result: string = pipe.transform('whole lot more');

  expect(result).toBe('Whole lot more');
  });

  it('capitalizes uppercase string', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform('CODE');

    expect(result).toBe('Code');
  });

  it('capitalizes randomcase string', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform('toBeTruthy');

    expect(result).toBe('Tobetruthy');
  });

  it('capitalizes single letter', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform('r');

    expect(result).toBe('R');
  });

  it('returns empty on empty input', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform('');

    expect(result).toBe('');
  });

  it('returns empty on undefined', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform(undefined);

    expect(result).toBe('');
  });

  it('return empty on null input', () => {
    const pipe = new CapitalizePipe();

    const result: string = pipe.transform(null);

    expect(result).toBe('');
  });
});
