import { useDashboardFilterStore } from "@/store/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DashboardFilterProps {
  children: React.ReactNode;
}

export const FilterOptions = ["WEEKLY", "MONTHLY", "YEARLY"] as const;

export const DashboardFilter = ({ children }: DashboardFilterProps) => {
  const { selectFilterOption, setSelectFilterOption } =
    useDashboardFilterStore();

  const handleReturnPtOption = (option: string) => {
    const translateOption = {
      WEEKLY: "Semanal",
      MONTHLY: "Mensal",
      YEARLY: "Anual",
    }[option];

    return translateOption;
  };

  return (
    <>
      <Tabs defaultValue={FilterOptions[1]}>
        <TabsList className="rounded-lg bg-primary-100 flex flex-row h-14 items-center justify-evenly px-3">
          {FilterOptions.map((option) => (
            <TabsTrigger
              key={option}
              data-testid={`${option.toLowerCase()}-button`}
              aria-label={`Filtrar por dados ${handleReturnPtOption(option)}`}
              value={option}
              onClick={() => setSelectFilterOption(option)}
            >
              {handleReturnPtOption(option)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectFilterOption}>{children}</TabsContent>
      </Tabs>
    </>
  );
};
