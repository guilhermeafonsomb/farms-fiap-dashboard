import clsx from "clsx";
import { useDashboardFilterStore } from "@/store/dashboard";

export const FilterOptions = {
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
} as const;

export const DashboardFilter = () => {
  const { selectFilterOption, setSelectFilterOption } =
    useDashboardFilterStore();

  return (
    <div
      className="rounded-lg bg-primary-100 flex flex-row h-14 items-center justify-evenly px-3"
      role="group"
      aria-label="Filtro de período"
    >
      <button
        data-testid="weekly-button"
        onClick={() => setSelectFilterOption("WEEKLY")}
        className={clsx(
          "text-center py-2 px-4 sm:px-9 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          selectFilterOption === "WEEKLY" && "bg-white"
        )}
        aria-pressed={selectFilterOption === "WEEKLY"}
        aria-label="Filtrar por dados semanais"
      >
        <p
          className={clsx(
            selectFilterOption === "WEEKLY"
              ? "text-black font-semibold"
              : "text-primary-500"
          )}
        >
          {FilterOptions.WEEKLY}
        </p>
      </button>

      <button
        onClick={() => setSelectFilterOption("MONTHLY")}
        data-testid="monthly-button"
        className={clsx(
          "text-center py-2 px-4 sm:px-10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          selectFilterOption === "MONTHLY" && "bg-white"
        )}
        aria-pressed={selectFilterOption === "MONTHLY"}
        aria-label="Filtrar por dados mensais"
      >
        <p
          className={clsx(
            selectFilterOption === "MONTHLY"
              ? "text-black font-semibold"
              : "text-primary-500"
          )}
        >
          {FilterOptions.MONTHLY}
        </p>
      </button>

      <button
        onClick={() => setSelectFilterOption("YEARLY")}
        data-testid="yearly-button"
        className={clsx(
          "text-center py-2 px-4 sm:px-10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          selectFilterOption === "YEARLY" && "bg-white"
        )}
        aria-pressed={selectFilterOption === "YEARLY"}
        aria-label="Filtrar por dados anuais"
      >
        <p
          className={clsx(
            selectFilterOption === "YEARLY"
              ? "text-black font-semibold"
              : "text-primary-500"
          )}
        >
          {FilterOptions.YEARLY}
        </p>
      </button>
    </div>
  );
};
