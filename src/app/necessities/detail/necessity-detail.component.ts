import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NecessityStateService } from '../necessity-state.service';
import { INecessity } from 'src/app/model/necessity';

@Component({
  selector: 'app-necessity-detail',
  templateUrl: './necessity-detail.component.html',
  styleUrls: ['./necessity-detail.component.css']
})
export class NecessityDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  private paramSub: Subscription;
  private necessitySub: Subscription;

  public pageTitle: string;
  public state: string;
  public nameErrorMessage: string;
  public descriptionErrorMessage: string;
  public isNew: boolean;
  public necessity: INecessity;
  public necessityFormGroup: FormGroup;

  public get nameControl(): AbstractControl {
    return this.necessityFormGroup.get('Name');
  }
  public get descriptionControl(): AbstractControl {
    return this.necessityFormGroup.get('Description');
  }
  public get electricalControl(): AbstractControl {
    return this.necessityFormGroup.get('Electrical')
  }
  public get saveButtonTooltip(): string {
    return "Opslaan naar de database.";
  }
  public get saveButtonDisabledTooltip(): string {
    return "Uitgeschakeld totdat het formulier valide is.";
  }
  
  constructor(private $route: ActivatedRoute,
              private $router: Router,
              private $formBuilder: FormBuilder,
              private stateService: NecessityStateService) {
  }

  private initialize(necessity: INecessity, isNew: boolean): void {
    this.necessity = necessity;
    this.isNew = isNew;
    this.necessityFormGroup.setValue({
      Name: this.necessity.Name,
      Description: this.necessity.Description,
      Electrical: this.necessity.Electrical
    });

    if (isNew) {
      this.pageTitle = 'Maak een nieuwe keukegerei aan';
    } else {
      this.pageTitle = 'Keukegerei gegevens';
    }
  }
  private initializeForm(): void {
    this.necessityFormGroup = this.$formBuilder.group({
      Name: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      Electrical: [null, [Validators.nullValidator]]
    });
  }
  
  public onSave(): void {
  }
  public onRemove(): void {

  }
  public onBack(): void {

  }

  ngOnInit() {
    this.paramSub = this.$route.paramMap.subscribe(params => {
      const id = params.get('id');
      const isNew = params.get('isnew') === 'true';

      this.initializeForm();

      if (isNew) {
        this.necessitySub = this.stateService.createNecessity$().subscribe(necessity => {
          this.initialize(necessity, isNew);
        });
      } else {
        this.necessitySub = this.stateService.getNecessityByID$(id).subscribe(necessity => {
          this.stateService.editNecessity = necessity;
          this.initialize(necessity, isNew);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isNew) {
      this.nameControl.updateValueAndValidity();
      this.descriptionControl.updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }

    if (this.necessitySub) {
      this.necessitySub.unsubscribe();
    }
  }
}
