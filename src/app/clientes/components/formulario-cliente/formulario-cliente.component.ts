import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css'],
})
export class FormularioClienteComponent implements OnInit {
  novoCadastro: boolean = true;
  idCliente: number | null = null;
  cliente: Cliente | null = null;
  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    cpf: new FormControl(''),
    data_nasc: new FormControl(''),
    email: new FormControl(''),
    renda_mes: new FormControl(''),
    data_cad: new FormControl(''),
    id: new FormControl(null)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ClienteService
  ) {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.idCliente ? this.novoCadastro = false : null;
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
      data_cad: [!this.cliente ? null : this.cliente.data_cad],
      id: [!this.cliente ? null : this.cliente.id]
    });
  }

  salvar(): void {
    if(this.novoCadastro) {
      this.form.value.data_cad = this.dataCadastro();
      this.service.cadastrarCliente(this.form.value).subscribe(() => {
        this.voltar();
      });
    } else {
      this.service.atualizarCliente(this.form.value).subscribe(() => {
        this.voltar();
      })
    }
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
