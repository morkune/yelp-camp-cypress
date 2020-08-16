export function removeCampgroundIfExists(campgroundName) {
  return cy.request("GET", "/api/campgrounds").then((response) => {
    const campground = response.body.find((x) => x.name === campgroundName);
    if (campground) {
      cy.request("DELETE", `/api/campgrounds/${campground._id}`);
    }
  });
}

export function addCampground(campground) {
  return cy.request("POST", "/api/campgrounds", campground).then((response) => {
    expect(response.body).to.have.property("name", campground.name);
  });
}
