import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SearchState } from './search.state';

describe('Search actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SearchState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  // it('should create an action and add an item', () => {
  //   store.dispatch(new SearchAction('item-1'));
  //   store.select(state => state.search.items).subscribe((items: string[]) => {
  //     expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
  //   });
  // });

});
