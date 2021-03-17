import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NotificationService{
    constructor(private toastr: ToastrService) { }
    
    showSuccess(message){
        this.toastr.success(message)
    }
    
    showError(message){
        this.toastr.error(message)
    }
    
    showInfo(message){
        this.toastr.info(message)
    }
    
    showWarning(message){
        this.toastr.warning(message)
    }
}