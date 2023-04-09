import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlApi: string = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  listarClientes() {
    return this.http.get<any>(this.urlApi + '/clientes').pipe(first());
  }

  listarClientePorId(idCliente: number) {
    return this.http.get<any>(this.urlApi + `/clientes/${idCliente}`).pipe(first());
  }

  cadastrarCliente(cliente: any) {
    return this.http.post<any>(this.urlApi + '/clientes', cliente).pipe(first());
  }

  atualizarCliente(cliente: any) {
    return this.http.put<any>(this.urlApi + `/clientes/${cliente.id}`, cliente).pipe(first());
  }

  excluirCliente(idCliente: number) {
    return this.http.delete<any>(this.urlApi + `/clientes/${idCliente}`).pipe(first());
  }

}
