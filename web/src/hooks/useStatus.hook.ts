import {
  OptionsObject,
  ProviderContext as SnackbarContext,
  useSnackbar,
} from "notistack";

class Status {
  default = this.buildSetter("default");

  warn = this.buildSetter("warning");

  info = this.buildSetter("info");

  success = this.buildSetter("success");

  error = (err: unknown) => {
    this.snackbar.enqueueSnackbar(
      err instanceof Error ? err.message : (err as string),
      {
        variant: "error",
      },
    );
    return null;
  };

  constructor(private readonly snackbar: SnackbarContext) {}

  close() {
    this.snackbar.closeSnackbar();
  }

  private buildSetter(variant: OptionsObject["variant"]) {
    return (message: React.ReactNode): null => {
      this.snackbar.enqueueSnackbar(message, { variant });
      return null;
    };
  }
}

export const useStatus = (): Status => {
  const snackbar = useSnackbar();
  return new Status(snackbar);
};
