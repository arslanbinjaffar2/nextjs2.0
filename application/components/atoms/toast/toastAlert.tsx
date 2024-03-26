import React from "react";
import { Button, useToast, VStack, HStack, Text, Center, IconButton, CloseIcon, Alert } from "native-base";

 const ToastContainer = () => {
  const toast = useToast();
  const ToastDetails = [{
    title: "Account verified",
    variant: "solid",
    description: "Thanks for signing up with us.",
    isClosable: true
  }
];

  const ToastAlert = ({
    id,
    status,
    variant,
    title,
    description,
    isClosable,
    ...rest
  }:any) => <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant} {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title}
            </Text>
          </HStack>
          {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
          color: variant === "solid" ? "lightText" : "darkText"
        }} onPress={() => toast.close(id)} /> : null}
        </HStack>
        <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
          {description}
        </Text>
      </VStack>
    </Alert>;

  return <Center>
      <VStack space={2}>
        {ToastDetails.map((item, index) => <Button key={index} onPress={() => toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert id={id} {...item} />;
        }
      })}>
            {item.variant}
          </Button>)}
      </VStack>
    </Center>;
};

 
export default ToastContainer