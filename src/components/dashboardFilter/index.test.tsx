import { fireEvent, render } from "@/test/test-utils";
import { DashboardFilter } from ".";

describe("DashboardFilter tests", () => {
  test("should render the component", () => {
    const { getByText } = render(<DashboardFilter />);
    expect(getByText("Semanal")).toBeInTheDocument();
  });

  test("should select WEEKLY", () => {
    const { getByTestId } = render(<DashboardFilter />);
    const buttonWeekly = getByTestId("weekly-button");
    fireEvent.click(buttonWeekly);

    expect(buttonWeekly).toHaveClass("bg-white");
  });

  test("should select MONTHLY", () => {
    const { getByTestId } = render(<DashboardFilter />);

    const buttonMonthly = getByTestId("monthly-button");

    fireEvent.click(buttonMonthly);

    expect(buttonMonthly).toHaveClass("bg-white");
  });

  test("should select YEARLY", () => {
    const { getByTestId } = render(<DashboardFilter />);
    const buttonYearly = getByTestId("yearly-button");
    fireEvent.click(buttonYearly);

    expect(buttonYearly).toHaveClass("bg-white");
  });
});
