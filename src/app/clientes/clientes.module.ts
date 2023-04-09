import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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
    NgxMaskPipe
  ],
  declarations: [
    ListaClientesComponent,
    FormularioClienteComponent
  ],
  providers: [provideNgxMask()]
})
export class ClientesModule { }
