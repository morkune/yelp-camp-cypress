/// <reference types="cypress" />

describe("Login page tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/login");
  });

  it("submit a form with valid info", () => {
    cy.get("#username-input").type(Cypress.env("username"));
    cy.get("#password-input").type(Cypress.env("password"));
    cy.contains("Submit").click();
  });

  it("type incorrect password", () => {
    cy.get("#username-input").type(Cypress.env("username"));
    cy.get("#password-input").type("123");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-danger", "Invalid username or password.");
  });

  it("type incorrect username and password", () => {
    cy.get("#username-input").type("123");
    cy.get("#password-input").type(" ");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-danger", "Invalid username or password.");
  });

  it("forgot password with incorrect input", () => {
    cy.get("[data-cy=forgot]").click();
    cy.get("[name=email]").type("test@test.com");
    cy.get("[data-cy=reset-submit]").click();
    cy.contains(
      ".alert.alert-danger",
      "No account with that email address exists."
    );
  });

  it("forgot password with correct input", () => {
    cy.get("[data-cy=forgot]").click();
    cy.get("[data-cy=forgot-email]").type(Cypress.env("email"));
    cy.get("[data-cy=reset-submit]").click();
    cy.contains(
      ".alert.alert-success",
      `An e-mail has been sent to ${Cypress.env(
        "email"
      )} with further instructions.`
    );
  });
});
