import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { FormularioClienteComponent } from './components/formulario-cliente/formulario-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ListaClientesComponent,
    FormularioClienteComponent
  ]
})
export class ClientesModule { }
