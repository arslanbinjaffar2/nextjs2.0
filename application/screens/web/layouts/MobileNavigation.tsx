import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import SButton from "./SButton";
import { useWindowDimensions } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Box, Text, View } from "native-base";



const PAGE_WIDTH = 600;

function Index() {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = React.useState([...new Array(20).keys()]);
  const [isVertical, setIsVertical] = React.useState(false);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = isVertical
    ? ({
      vertical: true,
      swipe: false,
      width: windowWidth/4 - 30,
      height: 50,
    } as const)
    : ({
      vertical: false,
      width: windowWidth/4 - 30,
      height: 50,
    } as const);

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, width: '100%' }}>
      <View w={'100%'}>
      <Carousel
        {...baseOptions}
        loop
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={"xxx"}
        style={{ width: "100%" }}
        autoPlay={false}
        data={data}
        pagingEnabled={false}
        renderItem={({ index }) => <Animated.View><Text  fontSize="xs">Text</Text></Animated.View>}
      />
          </View>
      <ScrollView style={{ flex: 1 }}>
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: -1, animated: true });
          }}
        >
          prev
        </SButton>
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: 1, animated: true });
          }}
        >
          next
        </SButton>
      </ScrollView>
    </SafeAreaView>
  );
}


export default Index;
