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
              'event-info-detail': 'event-info-detail/:cms/:id',
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
