import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data) {
        this.data;
     }
}