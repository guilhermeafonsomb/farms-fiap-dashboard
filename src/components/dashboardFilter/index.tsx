import clsx from "clsx";
import { useState } from "react";

export const FilterOptions = {
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
} as const;

export const DashboardFilter = () => {
  const [selectFilterOption, setSelectFilterOption] =
    useState<keyof typeof FilterOptions>("MONTHLY");

  return (
    <div className="rounded-lg bg-primary-100 flex flex-row h-14 items-center justify-evenly px-3">
      <button
        data-testid="weekly-button"
        onClick={() => setSelectFilterOption("WEEKLY")}
        className={clsx(
          "text-center py-2 px-4 sm:px-9 rounded-lg ",
          selectFilterOption === "WEEKLY" && "bg-white"
        )}
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
          "text-center py-2 px-4 sm:px-10 rounded-lg ",
          selectFilterOption === "MONTHLY" && "bg-white"
        )}
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
          "text-center py-2 px-4 sm:px-10 rounded-lg ",
          selectFilterOption === "YEARLY" && "bg-white"
        )}
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
