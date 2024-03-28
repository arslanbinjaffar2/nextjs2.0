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
  id?: number;
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

  function generateBreadcrumbs(module?: Module): NextBreadcrumb[] {
    const breadcrumbList: NextBreadcrumb[] = [];
    breadcrumbList.push({ label: 'Dashboard', alias: 'dashboard', icon: 'dashboard' });
    if (module && module !== undefined) {
      breadcrumbList.push({ label: module.name, alias: module.alias, icon: module.alias.replace('-', '_') });
    }
    return breadcrumbList;
  }

  const breadcrumbs = generateBreadcrumbs(module);

  const handlePress = (alias: string) => {
    let url = `/${event.url}/${alias}`;
  
    if (alias === 'information_pages') {
      alias = alias.replace(/_/g, '-');
      if (module && module.alias === 'information_pages' && module.id) {
        url = `/${event.url}/${alias}/${module.id}`;
      } else {
        url = `/${event.url}/${alias}`;
      }
    }else if(alias === "general-info" || alias === "practical-info" || alias === "additional-info"){
      url = `/${event.url}/${alias}/event-info/0`;
    }
    push(url);
  };

  const color = title ? 'primary.text' : 'primary.500';
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
                <IcoDashboard width="18" height="18" color={'primary.text'} />
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
                <Text isTruncated={true} maxWidth="100px" color={color}>{breadcrumb.label.length > 30 ? `${breadcrumb.label.substring(0, 30)}...` : breadcrumb.label}</Text>
              </HStack>
            </Pressable>
          )}
          {index < breadcrumbs.length - 1 && (
            <Icon size="3" as={AntDesign} name="right" color={'primary.text'} />
          )}
        </React.Fragment>
      ))}
      {title && (
        <>
          <Icon size="3" as={AntDesign} name="right" color={'primary.text'} />
          <Text color="white" ml={3} isTruncated={true} maxWidth="300px">
            {title.length > 40 ? `${title.substring(0, 40)}...` : title}
          </Text>
        </>
      )}
    </HStack>
  );
};

export default NextBreadcrumbs;
