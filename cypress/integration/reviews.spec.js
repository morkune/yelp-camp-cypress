/// <reference types="Cypress" />

describe("Review feature tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/campgrounds");
  });

  it("add new review", () => {
    cy.get(".card:first > p >").click();
    cy.contains("Write a Review").click();
    cy.get("textarea[type=text]").clear().type("Awesome camp!");
    cy.contains("Submit a Review").click();
  });

  it("check review page", () => {
    cy.get(".card").first().find(".btn-primary").click();
    cy.get(".reviews-link").click();
    cy.get(".checked");
  });

  it("editing a campground review", () => {
    cy.get(".card").first().find(".btn-primary").click();
    cy.get(".reviews-card").find(".btn-warning").click();
    cy.get("#first-rate4").click();
    cy.get("textarea[type=text]").clear().type("Very nice!");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-success", "Your review was successfully edited.");
    cy.contains("Very nice!");
    cy.get(".card-body").find(".checked").should("have.length", 4);

    cy.get(".reviews-card").find(".btn-warning").click();
    cy.get("#first-rate3").click();
    cy.get("textarea[type=text]").clear().type("Very good!");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-success", "Your review was successfully edited.");
    cy.contains("Very good!");
    cy.get(".card-body").find(".checked").should("have.length", 3);

    cy.get(".reviews-card").find(".btn-warning").click();
    cy.get("#first-rate1").click();
    cy.get("textarea[type=text]").clear().type("!");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-success", "Your review was successfully edited.");
    cy.contains("!");
    cy.get(".card-body").find(".checked").should("have.length", 1);
  });

  it("delete review", () => {
    cy.get(".card:first > p >").click();
    cy.get(".reviews-card").find(".btn-danger").click();
    cy.contains(
      ".alert.alert-success",
      "Your review was deleted successfully."
    );
  });
});
