import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideApollo(() => {
      const httpLink = inject(HttpLink).create({
        uri: 'http://localhost:5047/graphql',
      });

      // Подешавање за GraphQLWsLink и WebSocket клијент
      const wsLink = new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:5047/graphql', // користимо проверени URI
          retryAttempts: Infinity,
          on: {
            connected: () => console.log('Connected to WebSocket'),
            closed: (event) => console.log('WebSocket closed:', event),
            error: (error) => console.error('WebSocket error:', error),
          },
        })
      );

      // Коришћење split функције за разликовање претплата
      const link = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      );

      return {
        link,
        cache: new InMemoryCache(),
      };
    }),
  ],
};
