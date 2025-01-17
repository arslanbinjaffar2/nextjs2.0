import * as React from 'react';
import { Button, Text, View } from 'native-base';

const ButtonElement = ({ onPress, bg, children, minW, isDisabled }: any) => {
    const [hover, sethover] = React.useState(false)
    const tb1 = React.useRef<HTMLDivElement>(null);
    const [loaded,setLoaded] = React.useState(0)
    React.useEffect(() => {
      setLoaded(1)
    }, [])
    
    return (
        <Button isDisabled={isDisabled} minW={minW} onHoverIn={() => sethover(true)} onHoverOut={() => sethover(false)} onPress={onPress} ref={tb1}
            _hover={{ _text: { color: 'primary.hovercolor' } }} flex={1} borderWidth="0px" borderRightRadius={0} borderLeftRadius={0} py={0} borderColor="primary.darkbox" h="42px" bg={bg}
            _text={{ fontWeight: '600' }}>
            <View display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'} opacity={loaded}>
                <Text color={hover ? 'primary.hovercolor' : 'primary.text'} textAlign={'center'} isTruncated maxW={tb1.current?.clientWidth ? tb1.current?.clientWidth - 24 : '100px'}
                    display={'block'} fontWeight={600}>
                    {children}
                </Text>
            </View>
        </Button>
    )
}
export default ButtonElement;