import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityOverviewComponent } from './necessity-overview.component';

describe('NecessityOverviewComponent', () => {
  let component: NecessityOverviewComponent;
  let fixture: ComponentFixture<NecessityOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NecessityOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
