import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    value: string[] | number[],
    direction: 'asc' | 'desc' = 'asc' // default value = asc
    // ): unknown {
    // return type
    // but we let typescript infer return type, by removing it
  ) {
    const sorted = [...value]; // copy elements into new array
    sorted.sort((a, b) => {
      if (direction === 'asc') {
        return a > b ? 1 : -1; //smaller value in front
      } else {
        return a > b ? -1 : 1; // bigger value in front
      }
    }); //.sort() mutates the array
    return sorted;
  }
}
