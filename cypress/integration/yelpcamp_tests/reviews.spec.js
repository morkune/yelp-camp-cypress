describe("Review feature tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/campgrounds");
  });

  it("check review feature", () => {
    cy.get(".card:first > p >").click();
    cy.get(".reviews-link").click();
    cy.get(".checked");
  });
});
