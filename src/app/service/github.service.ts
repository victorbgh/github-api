import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const endpoint = environment.githubApi;

@Injectable({
    providedIn: 'root'
})
export class GitHubService{


    constructor(private http: HttpClient){ }

    public buscarUsuarios(usuario: string): Observable<any>{
        return this.http.get<any>(`${endpoint}/users/${usuario}/repos`);
    }

    public buscarLinguagensDetalhada(url: string): Observable<any>{
        return this.http.get<any>(`${url}`);
    }

    public buscarTags(dono: string, repositorio: string): Observable<any>{
        return this.http.get<any>(`${endpoint}/repos/${dono}/${repositorio}/tags`);
    }

    public buscarBranches(dono: string, repositorio: string): Observable<any>{
        return this.http.get<any>(`${endpoint}/repos/${dono}/${repositorio}/branches`);
    }

    public buscarColaboradores(url: string): Observable<any>{
        return this.http.get<any>(`${url}`);
    }
}