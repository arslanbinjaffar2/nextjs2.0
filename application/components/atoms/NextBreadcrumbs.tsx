import React from 'react';
import { HStack, Icon, Text, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import DynamicIcon from 'application/utils/DynamicIcon';
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';

interface Module {
  alias: string;
  name: string;
}

interface NextBreadcrumb {
  label: string;
  alias: string;
  icon: string;
}

interface NextBreadcrumbsProps {
  module: Module | undefined;
  title?: string;
}

const NextBreadcrumbs: React.FC<NextBreadcrumbsProps> = ({ module, title }) => {
  const { push } = useRouter();
  const { event } = UseEventService();

  function generateBreadcrumbs(module: Module): NextBreadcrumb[] {
    const breadcrumbList: NextBreadcrumb[] = [];
    breadcrumbList.push({ label: 'Dashboard', alias: 'dashboard', icon: 'dashboard' });
    if (module) {
      breadcrumbList.push({ label: module.name, alias: module.alias, icon: module.alias.replace('-', '_') });
    }
    return breadcrumbList;
  }

  const breadcrumbs = generateBreadcrumbs(module || { alias: '', name: '' });

  const handlePress = (alias: string) => {
    push(`/${event.url}/${alias}`);
  };

  const color = title ? 'gray.500' : 'primary.text';

  return (
    <HStack w={'100%'} py={2} alignItems="center">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <Pressable
              py="1"
              px={3}
              borderWidth="0"
              rounded={'full'}
              onPress={() => {
                handlePress(breadcrumb.alias);
              }}>
              <HStack space="2" alignItems="center">
                <IcoDashboard width="18" height="18" color={'gray.500'} />
                <Text>{breadcrumb.label}</Text>
              </HStack>
            </Pressable>
          ) : (
            <Pressable
              disabled={!title}
              py="1"
              px={3}
              borderWidth="0"
              rounded={'full'}
              onPress={() => {
                if (title) handlePress(breadcrumb.alias);
              }}>
              <HStack space="2" alignItems="center">
                <DynamicIcon
                  iconType={breadcrumb.icon}
                  iconProps={{ width: 24, height: 21, color }}
                />
                <Text color={color}>{breadcrumb.label}</Text>
              </HStack>
            </Pressable>
          )}
          {index < breadcrumbs.length - 1 && (
            <Icon size="3" as={AntDesign} name="right" color={color} />
          )}
        </React.Fragment>
      ))}
      {title && (
        <>
          <Icon size="3" as={AntDesign} name="right" color={color} />
          <Text color="white" ml={3}>
            {title}
          </Text>
        </>
      )}
    </HStack>
  );
};

export default NextBreadcrumbs;
