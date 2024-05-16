import * as React from 'react';
import { Button, Text } from 'native-base'
    const ButtonElement = ({onPress, bg, children, minW, isDisabled}: any) => {
        const [hover, sethover] = React.useState(false)
        const tb1 = React.useRef<HTMLDivElement>(null);
        return (
           <Button isDisabled={isDisabled} minW={minW} onHoverIn={() => sethover(true)} onHoverOut={() => sethover(false)} onPress={onPress} ref={tb1} _hover={{_text: {color: 'primary.hovercolor'}}}   flex={1} borderWidth="0px" borderRightRadius={0} borderLeftRadius={0} py={0} borderColor="primary.darkbox"  h="42px" bg={bg}  _text={{ fontWeight: '600' }}><Text color={hover ? 'primary.hovercolor' : 'primary.text'} textAlign={'center'} isTruncated maxW={tb1.current?.clientWidth ? tb1.current?.clientWidth - 24 : ''}
           display={'block'}
           fontWeight={600}>
            {children}
           </Text>
            </Button> 
        )
    }
    export default ButtonElement;