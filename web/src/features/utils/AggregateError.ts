export class AggregateError extends Error {
  constructor(readonly errors: readonly Error[]) {
    super(errors.map(err => err.message).join("\n"));
  }
}
