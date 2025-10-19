import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-nfe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule
  ],
  templateUrl: './nfe.component.html',
  styleUrls: ['./nfe.component.scss']
})
export class NfeComponent {
  
  voltar!: () => void;

  nfeForm = this.fb.group({
    emitente: this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      xNome: ['', Validators.required]
    }),
    destinatario: this.fb.group({
      cpfCnpj: ['', Validators.required],
      xNome: ['', Validators.required]
    }),
    produtos: this.fb.array([
      this.fb.group({
        nome: ['', Validators.required],
        quantidade: [1, Validators.required],
        valor: [0, Validators.required]
      })
    ])
  });

  constructor(private fb: FormBuilder, private msg: NzMessageService) {}

  get produtos(): FormArray {
    return this.nfeForm.get('produtos') as FormArray;
  }

  adicionarProduto() {
    this.produtos.push(
      this.fb.group({
        nome: ['', Validators.required],
        quantidade: [1, Validators.required],
        valor: [0, Validators.required]
      })
    );
  }

  removerProduto(index: number) {
    this.produtos.removeAt(index);
  }

  emitirNfe() {
    if (this.nfeForm.invalid) {
      this.msg.error('Preencha todos os campos obrigatórios');
      this.nfeForm.markAllAsTouched();
      return;
    }

    const dados = this.nfeForm.value;
    console.log('Emitindo NFe:', dados);
    this.msg.success('NFe emitida com sucesso!');
  }
}
