import { fireEvent, render } from "@/test/test-utils";
import { DashboardFilter } from ".";

describe("DashboardFilter tests", () => {
  test("should render the component", () => {
    const { getByText } = render(<DashboardFilter children={<p>Test</p>} />);
    expect(getByText("Test")).toBeInTheDocument();
  });

  test("should select WEEKLY", () => {
    const { getByTestId } = render(<DashboardFilter children={<p>Test</p>} />);
    const buttonWeekly = getByTestId("weekly-button");
    fireEvent.click(buttonWeekly);

    expect(buttonWeekly).toHaveClass("data-[state=active]:font-semibold");
  });

  test("should select MONTHLY", () => {
    const { getByTestId } = render(<DashboardFilter children={<p>Test</p>} />);

    const buttonMonthly = getByTestId("monthly-button");

    fireEvent.click(buttonMonthly);

    expect(buttonMonthly).toHaveClass("data-[state=active]:font-semibold");
  });

  test("should select YEARLY", () => {
    const { getByTestId } = render(<DashboardFilter children={<p>Test</p>} />);
    const buttonYearly = getByTestId("yearly-button");
    fireEvent.click(buttonYearly);

    expect(buttonYearly).toHaveClass("data-[state=active]:font-semibold");
  });
});
