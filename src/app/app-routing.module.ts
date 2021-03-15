import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcurarRepositoriosComponent } from './procurar-repositorios/procurar-repositorios.component';

const routes: Routes = [
  { path: '', component: ProcurarRepositoriosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
