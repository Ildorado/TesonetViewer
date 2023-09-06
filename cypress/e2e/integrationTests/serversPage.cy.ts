const data = [
  { name: "United States", distance: 600 },
  { name: "Canada", distance: 700 },
  { name: "Germany", distance: 100 },
  { name: "United Kingdom", distance: 200 },
  { name: "Poland", distance: 300 },
  { name: "Finland", distance: 400 },
  { name: "France", distance: 500 },
];

describe("Severs Page", () => {
  it("should show server page", () => {
    cy.setUpLoggedInState();

    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", {
      body: data,
    });

    cy.visit("/");

    cy.getBySel("table").should("exist");
  });
});
