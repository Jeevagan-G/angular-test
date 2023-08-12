import { Update } from '@ngrx/entity';
import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State,
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListItem } from '@tmo/shared/models';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C'),
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    xit('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('B'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A']);
    });

    xit('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });

    it('confirmedFinishedReading should update book as finished from the state', () => {
      const updateItem: Update<ReadingListItem> = {
        id: 'A',
        changes: { finished: true, finishedDate: new Date().toISOString() },
      };
      const action = ReadingListActions.confirmedFinishedReading({
        updateItem,
      });
      const result: State = reducer(state, action);
      expect(result.entities[updateItem.id].finished).toBeTruthy();
    });

    it('failedFinishedReading should update book as finished from the state', () => {
      const error = 'failed to update';
      const action = ReadingListActions.failedFinishedReading({ error });
      const result: State = reducer(state, action);
      expect(result.error).toBe(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
