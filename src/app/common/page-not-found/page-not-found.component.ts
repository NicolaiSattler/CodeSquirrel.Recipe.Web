import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  host: { class: 'container' }
})
export class PageNotFoundComponent {

  public pageTitle: string;
  public cardTitle: string;
  public cardText: string;

  constructor(private $router: Router) {
    this.pageTitle = '404';
    this.cardTitle = 'Pagina niet gevonden';
    this.cardText = 'De URL die is ingevoerd is niet correct.';
  }

  public onNavigateHome(): void {
    this.$router.navigate(['']);
  }

}
