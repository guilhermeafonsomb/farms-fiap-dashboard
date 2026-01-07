import { act, renderHook } from "@/test/test-utils";
import { useDashboardFilterStore } from "./index";

describe("useDashboardFilterStore tests", () => {
  test("should return default value", () => {
    const { result } = renderHook(() => useDashboardFilterStore());
    expect(result.current.selectFilterOption).toBe("MONTHLY");
  });

  test("should change selected option", () => {
    const { result } = renderHook(() => useDashboardFilterStore());

    act(() => {
      result.current.setSelectFilterOption("WEEKLY");
    });

    expect(result.current.selectFilterOption).toBe("WEEKLY");

    act(() => {
      result.current.setSelectFilterOption("YEARLY");
    });

    expect(result.current.selectFilterOption).toBe("YEARLY");
  });
});
