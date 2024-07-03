import React, { useState, memo } from 'react'
import Mapplic from 'application/components/mapplic/Mapplic';
import { createParam } from 'solito';
import UseFloorPlanService from 'application/store/services/UseFloorPlanService';  
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { getColorScheme } from 'application/styles/colors';
import { Text } from 'native-base';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import WebLoading from 'application/components/atoms/WebLoading';
import SectionLoading from 'application/components/atoms/SectionLoading';

type ScreenParams = { id: string}
const { useParam } = createParam<ScreenParams>()


const areEqual = (prevProps: { id: string, json: any }, nextProps: { id: string, json: any }) => {
  // Compare json and id deeply or as needed
  return prevProps.id === nextProps.id && JSON.stringify(prevProps.json) === JSON.stringify(nextProps.json);
};

const MapplicMemoized = memo(Mapplic, areEqual);

const Detail = () => {
  const [id] = useParam('id');
  const { FetchFloorPlanDetail,detail,labels } = UseFloorPlanService();
  const [json, setJson] = useState({});
  const { event,modules } = UseEventService();
  const { _env } = UseEnvService();
  const { processing } = UseLoadingService();
  const module = modules.find((module) => {
    return module.alias === 'plans'
  });

  React.useEffect(() => {
    if (id) {
      FetchFloorPlanDetail({ id: Number(id) });
    }
  },[id]);

  React.useEffect(() => {
    if (!detail?.floorPlanPins) return;

    const jsonFromFile = require('application/config/mapplic_settings.json');
    const { floorPlan, floorPlanPins } = detail;

    const newJson = {
      ...jsonFromFile,
      layers: [{
        id: "first",
        name: floorPlan.floor_plan_name,
        file: `${_env.eventcenter_base_url}/assets/floorplans/${floorPlan.image}`,
        mapWidth: floorPlan.image_width,
        mapHeight: floorPlan.image_height
      }],
      settings: {
        ...jsonFromFile.settings,
        mapWidth: floorPlan.image_width,
        mapHeight: floorPlan.image_height,
        title: floorPlan.floor_plan_name
      },
      locations: [],
      groups: []
    };

    floorPlanPins.forEach((pin: any) => {
      const { id, type, exhibitor, sponsor, coordinateX, coordinateY } = pin;
      const categoryImage = getCategoryImage(pin);
      const detailLink= type === "exhibitor" ? `/${event.url}/exhibitors/detail/${exhibitor.id}` : `/${event.url}/sponsors/detail/${sponsor.id}`;
      const associatedGroups = getAssociatedGroups(pin);
      const subCategories = getSubCategories(pin);
      const categories = type === "exhibitor" ? exhibitor?.categories : sponsor?.categories;
      const firstCategory = categories ? categories[0] : null;
       newJson.locations.push({
        image: categoryImage,
        group: associatedGroups,
        id,
        cat_type: type,
        title: type === "exhibitor" ? exhibitor.name : sponsor.name,
        color: firstCategory ? firstCategory.color == '#ffffff' ? event?.settings?.primary_color : firstCategory.color : event?.settings?.primary_color,
        zoom: "7.5113",
        layer: "first",
        desc: subCategories,
        coord: [coordinateX, coordinateY],
        about: type === "exhibitor" ? exhibitor.booth : sponsor.booth,
        link: detailLink,
        style: "marker",
        type: "pin2"
      });

      if (categories) {
        categories.forEach((category: any) => {
          const existingGroup = newJson.groups.find((group:any) => group.id === category.id && group.type === type);
          if (!existingGroup) {
            newJson.groups.push({
              id: category.id,
              name: category.info[0].value,
              color: category.color,
              type
            });
          }
        });
      }
    });

    setJson(newJson);
  },[detail]);

  function getSubCategories(pin:any) {
    const subCategories = pin.exhibitor?.categories || pin.sponsor?.categories || [];
    return subCategories.map((subCategory:any) => {
      return `<p style="margin: 0 0 5px 0; font-size: 14px"><em style='background-color: ${subCategory.color}; width: 10px; height: 10px; display: inline-block; border-radius: 100%; border: 1px solid; margin-right: 5px; vertical-align: middle'></em>${subCategory.info[0].value}</p>`;
    }).join("");
  }

  function getCategoryImage(pin:any) {
    const baseUrl = process.env.NEXT_APP_EVENTCENTER_URL;
    if (pin.exhibitor) {
      return pin.exhibitor?.logo ? `${_env.eventcenter_base_url}/assets/exhibitors/${pin.exhibitor.logo}` : process.env.NEXT_APP_BASE_URL+'/img/exhibitors-default.png';
    } else if (pin.sponsor) {
      return  pin.sponsor?.logo ? `${_env.eventcenter_base_url}/assets/sponsors/${pin.sponsor.logo}` : process.env.NEXT_APP_BASE_URL+'/img/exhibitors-default.png';
    }
  }

  function getAssociatedGroups(pin:any): string {
    const groups: string[] = [];
    pin.exhibitor?.categories?.forEach((category:any) => {
      groups.push(category.id);
    });
    pin.sponsor?.categories?.forEach((category:any) => {
      groups.push(category.id);
    });
    return groups.join(",");
  }

  return (
    <>
    <NextBreadcrumbs module={module} title={detail?.floorPlan?.floor_plan_name} />
    <Text w={'100%'} fontSize="md">
      <div style={{width: '100%'}}>
        { !in_array('floor_plan_detail',processing) &&  (json as { settings?: any })?.settings ?
            <MapplicMemoized json={json} id={id} />
            : (
              <SectionLoading />
        )}
      </div>
    </Text>
    </>
  )
}

export default Detail