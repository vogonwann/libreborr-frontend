import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteArrayToBase64',
  standalone: true
})
export class ByteArrayToBase64Pipe implements PipeTransform {

  transform(value: Uint8Array): string {
    if (!value) {
      return '';
    }

    // Pretvori Uint8Array u string
    const binaryString = Array.from(value)
      .map(byte => String.fromCharCode(byte))
      .join('');

    // Konvertuj string u Base64
    const base64String = btoa(binaryString);

    return `data:image/png;base64,${binaryString}`;
  }

}
