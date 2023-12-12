import { resolveScalar, resolver } from "@athenajs/core";
import { GraphQLError, GraphQLScalarType } from "graphql";

@resolver()
export class DateTimeScalarResolver {
  @resolveScalar("DateTime")
  dateTime = new GraphQLScalarType({
    name: "DateTime",
    serialize: (date: unknown): string => {
      if (!(date instanceof Date)) {
        throw new GraphQLError("can't serialize non-Date value as DateTime");
      }
      return date.toISOString();
    },
  });
}
