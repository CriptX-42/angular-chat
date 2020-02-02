import { NgModule } from '@angular/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";


@NgModule({

    imports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})
export class ApolloConfigModule {

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink
    ){
        const uri = 'https://api.graph.cool/simple/v1/ck01jw54u1xi001430x42mpag';
        const http = httpLink.create({ uri: uri })

        const linkError = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
              );
          
            if (networkError) console.log(`[Network error]: ${networkError}`);
          });

        apollo.create({
            link: ApolloLink.from([
                linkError,
                http
            ]),
            cache: new InMemoryCache()
        })
    }
}