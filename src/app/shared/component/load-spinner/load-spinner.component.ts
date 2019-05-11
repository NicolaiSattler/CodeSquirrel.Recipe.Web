import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css']
})

export class LoadSpinnerComponent implements OnInit {
  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }
}
