import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormularioClienteComponent } from './components/formulario-cliente/formulario-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NgxCurrencyModule,
    SharedModule
  ],
  declarations: [
    ListaClientesComponent,
    FormularioClienteComponent
  ],
  providers: [provideNgxMask()]
})
export class ClientesModule { }
