import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
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
  enviado: boolean = false;
  dataAtual: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ClienteService
  ) {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.idCliente ? this.novoCadastro = false : null;
    this.dataAtual = this.carregarDataAtual();
    this.dataAtual = this.dataAtual.split('T')[0];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
      nome: [
        !this.cliente ? null : this.cliente.nome,
        [
          Validators.required
        ]
      ],
      cpf: [
        !this.cliente ? null : this.cliente.cpf,
        [
          Validators.required
        ]
      ],
      data_nasc: [
        !this.cliente ? null : this.cliente.data_nasc,
        [
          Validators.required
        ]
      ],
      email: [
        !this.cliente ? null : this.cliente.email,
        [
          Validators.required
        ]
      ],
      renda_mes: [
        !this.cliente ? null : this.cliente.renda_mes,
        [
          Validators.required
        ]
      ],
      data_cad: [!this.cliente ? null : this.cliente.data_cad],
      id: [!this.cliente ? null : this.cliente.id]
    });
  }

  enviar(): void {
    this.enviado = true;

    if (this.form.invalid) {
      return;
    }

    this.salvar();
  }

  salvar(): void {
    if(this.novoCadastro) {
      this.form.value.data_cad = this.carregarDataAtual();
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

  carregarDataAtual(): string {
    let dataAtual = new Date();
    let isoStringData = new Date(
      dataAtual.getTime() - dataAtual.getTimezoneOffset() * 60000
    ).toISOString();
    return isoStringData;
  }
}
