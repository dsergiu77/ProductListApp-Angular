import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(value: string, charToBeReplaced: string): string {
        return value.replace(charToBeReplaced, ' ');
    }
}
