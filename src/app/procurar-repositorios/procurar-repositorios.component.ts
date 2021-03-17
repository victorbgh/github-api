import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../components/notification/notification';
import { ModalVisualizarRepositorioComponent } from '../modal/modal-visualizar-repositorio/modal-visualizar-repositorio.component';
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

  repositorios = [];
  
  public dataSource = new MatTableDataSource<any>();

  public displayedColumns = ['nome', 'linguagem','dt_criacao', 'acoes'];

  public paginaLista: number = 0;

  public pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    private service: GitHubService,
    private dialog: MatDialog,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.procurarUsuario = this.formBuilder.group({
      valor: ['', Validators.required]
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

pageNavigations(event?: PageEvent) {
  this.paginaLista = event.pageIndex;
  this.pageSize = event.pageSize;
  this.iterator();
}

private iterator() {
  const end = (this.paginaLista + 1) * this.pageSize;
  const start = this.paginaLista * this.pageSize;
  const part = this.repositorios.slice(start, end);
  this.dataSource.data = part;
}

  public buscar(){
    this.submitted = true;
    if(this.procurarUsuario.valid){
      this.loading = true;
      const valor = this.procurarUsuario.get('valor').value;
      this.service.buscarUsuarios(valor).subscribe((response) => {
        console.log(response);
        if(response.length > 0){
          this.repositorios = response;
          this.iterator();
        }
        this.loading = false;
      },
        error => {
          this.loading = false;
          if(error.status == 404){
            this.notification.showError("Usuário não encontrado");
          }
          console.log(error);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public visualizarRepositorio(repositorio){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { obj: repositorio };
    this.dialog.open(ModalVisualizarRepositorioComponent, dialogConfig);
  }

}
