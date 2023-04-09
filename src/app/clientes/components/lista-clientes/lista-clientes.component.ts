import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  clientes: Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService
  ) { }

  ngOnInit() {
    this.service.listarClientes().subscribe(
      (res) => {
        this.clientes = res;
      }
    )
  }

  adicionarCliente() {
    this.router.navigate(['adicionar-cliente'], { relativeTo: this.route });
  }

  alterarDadosCliente() {
    this.router.navigate(['alterar-dados-cliente/1'], { relativeTo: this.route });
  }

}
