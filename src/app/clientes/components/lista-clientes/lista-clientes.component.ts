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
  clientes: Array<Cliente | any> = [];
  clientesLista: Array<Cliente | any> = [];
  idExclusao: number | null = null;
  query: any = "";
  tipoFiltro: string | null = "nome";
  totalDePaginas: number | null = null;
  pagina: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.service.listarClientes().subscribe(
      (res) => {
        this.clientes = res;
        this.clientesLista = res;
        this.ordenarLista('nome');
      }
    )
  }

  ordenarLista(propriedade: string): void {
    this.clientes = this.clientesLista;
    this.clientes.sort(function (a, b) {
      if (a[propriedade] < b[propriedade]) {
        return -1;
      }
      if (a[propriedade] > b[propriedade]) {
        return 1;
      }
      return 0;
    });

    this.paginacao();
  }

  paginacao() {
    const totalItens = this.clientes.length;
    this.totalDePaginas = Math.ceil( totalItens / 5 );
    this.pagina = 1;
    this.carregarPagina(this.pagina);
  }

  carregarPagina(pagina: number) {
    this.pagina = pagina;
    this.clientes =  this.clientesLista.slice((pagina - 1) * 5, pagina * 5);
  }

  aplicarTipoPesquisa(tipo: any): void {
    this.tipoFiltro = tipo;
    this.query = "";
  }

  filtroPesquisa(): void {
    if(this.query === "") {
      this.clientes = this.clientesLista;
      this.paginacao();
    }
    else if (this.tipoFiltro == "nome") {
      this.clientes = this.clientesLista.filter(
        (a) => a.nome == this.query
      );
    }
    else if(this.tipoFiltro == "cpf") {
      this.query = this.query.match(/\d/g)!.join("");
      this.clientes = this.clientesLista.filter(
        (a) => a.cpf == this.query
      );
    }
    else if(this.tipoFiltro == "data_nasc") {
      const query = this.formatarDataPesquisa(this.query);
      this.clientes = this.clientesLista.filter(
        (a) => a.data_nasc == query
      );
    } 
  }

  formatarDataPesquisa(data: string): string {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  }

  adicionarCliente(): void {
    this.router.navigate(['adicionar-cliente'], { relativeTo: this.route });
  }

  alterarDadosCliente(id: number): void {
    this.router.navigate(['alterar-dados-cliente/' + id], { relativeTo: this.route });
  }

  excluirRegistroCliente(): void {
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
