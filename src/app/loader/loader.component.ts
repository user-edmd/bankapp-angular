import { Component } from '@angular/core'; 
import { LoaderService } from '../services/loader.service';
  
@Component({ 
    selector: 'app-loader', 
    templateUrl: './loader.component.html', 
    styleUrls: ['./loader.component.css'] 
}) 
export class LoaderComponent { 
    loading: boolean = false; 
  
    constructor(private loaderService: LoaderService) { 
        this.loaderService.isLoading.subscribe((v) => { 
            this.loading = v; 
        }); 
    } 
}