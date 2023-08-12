import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { By } from '@angular/platform-browser';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should perform instance search and trigger search after a debounce time period', fakeAsync(() => {
    spyOn(component, 'searchBooks').and.callThrough();
    const searchField = fixture.debugElement.query(
      By.css('input[type="search"]')
    ).nativeElement;
    searchField.value = '';
    expect(component.searchForm.value.term).toBe('');
    searchField.value = 'dsa';
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchBooks).toHaveBeenCalledTimes(0);
    tick(501);
    expect(component.searchBooks).toHaveBeenCalledTimes(1);
  }));

  it('should perform instance search and trigger search only when the search text is different from previous ', fakeAsync(() => {
    spyOn(component, 'searchBooks').and.callThrough();
    const searchField = fixture.debugElement.nativeElement.querySelector(
      'input[type="search"]'
    );
    searchField.value = '';
    expect(component.searchForm.value.term).toBe('');
    searchField.value = 'dsa';
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(501);
    expect(component.searchBooks).toHaveBeenCalledTimes(1);
    searchField.value = 'dsaf';
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchField.value = 'dsa';
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(501);
    expect(component.searchBooks).toHaveBeenCalledTimes(1);
  }));
});
