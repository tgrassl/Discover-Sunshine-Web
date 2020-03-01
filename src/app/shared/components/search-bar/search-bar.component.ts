import { SearchData } from 'src/app/shared/models/searchData.model';
import { ApplicationState, APPLICATION_STATE } from './../../state/application/application.state';
import { SearchData } from './../../models/searchData.model';
import { NumberSelectConfig } from './../number-select/number-select.component';
import { SetSearchDataAction } from './../../state/search/search.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router } from '@angular/router';
import { SearchState } from '../../state/search/search.state';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private static MAX_GUESTS = 8;
  private static MIN_GUESTS = 1;
  private static KEY_DEBOUNCE = 1000;

  @Input() mapMode = false;

  public searchForm: FormGroup;
  public placesOptions = {
    types: ['(regions)']
  };

  private subs: Subscription[] = [];

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {
    this.searchForm = new FormGroup({
      destination: new FormGroup({
        name: new FormControl('', [Validators.required]),
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required])
      }),
      date: new FormControl({}, [Validators.required]),
      guests: new FormControl({ total: 1, adult: 1, kid: 0 }, [Validators.required,
      Validators.max(SearchBarComponent.MAX_GUESTS),
      Validators.min(SearchBarComponent.MIN_GUESTS)])
    });

    const previousSearch = this.store.selectSnapshot(SearchState.searchData);
    if (previousSearch) {
      this.searchForm.patchValue(previousSearch, { emitEvent: false });
    }

    this.initMapMode();
  }

  private initMapMode(): void {
    if (this.mapMode) {
      if (this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.INITIAL) {
        this.searchForm.markAllAsTouched();
      }

      this.subs.push(this.searchForm.valueChanges
        .pipe(
          debounceTime(SearchBarComponent.KEY_DEBOUNCE),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe(() => {
          this.submitForm();
        }));
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public submitForm(): void {
    if (this.searchForm.valid) {
      this.store.dispatch(new SetSearchDataAction(this.searchForm.value as SearchData));
      if (!this.mapMode) {
        this.router.navigateByUrl('map');
      }
    }
  }

  public getGuestClass(): string {
    return this.mapMode ? 'col-md-3' : 'col-md-2';
  }

  public getDateClass(): string {
    return this.mapMode ? 'col-md-5' : 'col-md-4';
  }

  public handleAddressChange(address: Address): void {
    const placesLocation = {
      name: address.formatted_address,
      lat: this.convertLocation(address.geometry.location.lat()),
      lng: this.convertLocation(address.geometry.location.lng())
    };
    this.searchForm.controls.destination.setValue(placesLocation);
  }

  private convertLocation(val) {
    return Number(val.toPrecision(11));
  }

  public getGuestConfig(): NumberSelectConfig {
    return {
      rows: [
        { single: 'Erwachsener', multiple: 'Erwachsene' },
        { single: 'Kind', multiple: 'Kinder' }
      ],
      max: SearchBarComponent.MAX_GUESTS,
      min: SearchBarComponent.MIN_GUESTS,
      default: { total: 1, adult: 1, kid: 0 }
    };
  }

  public showInvalidIcon(): boolean {
    const control = this.searchForm.get('destination');
    return control.invalid && control.touched;
  }

  public handleDestinationChanges(): void {
    const control = this.searchForm.get('destination.name');
    this.subs.push(this.searchForm.get('destination').valueChanges
      .subscribe(value => {
        if (!value.lat) {
          control.setErrors({ invalid: 'No Location Data' });
        } else {
          control.setErrors(null);
        }
      }));
  }
}
