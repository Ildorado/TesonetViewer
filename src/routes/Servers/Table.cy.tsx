import { Table } from "./Table";

const data = [
  { name: "United States", distance: 600 },
  { name: "Canada", distance: 700 },
  { name: "Germany", distance: 100 },
  { name: "United Kingdom", distance: 200 },
  { name: "Poland", distance: 300 },
  { name: "Finland", distance: 400 },
  { name: "France", distance: 500 },
];

const keys = Object.keys(data[0]);

describe("<Table />", () => {
  it("mounts", () => {
    cy.mount(<Table data={data} />);
  });

  it("displays correct columns", () => {
    cy.mount(<Table data={data} />);

    keys.map((key, index) => {
      cy.getBySel("table-header-column").eq(index).contains(key);
    });
  });

  it("displays correct order", () => {
    cy.mount(<Table data={data} />);

    cy.getBySel("table-distance-cell").first().contains(600);
    cy.getBySel("table-distance-cell").last().contains(500);
  });

  it("displays ascending order correctly", () => {
    const sortedByDistanceAscdending = [...data].sort(
      (a, b) => a.distance - b.distance
    );

    cy.mount(<Table data={data} />);

    cy.getBySel("table-header-column").contains("distance").click();

    cy.getBySel("table-distance-cell")
      .first()
      .contains(sortedByDistanceAscdending[0].distance);

    cy.getBySel("table-distance-cell")
      .last()
      .contains(
        sortedByDistanceAscdending[sortedByDistanceAscdending.length - 1]
          .distance
      );
  });

  it("displays descdending order correctly", () => {
    const sortedByDistanceDesdending = [...data].sort(
      (a, b) => b.distance - a.distance
    );

    cy.mount(<Table data={data} />);

    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();

    cy.getBySel("table-distance-cell")
      .first()
      .contains(sortedByDistanceDesdending[0].distance);

    cy.getBySel("table-distance-cell")
      .last()
      .contains(
        sortedByDistanceDesdending[sortedByDistanceDesdending.length - 1]
          .distance
      );
  });

  it("displays normal order on three clicks", () => {
    cy.mount(<Table data={data} />);

    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();

    cy.getBySel("table-distance-cell").first().contains(600);
    cy.getBySel("table-distance-cell").last().contains(500);
  });

  it("displays normal order on three clicks", () => {
    cy.mount(<Table data={data} />);

    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();

    cy.getBySel("table-distance-cell").first().contains(600);
    cy.getBySel("table-distance-cell").last().contains(500);
  });

  it("displays ascending order when clicking on column while you are already sorting by descdending order of another column", () => {
    cy.mount(<Table data={data} />);

    cy.getBySel("table-name-cell").first().contains("United States");

    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("distance").click();
    cy.getBySel("table-header-column").contains("name").click();

    cy.getBySel("table-name-cell").first().contains("Canada");
  });
});
