import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  clientes: Array<Cliente> = [];
  idExclusao: number | null = null;

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

  alterarDadosCliente(id: number) {
    this.router.navigate(['alterar-dados-cliente/' + id], { relativeTo: this.route });
  }

  excluirRegistroCliente() {
    if(this.idExclusao) {
      this.service.excluirCliente(this.idExclusao).subscribe(
        () => {
          this.closebutton.nativeElement.click();
          this.ngOnInit();
        }
      )
    }
  }

}
