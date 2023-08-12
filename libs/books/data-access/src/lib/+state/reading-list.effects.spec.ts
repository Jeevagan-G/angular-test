import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import {
  SharedTestingModule,
  createReadingListItem,
} from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';
import { Update } from '@ngrx/entity';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', (done) => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('finishBook$', () => {
    it('should work', (done) => {
      const item: ReadingListItem = createReadingListItem('A');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.finishedReading({ item }));
      const resItem: ReadingListItem = {
        ...item,
        finished: true,
        finishedDate: new Date().toISOString(),
      };
      const updateItem: Update<ReadingListItem> = {
        id: 'A',
        changes: { finished: true, finishedDate: resItem.finishedDate },
      };

      effects.finishBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.confirmedFinishedReading({ updateItem })
        );
        done();
      });
      httpMock.expectOne('/api/reading-list/A/finished').flush(resItem);
    });
  });
});
