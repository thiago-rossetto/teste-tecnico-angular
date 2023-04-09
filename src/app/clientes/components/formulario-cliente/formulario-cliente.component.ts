import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css'],
})
export class FormularioClienteComponent implements OnInit {
  idCliente: string | null;
  cliente: any;
  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    cpf: new FormControl(''),
    data_nasc: new FormControl(''),
    email: new FormControl(''),
    renda_mes: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ClienteService
  ) {
    this.idCliente = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.idCliente) {
      this.service.listarClientePorId(this.idCliente).subscribe((res) => {
        this.cliente = res;
        this.carregarFormulario();
      });
    } else {
      this.carregarFormulario();
    }
  }

  carregarFormulario(): void {
    this.form = this.formBuilder.group({
      nome: [!this.cliente ? null : this.cliente.nome],
      cpf: [!this.cliente ? null : this.cliente.cpf],
      data_nasc: [!this.cliente ? null : this.cliente.data_nasc],
      email: [!this.cliente ? null : this.cliente.email],
      renda_mes: [!this.cliente ? null : this.cliente.renda_mes],
    });
  }

  salvar(): void {
    this.form.value.data_cad = this.dataCadastro();
    this.service.cadastrarCliente(this.form.value).subscribe(() => {
      this.voltar();
    });
  }

  voltar(): void {
    this.router.navigate(['../']);
  }

  dataCadastro(): string {
    let dataAtual = new Date();
    let isoStringData = new Date(
      dataAtual.getTime() - dataAtual.getTimezoneOffset() * 60000
    ).toISOString();
    return isoStringData;
  }
}
