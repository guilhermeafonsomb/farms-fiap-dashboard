export const translatePeriod = (period: "WEEKLY" | "MONTHLY" | "YEARLY") => {
  const translate = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  return translate[period] ?? "";
};
