import { resolveField, resolver } from "@athenajs/core";
import { GraphQLError, GraphQLScalarType } from "graphql";

@resolver()
export class DateTimeScalarResolver {
  @resolveField("DateTime")
  dateTime = new GraphQLScalarType({
    name: "DateTime",
    serialize: (date: Date): string => {
      if (!(date instanceof Date)) {
        throw new GraphQLError("can't serialize non-Date value as DateTime");
      }
      return date.toISOString();
    },
  });
}
