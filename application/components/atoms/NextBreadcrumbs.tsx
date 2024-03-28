import React from 'react';
import { HStack, Icon, Text, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import DynamicIcon from 'application/utils/DynamicIcon';
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import { Module } from 'application/models/Module'
import { Document } from 'application/models/document/Document'

interface NextBreadcrumb {
  label: string;
  alias: string;
  icon: string;
}

interface NextBreadcrumbsProps {
  module: Module | undefined;
  title?: string;
  additionalBreadcrubms?: Document[] | undefined;
  onBreadcrumbPress?: (breadcrumb: Document) => void;
  onAdditionalMainBreadcrumbPress?: () => void | undefined;
}

const NextBreadcrumbs: React.FC<NextBreadcrumbsProps> = ({ module, title, additionalBreadcrubms, onBreadcrumbPress, onAdditionalMainBreadcrumbPress }) => {
  
  const { push } = useRouter();
  const { event } = UseEventService();

  React.useEffect(() => {
    console.log('Breadcrumbs updated:', additionalBreadcrubms);
  }, [additionalBreadcrubms]); // Log when breadcrumbs change


  function generateBreadcrumbs(module?: Module): NextBreadcrumb[] {
    const breadcrumbList: NextBreadcrumb[] = [];
    breadcrumbList.push({ label: 'Dashboard', alias: 'dashboard', icon: 'dashboard' });
    if (module && module !== undefined) {
      breadcrumbList.push({ label: module.name, alias: module.alias, icon: module.icon });
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

  const color = title ? 'primary.text' : 'primary.text';

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
                <Text color={color}>{breadcrumb.label}</Text>
              </HStack>
            </Pressable>
          ) : (
            <Pressable
              disabled={!(title || (additionalBreadcrubms && additionalBreadcrubms.length > 0))}
              py="1"
              px={3}
              borderWidth="0"
              rounded={'full'}
              onPress={() => {
                if (title || (additionalBreadcrubms && additionalBreadcrubms.length > 0)) {
                  if(title){
                    handlePress(breadcrumb.alias);
                  }else if(additionalBreadcrubms && additionalBreadcrubms.length > 0 && onAdditionalMainBreadcrumbPress){
                    onAdditionalMainBreadcrumbPress();
                  }
                }
              }}>
              <HStack space="2" alignItems="center">
                {/* <DynamicIcon
                  iconType={breadcrumb.icon}
                  iconProps={{ width: 24, height: 21, color }}
                /> */}
                <DynamicIcon iconType={breadcrumb?.icon?.replace('@2x','').replace('-icon','').replace('-','_').replace('.png', '') } iconProps={{ width: 24, height: 21 }} />
                <Text isTruncated={true} maxWidth="150px" color={color}>{breadcrumb.label.length > 30 ? `${breadcrumb.label.substring(0, 30)}...` : breadcrumb.label}</Text>
              </HStack>
            </Pressable>
          )}
          {index < breadcrumbs.length - 1 && (
            <Icon size="3" as={AntDesign} name="right" color={color} />
          )}
        </React.Fragment>
      ))}

      {additionalBreadcrubms && additionalBreadcrubms.map((additionalBreadcrubm, index) => (
            <React.Fragment key={index}>
              <Icon size="3" as={AntDesign} name="right" color={color} />
                <Pressable
                  py="1"
                  px={3}
                  borderWidth="0"
                  rounded={'full'}
                  onPress={() => onBreadcrumbPress?.(additionalBreadcrubm)}>
                  <HStack space="2" alignItems="center">
                    <Text isTruncated={true} maxWidth="150px" color={color}>{additionalBreadcrubm.name}</Text>
                  </HStack>
                </Pressable>
            </React.Fragment>
          ))}

      {title && (
        <>
          <Icon size="3" as={AntDesign} name="right" color={color} />
          <Text color={color} ml={3} isTruncated={true} maxWidth="300px">
            {title.length > 40 ? `${title.substring(0, 40)}...` : title}
          </Text>
        </>
      )}
    </HStack>
  );
};

export default NextBreadcrumbs;
