import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';

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
  clientesFiltrados: Array<Cliente> = [];
  idExclusao: number | null = null;
  query: any = "";
  tipoFiltro: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService
  ) { }

  ngOnInit() {
    this.service.listarClientes().subscribe(
      (res) => {
        this.clientes = res;
        this.clientesFiltrados = res;
      }
    )
  }

  aplicarTipoPesquisa(tipo: any) {
    this.tipoFiltro = tipo.target.value;
    this.query = "";
    this.ngOnInit();
  }

  filtroPesquisa() { 
    if (this.tipoFiltro == "nome") {
      this.clientes = this.clientesFiltrados.filter(
        (a) => a.nome == this.query
      );
    }
    else if(this.tipoFiltro == "cpf") {
      this.query = this.query.match(/\d/g)!.join("");
      this.clientes = this.clientesFiltrados.filter(
        (a) => a.cpf == this.query
      );
    }
    else if(this.tipoFiltro == "data_nasc") {
      const query = this.formatarDataPesquisa(this.query);
      this.clientes = this.clientesFiltrados.filter(
        (a) => a.data_nasc == query
      );
    }
  }

  formatarDataPesquisa(data: string) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
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
