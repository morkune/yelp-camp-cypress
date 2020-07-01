const campground = {
  name: "Cypress",
  price: "5.60",
  description: "Hello World",
  image: "fakeImage",
};

function removeCampgroundIfExists(campgroundName) {
  cy.request("GET", "/api/campgrounds").then((response) => {
    const campground = response.body.find((x) => x.name === campgroundName);
    if (campground) {
      cy.request("DELETE", `/api/campgrounds/${campground._id}`);
    }
  });
}

function addCampground(campground) {
  cy.request("POST", "/api/campgrounds", campground).then((response) => {
    expect(response.body).to.have.property("name", campground.name);
  });
}

describe("Edit feature", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    removeCampgroundIfExists(campground.name);
    addCampground(campground);
    cy.visit("/campgrounds");
  });

  after(() => {
    removeCampgroundIfExists(campground.name);
  });

  it("editing a campground", () => {
    cy.contains("Cypress")
      .parentsUntil(".col-lg-3")
      .within(() => {
        cy.contains("More info").click();
      });
    cy.contains("Edit").click();
    cy.get("#price-input").clear().type("69");
    cy.get("input[type=file]").attachFile("campground.jpg");
    cy.get("#description-input").clear().type("Testing description.");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-success", "Successfully Updated!");
    cy.contains(".float-right", "$ 69/night");
    cy.contains("Testing description.");
  });
});
