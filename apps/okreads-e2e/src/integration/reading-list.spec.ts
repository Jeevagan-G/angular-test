describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('Then: I should be able to perform undo action on add & remove book to the readinglist', () => {
    const bookTitle = 'Christodora';
    const bookItemSelector = '[data-testing="book-item"]';
    const redingItemSelector = '.reading-list-item';
    const addSnackBarBtnSelector =
      '.test-add-redo-action .mat-simple-snackbar-action button';
    const removeSnackBarBtnSelector =
      '.test-remove-redo-action .mat-simple-snackbar-action button';
    const removeReadBtnSelector = 'button[data-testing="remove-read-book"]';

    cy.get('input[type="search"]').type(bookTitle);
    cy.get('form').submit();
    const bookItemEles = cy.get(bookItemSelector);

    bookItemEles.should('have.length.greaterThan', 1);

    let bookItemEle = bookItemEles.first();
    bookItemEle.find('button').click();

    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').should('be.disabled');

    cy.get(addSnackBarBtnSelector).click();

    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').should('be.enabled');

    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get(redingItemSelector).last().find(removeReadBtnSelector).click();

    cy.contains('Removed').should('exist');

    cy.get(removeSnackBarBtnSelector).click();

    cy.contains(redingItemSelector, bookTitle).should('exist');

    cy.get(redingItemSelector).last().find(removeReadBtnSelector).click();

    cy.contains(redingItemSelector, bookTitle).should('not.exist');
  });
});
