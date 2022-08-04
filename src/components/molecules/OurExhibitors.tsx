import React from 'react'
import { Container, Image, Text } from 'native-base'
import HeadingBox from '@src/components/atoms/HeadingBox'
import IcoExhibitors from '@src/assets/icons/IcoExhibitors'
import BoxItem from '@src/components/atoms/exhibitors/BoxItem'

const OurExhibitors = () => {
  return (
    <Container w="100%" maxW="100%">
      <HeadingBox icon={<IcoExhibitors width="22" height="24" />} title="OUR EXHIBITORS" />
      <BoxItem 
        image={<Image source={{uri:'https://wallpaperaccess.com/full/31751.jpg'}} alt="Alternate Text" w="210px" h="72px"/>}
        category="Technology"
        bg="#E03C30"
        speakers={109}
      />
      <BoxItem 
        image={<Image source={{uri:'https://wallpaperaccess.com/full/31750.jpg'}} alt="Alternate Text" w="210px" h="72px"/>}
        category="Technology"
        bg="#2EAF7D"
        speakers={109}
      />
      <BoxItem 
        image={<Image source={{uri:'https://wallpaperaccess.com/full/317504.jpg'}} alt="Alternate Text" w="210px" h="72px"/>}
        category="Technology"
        bg=""
        speakers={109}
      />
      <BoxItem 
        image={<Image source={{uri:'https://wallpaperaccess.com/full/31755.jpg'}} alt="Alternate Text" w="210px" h="72px"/>}
        category="Technology"
        bg="#E03C30"
        speakers={109}
      />
    </Container>
    
  )
}

export default OurExhibitors