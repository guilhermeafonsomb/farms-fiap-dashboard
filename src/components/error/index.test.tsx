import { fireEvent, render, vi } from "@/test/test-utils";
import { Error } from "./index";

describe("Error tests", () => {
  it("should render error message", () => {
    const { getByText } = render(<Error />);

    expect(
      getByText(
        "Ocorreu um erro ao buscar os dados do dashboard. Por favor, tente novamente."
      )
    ).toBeInTheDocument();
  });

  it("should have proper ARIA attributes", () => {
    const { container } = render(<Error />);
    const alertDiv = container.querySelector('[role="alert"]');

    expect(alertDiv).toBeInTheDocument();
    expect(alertDiv).toHaveAttribute("aria-live", "assertive");
  });

  it("should render error heading", () => {
    const { getByRole } = render(<Error />);

    expect(
      getByRole("heading", { level: 2, name: "Erro ao carregar dados" })
    ).toBeInTheDocument();
  });

  it("should reload page when clicking reload button", () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    const { getByRole } = render(<Error />);
    const reloadButton = getByRole("button", { name: "Recarregar página" });

    fireEvent.click(reloadButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
