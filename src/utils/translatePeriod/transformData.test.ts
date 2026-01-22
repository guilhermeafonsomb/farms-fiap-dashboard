import { translatePeriod } from "./transformData";

describe("translatePeriod tests", () => {
  test("should format a period as string", () => {
    const value = "WEEKLY";

    const formattedValue = translatePeriod(value);

    expect(formattedValue).toBe("Semanal");
  });
});
