import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


export const routeAnimation = trigger('routeAnimation', [
  state('*', style({opacity: 1})),
  transition('* <=> *', [
    style({opacity: 0}),
    animate('300ms 150ms ease-out',
      style({opacity: 1})),
  ]),
]);
