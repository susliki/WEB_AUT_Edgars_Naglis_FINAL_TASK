describe('Form submission', () => {
  it('fills and submits the form correctly', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    //prieks (uncaught exception) error
    Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
    });

    // text lauku aizpilde
    cy.get('#firstName').type('Edgars');
    cy.get('#lastName').type('Naglis');
    cy.get('#userEmail').type('edgars.naglis@va.lv');
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('1234567890');

    // uzstaditi dzimsanas dienu
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1930');
    cy.get('.react-datepicker__month-select').select('1'); // February is index 1
    cy.get('.react-datepicker__day--028:not(.react-datepicker__day--outside-month)').click();

    // Uzstadit priekšmetus
    cy.get('.subjects-auto-complete__value-container').type('Economics{enter}');

    // Uzstadit Hobbijus
    cy.get('#hobbies-checkbox-3').check({ force: true });
  

    // Norade uz bildi
    cy.get('input[type="file"]').selectFile('cypress/fixtures/files/myImage.jpg');

    // uzlikt State and City
    cy.get('#state').click().find('div[id="react-select-3-option-0"]').click(); // NCR
    cy.get('#city').click().find('div[id="react-select-4-option-0"]').click(); // Delhi

    // iesniegt formu
    cy.get('#submit').click();

    // Validacija
    cy.get('.modal-body').should('contain', 'Edgars Naglis')
      .and('contain', 'edgars.naglis@va.lv')
      .and('contain', 'Male')
      .and('contain', '1234567890')
      .and('contain', '28 February,1930')
      .and('contain', 'Economics')
      .and('contain', 'Music')
      .and('contain', 'NCR')
      .and('contain', 'Delhi');
  });
});
