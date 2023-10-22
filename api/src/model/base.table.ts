import { createBaseTable } from "orchid-orm";

export const BaseTable = createBaseTable({
  columnTypes: (t) => ({
    ...t,
    tsEnum: <T extends string>(name: string, obj: Record<string, T>) =>
      t.enum(name, Object.values(obj) as [T, ...T[]]),
  }),
});
