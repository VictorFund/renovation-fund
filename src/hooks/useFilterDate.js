import { useMemo } from "react";

export const useFilterDate = (data, activeTab) => {
  return useMemo(() => {
    if (!data) return [];
    return data
      .filter(({ state }) => !activeTab || state === activeTab)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data, activeTab]);
};
