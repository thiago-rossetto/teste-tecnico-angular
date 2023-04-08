import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioClienteComponent } from './components/formulario-cliente/formulario-cliente.component';

import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'adicionar-cliente', component: FormularioClienteComponent },
  { path: 'alterar-dados-cliente/:id', component: FormularioClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }