import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  adicionarCliente() {
    this.router.navigate(['adicionar-cliente'], { relativeTo: this.route });
  }

  alterarDadosCliente() {
    this.router.navigate(['alterar-dados-cliente/1'], { relativeTo: this.route });
  }

}
