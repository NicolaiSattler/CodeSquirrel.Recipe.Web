import { Component, OnDestroy, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { routerTransition } from './app.animation';
import { LoaderService } from './shared/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})

export class AppComponent implements OnInit {
  public showLoader = false;
  public pageTitle = 'Recipe App';

  constructor (private loaderService: LoaderService) {

  }
  ngOnInit(): void {
    this.loaderService.showLoader.subscribe((sub) => {
      this.showLoader = sub;
    });
  }
}
