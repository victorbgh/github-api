import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GitHubService{

    private url = 'https://api.github.com/users';

    constructor(private http: HttpClient){ }

    public buscarUsuarios(usuario: string): Observable<any>{
        return this.http.get<any>(`${this.url}/${usuario}/repos`);
    }
}