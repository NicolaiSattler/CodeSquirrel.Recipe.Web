import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityDetailComponent } from './necessity-detail.component';

describe('NecessityDetailsComponent', () => {
  let component: NecessityDetailComponent;
  let fixture: ComponentFixture<NecessityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NecessityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
