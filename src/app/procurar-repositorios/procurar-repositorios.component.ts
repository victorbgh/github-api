import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GitHubService } from '../service/github.service';

@Component({
  selector: 'app-procurar-repositorios',
  templateUrl: './procurar-repositorios.component.html',
  styleUrls: ['./procurar-repositorios.component.css']
})
export class ProcurarRepositoriosComponent implements OnInit {
  procurarUsuario: FormGroup;

  submitted = false;

  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: GitHubService) { }

  ngOnInit(): void {
    this.procurarUsuario = this.formBuilder.group({
      valor: ['', Validators.required]
    });
  }

  public buscar(){
    if(this.procurarUsuario.valid){
      const valor = this.procurarUsuario.get('valor').value;
      this.service.buscarUsuarios(valor).subscribe((res) => {
        console.log(res);
        
      },
        error => {
          this.loading = false;
          // this.notification.showError(error);
        });
    }
  }

}
