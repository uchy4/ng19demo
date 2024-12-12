import { Pipe, PipeTransform } from '@angular/core';
import { toEllipsis } from './pipe.utils';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, length: number = 20): string {
    return toEllipsis(value, length);
  }
}
