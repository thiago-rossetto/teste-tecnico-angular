import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  idCliente: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { this.idCliente = this.route.snapshot.paramMap.get('id'); }

  ngOnInit() {
  }

  salvar() {
    this.voltar();
  }

  voltar() {
    this.router.navigate(['../']);
  }

}
