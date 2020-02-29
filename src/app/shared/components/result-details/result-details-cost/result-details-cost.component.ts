import { Listing } from 'src/app/shared/models/listing.model';
import { Component, OnInit, Input } from '@angular/core';
import { SearchData } from 'src/app/shared/models/searchData.model';
import { Moment } from 'moment';

@Component({
  selector: 'app-result-details-cost',
  templateUrl: './result-details-cost.component.html',
  styleUrls: ['./result-details-cost.component.scss']
})
export class ResultDetailsCostComponent {

  @Input() listing: Listing;
  @Input() searchData: SearchData;

  public getTotalPrice(): number {
    const searchDate = this.searchData.date;
    const totalNights = searchDate.end.diff(searchDate.start, 'days');
    return this.listing.price * totalNights;
  }

  public getFormattedDate(date: Moment): string {
    return date.format('DD.MM.YYYY');
  }
}
