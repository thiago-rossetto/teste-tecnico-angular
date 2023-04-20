import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cancelar() {
    this.closeMeEvent.emit();
  }

  confirmar() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }
}
