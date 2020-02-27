import { Listing } from '../../models/listing.model';
import { SearchData } from '../../models/searchData.model';

const prefix = '[Search]';

export class GetListingsAction {
  static readonly type = `${prefix} Get Listings`;
}

export class ToggleMobileMapAction {
  static readonly type = `${prefix} Toggle Mobile Map`;
}

export class SetHighlightedListingAction {
  static readonly type = `${prefix} Set Highlighted Listing`;
  constructor(public listing: Listing) { }
}

export class SetListingsAction {
  static readonly type = `${prefix} Set Listings`;
  constructor(public listings: Listing[]) { }
}

export class SetSearchDataAction {
  static readonly type = `${prefix} Set Search Data`;
  constructor(public searchData: SearchData) { }
}
