import { SetSearchDataAction } from './../../state/search/search.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  @Input() mapMode = false;

  public searchForm: FormGroup;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.searchForm = new FormGroup({
      destination: new FormControl('', [Validators.required]),
      date: new FormControl({}, [Validators.required]),
      guests: new FormControl(null, [Validators.required, Validators.max(8)])
    });
  }

  public submitForm(): void {
    console.log(this.searchForm.valid, this.searchForm.value);
    this.store.dispatch(new SetSearchDataAction(this.searchForm.value));
  }

  public getGuestClass(): string {
    return this.mapMode ? 'col-md-4' : 'col-md-2';
  }

}
