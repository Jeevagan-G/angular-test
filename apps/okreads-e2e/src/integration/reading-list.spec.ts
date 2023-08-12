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

  it('Then: I should add & mark book as finished reading, after remove it add button should be enabled', () => {
    const bookTitle = 'Christodora';
    const bookItemSelector = '[data-testing="book-item"]';
    const redingItemSelector = '.reading-list-item';
    const finishReadBtnSelector = '[data-testing="finish-read"]';
    const readFinishTxtSelector = '.read-finished';
    const readText = 'Want to Read';
    const finishText = 'Finished';
    const removeReadBtnSelector = 'button[data-testing="remove-read-book"]';
    cy.get('input[type="search"]').type(bookTitle);
    cy.get('form').submit();
    const bookItemEles = cy.get(bookItemSelector);
    // Assertion for search returns book items;
    bookItemEles.should('have.length.greaterThan', 1);
    let bookItemEle = bookItemEles.first();
    bookItemEle.find('button').click();
    bookItemEle = cy.get(bookItemSelector).first();
    // Assert to check wan to read button is disabled once added to read list.
    bookItemEle.find('button').should('be.disabled');
    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').invoke('text').should('contain', readText);
    cy.get('[data-testing="toggle-reading-list"]').click();
    // Assertion finished element is not present
    cy.get(readFinishTxtSelector).should('not.exist');
    cy.get(redingItemSelector).last().find(finishReadBtnSelector).click();
    // Assertion finished element is present & book item button text changes.
    cy.get(readFinishTxtSelector).should('exist');
    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').invoke('text').should('contain', finishText);
    cy.get(redingItemSelector).last().find(removeReadBtnSelector).click();
    bookItemEle = cy.get(bookItemSelector).first();
    // Assert to find the finished book can be added after removing from the read list.
    bookItemEle.find('button').invoke('text').should('contain', readText);
    bookItemEle = cy.get(bookItemSelector).first();
    bookItemEle.find('button').should('be.enabled');
  });
});
