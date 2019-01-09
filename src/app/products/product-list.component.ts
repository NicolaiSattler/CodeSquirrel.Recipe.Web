import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    host: {
        class: 'container'
    }
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product Overzicht';
    
    public Add(): void {
        
    }
    public Edit(): void {
        
    }
    public Remove(): void {
        
    }

    ngOnInit(): void {
        //Get data from server?
    }
}