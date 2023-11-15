import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'welcome',
            screens: {
              welcome: '',
              'event-code-login': 'event-code-login',
              'login': 'login',
              'reset-password-request': 'reset-password-request',
              'email-login': 'email-login',
              'events': 'events',
              'dashboard': 'dashboard',
              'event-info': ':url/:cms/event-info/:id',
              'event-info-detail': ':url/:cms/event-info-detail/:id',
              'sponsor-detail': ':url/sponsors/detail/:id',
              'exhibitor-detail': ':url/exhibitors/detail/:id',
              'attendees': ':url/attendees/:slug',
              'polls': ':url/polls',
              'poll-detail': ':url/polls/detail/:id',
              'survey': ':url/survey',
              'survey-detail': ':url/survey/detail/:id',
              'agendas': ':url/agendas',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
