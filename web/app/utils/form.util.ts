import z from "zod";

export const formToObject = <T>(
  formData: FormData,
  schema: z.ZodSchema<T, z.ZodTypeDef, object>,
) => schema.parse(Object.fromEntries(formData.entries()));

export const objectToForm = <T extends object>(obj: T): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData.set(key, value);
  }
  return formData;
};

export const getFormInput = <E extends Element = HTMLInputElement>(
  container: HTMLElement | null,
  inputName: string,
): E | null => container?.querySelector<E>(`[name="${inputName}"]`) ?? null;
