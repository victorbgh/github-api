import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { GitHubService } from '../../service/github.service';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-modal-visualizar-repositorio',
  templateUrl: './modal-visualizar-repositorio.component.html',
  styleUrls: ['./modal-visualizar-repositorio.component.css']
})
export class ModalVisualizarRepositorioComponent implements OnInit {
  public loading = false;

  repositorio;

  linguagens = [];

  tags: any = [];

  branches: any = [];

  colaboradores: any = [];

  colors: Color[] = [
    {
      backgroundColor: []
    }
  ];

  public cor = {
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'PHP': '#4F5D95',
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'SCSS': '#c6538c',
    'Python': '#3572A5',
    'C++': '#f34b7d',
    'Shell': '#89e051',
  };

  stringDeHex: string[] = [];

  legendas: Label[] = [];

  valores: MultiDataSet = [];

  tipoDeGrafico: ChartType = 'doughnut';

  constructor(
    private dialogRef: MatDialogRef<ModalVisualizarRepositorioComponent>,
    private service: GitHubService,
    @Inject(MAT_DIALOG_DATA) private dado: any) {
  }


  ngOnInit(): void {
    this.loading = true;
    this.repositorio = this.dado.obj;
    this.buscarDados().then(
      () => this.loading = false
    );
  }

  public async buscarDados() {
    this.buscarLinguagensDetalhada();
    this.buscarBranches(this.repositorio.owner.login, this.repositorio.name);
    this.buscarTags(this.repositorio.owner.login, this.repositorio.name);
    this.buscarColaboradores(this.repositorio.contributors_url);
  }

  public buscarLinguagensDetalhada() {
    if (this.repositorio.languages_url) {
      const url = this.repositorio.languages_url;
      this.service.buscarLinguagensDetalhada(url).subscribe(response => {
        this.linguagens = response;
        if (!this.isEmpty(response)) {
          var result = Object.keys(response).map(function (key) {
            return [key, response[key]];
          });
          result.forEach(element => {
            this.legendas.push(element[0]);
            this.valores.push(element[1]);
            // NOTE[I]: https://stackoverflow.com/questions/52098989/how-to-put-dynamic-colors-for-pie-chart-chart-js
            // NOTE[II]: Verificamos se já existe um hexa definido pra linguagem, caso não tenha, gera uma cor aleatoriamente. By victor
            if (this.cor[element[0]]) {
              this.stringDeHex.push(this.cor[element[0]]);
            } else {
              this.stringDeHex.push(this.getRandomColor());
            }
          });
          this.colors[0].backgroundColor = this.stringDeHex;
        }
      }, error =>{});
    }
  }

  public buscarBranches(dono: string, repositorio: string) {
    if (dono && repositorio) {
      this.service.buscarBranches(dono, repositorio).subscribe(response => {
        this.branches = response;
      }, error => {
        this.loading = false;
      });
    }
  }

  public buscarTags(dono: string, repositorio: string) {
    if (dono && repositorio) {
      this.service.buscarTags(dono, repositorio).subscribe(response => {
        this.tags = response;
      }, error => {
        this.loading = false;
      });
    }
  }

  public buscarColaboradores(url: string) {
    if (url) {
      this.service.buscarColaboradores(url).subscribe(response => {
        this.colaboradores = response;
      }, error => {
        this.loading = false;
      });
    }
  }

  public getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  public close(){
    this.dialogRef.close();
  }

}
