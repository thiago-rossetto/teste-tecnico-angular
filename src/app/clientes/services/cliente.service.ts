import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlApi: string = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  listarClientes() {
    return this.http.get<Cliente[]>(this.urlApi + '/clientes').pipe(first());
  }

  listarClientePorId(idCliente: number) {
    return this.http.get<Cliente>(this.urlApi + `/clientes/${idCliente}`).pipe(first());
  }

  cadastrarCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.urlApi + '/clientes', cliente).pipe(first());
  }

  atualizarCliente(cliente: Cliente) {
    return this.http.put<Cliente>(this.urlApi + `/clientes/${cliente.id}`, cliente).pipe(first());
  }

  excluirCliente(idCliente: number) {
    return this.http.delete<Cliente>(this.urlApi + `/clientes/${idCliente}`).pipe(first());
  }

}
