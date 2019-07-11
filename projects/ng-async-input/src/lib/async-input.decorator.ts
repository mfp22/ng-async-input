import { SimpleChanges } from '@angular/core';

export function AsyncInput(inputName?: string) {
  return (target, rxInputName: string) => {
    inputName = inputName || rxInputName.slice(0, -1); // Remove '$' ('data$' => 'data')
    const oldOnChanges = target.ngOnChanges;
    const oldOnDestroy = target.ngOnDestroy;

    target.ngOnChanges = function(changes: SimpleChanges) {
      const inputChange = changes[inputName];
      if (inputChange) {
        const useDefault =
          inputChange.isFirstChange && inputChange.currentValue === undefined;
        if (!useDefault) {
          this[rxInputName].next(changes[inputName].currentValue);
        }
      }
      if (oldOnChanges) {
        oldOnChanges.bind(this)(changes);
      }
    };

    target.ngOnDestroy = function() {
      this[rxInputName].next();
      this[rxInputName].complete();
      if (oldOnDestroy) {
        oldOnDestroy.bind(this)();
      }
    };
  };
}
