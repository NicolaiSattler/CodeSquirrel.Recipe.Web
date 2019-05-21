import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from './app.animation';
import { LoaderService } from './shared/service/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})

export class AppComponent implements OnInit, OnDestroy {
  private loaderSub: Subscription;

  public showLoader = false;
  public pageTitle = 'CodeSquirl | Recepten App';

  constructor (private loaderService: LoaderService) { }
  ngOnInit(): void {
    this.loaderSub = this.loaderService.showLoader.subscribe((sub) => {
      this.showLoader = sub;
    });
  }
  ngOnDestroy(): void {
    this.loaderSub.unsubscribe();
  }
}
