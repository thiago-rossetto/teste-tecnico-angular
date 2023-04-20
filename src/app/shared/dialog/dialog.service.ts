import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from './dialog.component';


@Injectable({ providedIn: 'root' })
export class DialogService {
  private componentRef!: ComponentRef<DialogComponent>;
  private componentSubscriber!: Subject<boolean>;
  constructor(private resolver: ComponentFactoryResolver) {}

  open(entry: ViewContainerRef, dialogTitle: string, dialogBody: string) {
    let factory = this.resolver.resolveComponentFactory(DialogComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = dialogTitle;
    this.componentRef.instance.body = dialogBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.cancelar());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirmar());
    this.componentSubscriber = new Subject<boolean>();
    return this.componentSubscriber.asObservable();
  }

  cancelar() {
    this.componentSubscriber.next(false);
    this.completar();
  }

  confirmar() {
    this.componentSubscriber.next(true);
    this.completar();
  }

  completar() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
