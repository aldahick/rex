import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { computed, makeObservable } from "mobx";
import { singleton } from "tsyringe";

import { ConfigService } from "../features/utils/config.service";
import { AuthStore } from "./auth.store";

@singleton()
export class ApolloStore {
  constructor(
    private readonly authStore: AuthStore,
    private readonly config: ConfigService
  ) {
    makeObservable(this);
  }

  @computed
  get client(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      link: createHttpLink({
        uri: `${this.config.apiUrl}/graphql`,
        headers: {
          authorization: this.authStore.token !== undefined ? `Bearer ${this.authStore.token}` : ""
        }
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: { errorPolicy: "all" },
        mutate: { errorPolicy: "all" },
      },
    });
  }
}
