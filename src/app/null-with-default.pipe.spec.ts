import { NullWithDefaultPipe } from './null-with-default.pipe';

describe('NullWithDefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new NullWithDefaultPipe();
    expect(pipe).toBeTruthy();
  });
});
