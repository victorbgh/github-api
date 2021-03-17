import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GitHubService{

    private url = 'https://api.github.com';

    constructor(private http: HttpClient){ }

    public buscarUsuarios(usuario: string): Observable<any>{
        return this.http.get<any>(`${this.url}/users/${usuario}/repos`);
    }

    public buscarLinguagensDetalhada(url: string): Observable<any>{
        return this.http.get<any>(`${url}`);
    }

    public buscarTags(dono: string, repositorio: string): Observable<any>{
        return this.http.get<any>(`${this.url}/repos/${dono}/${repositorio}/tags`);
    }

    public buscarBranches(dono: string, repositorio: string): Observable<any>{
        return this.http.get<any>(`${this.url}/repos/${dono}/${repositorio}/branches`);
    }

    public buscarCommitsDetalhado(dono: string, repositorio: string): Observable<any>{
        return this.http.get<any>(`${this.url}/repos/${dono}/${repositorio}/commits`);
    }
}