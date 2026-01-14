import { render } from "@/test/test-utils";
import { Loading } from "./index";

describe("Loading  tests", () => {
  it("should render Loading message", () => {
    const { getByText } = render(<Loading />);

    expect(getByText("Carregando dados do dashboard...")).toBeInTheDocument();
  });
});
