import React from 'react'
import { Container, Image, Text } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import BoxItem from 'application/components/atoms/exhibitors/BoxItem'

const Listing = () => {
  return (
    <Container w="100%" maxW="100%">
      <IconWithLeftHeading icon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 22, height: 24 }} />} title="OUR EXHIBITORS" />
      <BoxItem
        image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
        category="Technology"
        bg="#E03C30"
        speakers={109}
      />
      <BoxItem
        image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31750.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
        category="Technology"
        bg="#2EAF7D"
        speakers={109}
      />
      <BoxItem
        image={<Image source={{ uri: 'https://wallpaperaccess.com/full/317504.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
        category="Technology"
        bg=""
        speakers={109}
      />
      <BoxItem
        image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31755.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
        category="Technology"
        bg="#E03C30"
        speakers={109}
      />
    </Container>
  )
}

export default Listing