/// <reference types="cypress" />

describe('Cypress Test Scenarios', () => {
    // Before each test opens a baseUrl page:
    beforeEach(() => {
    const baseUrl = Cypress.config('baseUrl');
    cy.visit(`${baseUrl}`)
    });
  
    describe('1. Main page test', () => {
      it('Check, if banner is visible and a button click changes URL', () => {
        // Banner is visible and has a correct text:
        cy.get(".banner").should("have.text", "Sveiki atvykę į Cypress testų puslapį!");
        // Click on a "Load" button and expect an alert:
        cy.get("button#action-type").click();
        // Check alert text value:
        cy.on("window:alert", (alertRext) => {
            expect(alertRext).to.equal("Navigacija į /commands/actions atlikta!");
        });
        // Does URL include "/commands/actions":
        cy.url().should('include', '/commands/actions');
      });
    });
  
    describe('2. Login form test', () => {
      it('Fills in a form and shows a greeting message and profile information', () => {
        // Create user login data and fill them in a form:
        cy.fixture("users").then((users) => {
            cy.get("#username").type(users.user1.username);
            cy.get("#password").type(users.user1.password);
            cy.get("#login-button").click();
          });
        //  Check, if a greeting message is visible:
        cy.get("div#greeting").should("be.visible");
        // Check, if profile information is being rendered:
        cy.get("#profile p").should("have.text", "Čia yra studento profilio informacija.");
      });
    });
  
    describe('3. Dynamic element test', () => {
      it('Checks if all list elements have a word "Item"', () => {
        // Find all of unordered list elements and check, if they have a word "Item":
 
        cy.get("ul#item-list li").each((element) => {
          cy.wrap(element).should("contain.text", "Item");
        });
      });
    });
    
  
    describe('4. API request test', () => {
      it('Stubs API request and shows stub data', () => {
        // Prepared stubbed answer:

        const stubbedData = {
          userId: 1,
          id: 1,
          title: 'Stubbed API Post Title',
          body: 'Stubbed API Post Body'
        };

        // Intercept GET request to JSONPlaceholder API:
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
            statusCode: 200,
            body: {
            userId: 1,
            id: 1,
            title: 'Stubbed API Post Title',
            body: 'Stubbed API Post Body'
            }
        }).as('getPost');
        
        // Click on a button, which will call a fetch request:
        cy.get("button#fetch-data").click();
        
        // Wait for a request to be complete:
        cy.wait('@getPost');
        
        // Verify that the stubbed data is displayed in the .data-container element:
        cy.get('.data-container').within(() => {
            cy.get('h3').should('contain', stubbedData.title);
            cy.get('p').should('contain', stubbedData.body);
        });
      });
    });
  
    describe('5. Asinchronic operation test', () => {
      it('Shows, if asinchronioc operation finishes successfully', () => {
        // Click on a button, which evokes asinchronic operation:
        cy.get("button#async-action").click();
        // Immediately after a click, message should be shown:
        cy.get('div#async-result', { timeout: 0 }).should('be.visible');
        // Wait until asinchronic operation will finish (using a bit longer timeout):
        cy.get("div#async-result", {timeout: 500}).should("be.visible");
      });
    });
  
    describe('6. Hover effect test', () => {
      it('Shows tooltip, when mouse is hovered on hover-box', () => {
        // Initially a tooltip should not be visible:
        cy.get("div.tooltip").should("not.be.visible");
        // Simulating a mouseover effect on a button element:
        cy.get("div#hover-box").trigger("mouseover");
        cy.get("div.tooltip").should("be.visible");
        // Simulating a mouseout effect on a button element:
        cy.get("div#hover-box").trigger("mouseout");
        cy.get("div.tooltip").should("not.be.visible");
      });
    });
  });
  