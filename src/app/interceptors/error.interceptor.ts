import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../components/notification/notification';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notification: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            const mensagemError = err.status;
            
            switch (mensagemError) {
                case 403:
                    this.handle403();
                    break;
                case 404:
                    this.handle404();
                    break;
                default:
                    this.handleDefaultError(err);
                    break;
            }
            return throwError(mensagemError);
        }))
    }

    handle403(){
        this.notification.showError("Limite de 5000 requisições atingidas!");
    }

    handle404(){
        this.notification.showError("Não encontrado!");
    }

    handleDefaultError(err){
        this.notification.showError(err.error.message);
    }
}