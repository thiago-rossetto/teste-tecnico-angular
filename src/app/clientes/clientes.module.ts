import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { FormularioClienteComponent } from './components/formulario-cliente/formulario-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule
  ],
  declarations: [
    ListaClientesComponent,
    FormularioClienteComponent
  ]
})
export class ClientesModule { }
