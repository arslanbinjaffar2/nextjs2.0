import React from 'react';
import { View, Text, Pressable } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';

export enum Status {
  Success = "success",
  Error = "error"
}

export interface ToastProps {
  status: Status;
  message: string;
}


  const ToastContainer = ({status,message,setShow}:{status:Status,message:string,setShow?:React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
      <View
        bg={'primary.darkbox'}
        w={'396px'}
        h={'77px'}
        p={'5'}
        mx={"5"}
        borderRadius={"lg"}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DynamicIcon
            iconType={status === Status.Error ? 'cancelcircle' : 'checkcircle'}
            iconProps={{ width: 24, height: 24 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              {status}
            </Text>
            <Text isTruncated maxW={"290px"} style={{ fontSize: 14, color: 'white' }}>{message} </Text>
          </View>
        </View>
        <Pressable >
          <DynamicIcon iconType={'close'} iconProps={{ width: 14, height: 14, color: 'white' }} />
        </Pressable>
      </View>
      
    )
      }


      export default ToastContainer

