import { ByteArrayToBase64Pipe } from './byte-array-to-base64.pipe';

describe('ByteArrayToBase64Pipe', () => {
  it('create an instance', () => {
    const pipe = new ByteArrayToBase64Pipe();
    expect(pipe).toBeTruthy();
  });
});
