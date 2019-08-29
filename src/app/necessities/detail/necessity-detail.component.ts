import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NecessityStateService } from '../necessity-state.service';
import { INecessity } from 'src/app/model/necessity';

@Component({
  selector: 'app-necessity-detail',
  templateUrl: './necessity-detail.component.html',
  styleUrls: ['./necessity-detail.component.css'],
  host: { class: 'container'}
})
export class NecessityDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  private paramSub: Subscription;
  private necessitySub: Subscription;
  private saveNecessitySub: Subscription;
  private deleteSub: Subscription;

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
  private navigateToNecessityOverview(): void {
    this.$router.navigate(['/necessities'], { queryParamsHandling: 'preserve' });
  }
  
  public onSave(): void {
    if (this.necessityFormGroup.valid && this.necessityFormGroup.dirty) {
      const n = { ...this.necessity, ...this.necessityFormGroup.value }

      this.saveNecessitySub = this.stateService.saveNecessity$(n, this.isNew)
        .subscribe(result => {
          if (result) {
            this.state = 'The necessity has been saved.';
            this.necessityFormGroup.reset();
            this.navigateToNecessityOverview();
          } else {
            this.state = 'The necessity could not be saved.';
          }
        }, (error: any) => this.state = <string>error
      );
    }
  }
  public onRemove(): void {
    if (confirm('Are you sure you want to the delete this item?')) {
      this.deleteSub = this.stateService.deleteNecessity$(this.necessity.UniqueID)
        .subscribe(() => this.navigateToNecessityOverview());
    }
  }
  public onBack(): void {
    this.navigateToNecessityOverview();
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

    if (this.saveNecessitySub) {
      this.necessitySub.unsubscribe();
    }
  }
}
