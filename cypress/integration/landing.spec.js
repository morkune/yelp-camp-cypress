/// <reference types="cypress" />

describe("The text elements tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/");
  });

  it("checking the text of the elements", () => {
    cy.contains("[data-cy=landing-header]", "Welcome to YelpCamp!");
    cy.contains("[data-cy=link-to-campgrounds]", "View All Campgrounds");
  });

  it("go to all campgrounds page", () => {
    cy.get("[data-cy=link-to-campgrounds]").click();

    cy.url().should("include", "/campgrounds");
  });

  it("search with invalid input", () => {
    cy.get("[data-cy=search]").type("nothing").should("have.value", "nothing");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/campgrounds?search=nothing");
    cy.contains(
      "h3",
      'No campgrounds match "nothing" query, please try again.'
    );

    cy.get(".navbar-brand").click();
    cy.get("[data-cy=search]").type("123+*").should("have.value", "123+*");
    cy.get("[data-cy=submit]").click();
    cy.contains("h3", 'No campgrounds match "123+*" query, please try again.');

    cy.get(".navbar-brand").click();
    cy.get("[data-cy=search]").type("forestt").should("have.value", "forestt");
    cy.get("[data-cy=submit]").click();
    cy.contains(
      "h3",
      'No campgrounds match "forestt" query, please try again.'
    );
  });

  it("search with valid input", () => {
    cy.get("[data-cy=search]").type("test").should("have.value", "test");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/campgrounds?search=test");
    cy.contains(".card-title", "Test");
  });
});
