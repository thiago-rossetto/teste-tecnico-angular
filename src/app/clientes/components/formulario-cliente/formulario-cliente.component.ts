import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  idUsuario: string | null;

  constructor(
    private route: ActivatedRoute
  ) { this.idUsuario = this.route.snapshot.paramMap.get('id'); }

  ngOnInit() {
  }

}
