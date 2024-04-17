import React, { useState } from 'react'
import Mapplic from 'application/components/mapplic/Mapplic';
import { createParam } from 'solito';
import UseFloorPlanService from 'application/store/services/UseFloorPlanService';  
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { getColorScheme } from 'application/styles/colors';
import { Text } from 'native-base';


type ScreenParams = { id: string}
const { useParam } = createParam<ScreenParams>()

const Detail = () => {
  const [id] = useParam('id');
  const { FetchFloorPlanDetail,detail } = UseFloorPlanService();
  const [json, setJson] = useState({});
  const { event } = UseEventService();
  const { _env } = UseEnvService()

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
      const detailLink= type === "exhibitor" ? `/${event.url}/exhibitors/${exhibitor.id}` : `/${event.url}/sponsors/${sponsor.id}`;
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
      return `<p style="margin: 0; font-size: 14px"><em style='background-color: ${subCategory.color}; width: 10px; height: 10px; display: inline-block; border-radius: 100%; border: 1px solid; margin-right: 5px; vertical-align: middle'></em>${subCategory.info[0].value}</p>`;
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
    <Text w={'100%'} fontSize="md">
      <div style={{width: '100%'}}>
        {(json as { settings?: any })?.settings ?
            <Mapplic json={json} id={id} />
            : null}
      </div>
    </Text>
  )
}

export default Detail