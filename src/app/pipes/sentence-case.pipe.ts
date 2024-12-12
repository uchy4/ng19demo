import { Pipe, PipeTransform } from '@angular/core';
import { toSentenceCase } from './pipe.utils';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string): string {
    return toSentenceCase(value);
  }
}
