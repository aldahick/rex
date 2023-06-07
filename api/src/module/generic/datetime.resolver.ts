import { scalar } from "@athenajs/core";
import { injectable } from "@athenajs/core";
import { GraphQLError, GraphQLScalarType } from "graphql";

@singleton()
export class DateTimeScalarResolver {
  @scalar("DateTime")
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
