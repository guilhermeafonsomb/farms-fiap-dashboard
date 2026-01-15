import { render } from "@/test/test-utils";
import { Loading } from "./index";

describe("Loading tests", () => {
  it("should render Loading message", () => {
    const { getByText } = render(<Loading />);

    expect(getByText("Carregando dados do dashboard...")).toBeInTheDocument();
  });

  it("should have proper ARIA attributes", () => {
    const { container } = render(<Loading />);
    const statusDiv = container.querySelector('[role="status"]');

    expect(statusDiv).toBeInTheDocument();
    expect(statusDiv).toHaveAttribute("aria-live", "polite");
  });

  it("should have screen reader-only text", () => {
    const { container } = render(<Loading />);
    const srText = container.querySelector(".sr-only");

    expect(srText).toHaveTextContent(
      "Por favor, aguarde enquanto os dados são carregados"
    );
  });

  it("should display loading animation", () => {
    const { container } = render(<Loading />);
    const animationDiv = container.querySelector(".animate-pulse");

    expect(animationDiv).toBeInTheDocument();
  });
});
