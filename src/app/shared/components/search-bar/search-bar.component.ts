import { SearchData } from './../../models/searchData.model';
import { NumberSelectConfig } from './../number-select/number-select.component';
import { SetSearchDataAction } from './../../state/search/search.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router } from '@angular/router';
import { SearchState } from '../../state/search/search.state';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
  private static MAX_GUESTS = 8;
  private static MIN_GUESTS = 1;

  @Input() mapMode = false;

  public searchForm: FormGroup;
  public placesOptions = {
    types: ['(regions)']
  };

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {

    this.searchForm = new FormGroup({
      destination: new FormGroup({
        name: new FormControl('', [Validators.required]),
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required])
      }),
      date: new FormControl({}, [Validators.required]),
      guests: new FormControl(1, [Validators.required, 
        Validators.max(SearchBarComponent.MAX_GUESTS), 
        Validators.min(SearchBarComponent.MIN_GUESTS)])
    });

    const previousSearch = this.store.selectSnapshot(SearchState.searchData);
    if (previousSearch) {
      this.searchForm.patchValue(previousSearch);
    }
  }

  public submitForm(): void {
    if (this.searchForm.valid) {
      this.store.dispatch(new SetSearchDataAction(this.searchForm.value as SearchData));
      this.router.navigateByUrl('map');
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
        {single: 'Erwachsener', multiple: 'Erwachsene'},
        {single: 'Kind', multiple: 'Kinder'}
      ],
      max: SearchBarComponent.MAX_GUESTS,
      min: SearchBarComponent.MIN_GUESTS,
      default: 1
    };
  }
}
