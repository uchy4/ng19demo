import { Pipe, PipeTransform } from '@angular/core';

const statusLabels = [
  'Success',
  'Failed',
  'Indeterminate',
  'Pending',
  'In Progress',
  'Completed',
  'Error',
  'Approved',
  'Rejected',
  'On Hold',
  'Cancelled',
  'Active',
  'Inactive',
  'Awaiting Review',
  'Under Construction',
  'Resolved',
  'Not Started',
  'Delayed',
  'Confirmed',
  'Uncertain',
  'Finalized',
  'Stalled',
  'Escalated',
]

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    const randInt = Math.round(Math.random() * 100);
    return statusLabels[randInt % statusLabels.length];
  }
}
