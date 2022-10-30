import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';
  type: string = '';

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert | undefined;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  ngOnInit(): void {
    setTimeout(() => this.staticAlert?.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage(message: any, type: any) {
    this.type = type;
    this._success.next(`${message}`);
  }
}