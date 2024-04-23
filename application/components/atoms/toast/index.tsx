import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import { useAppDispatch, useAppSelector } from 'application/store/Hooks';
import { UseToastService } from 'application/store/services/UseToastService';
import { Toast } from 'application/store/slices/Toast.Slice';

export enum Status {
  Success = "success",
  Error = "error"
}

export interface ToastProps {
  status: string;
  message: string;
}


  const SingleToast = ({index,toast}:{index:number,toast:Toast}) => {
    const {onClose,removeFirstToast}=UseToastService()
    useEffect(()=>{
      if(toast?.duration && toast.duration !== 0){
        setTimeout(()=>{
          removeFirstToast()
          },toast.duration || 3000)
      }
    },[])
    return(
      <View
        bg={'primary.darkbox'}
        w={'396px'}
        h={'77px'}
        p={'5'}
        borderRadius={"lg"}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DynamicIcon
            iconType={status === "error" ? 'cancelcircle' : 'checkcircle'}
            iconProps={{ width: 24, height: 24 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              {toast.status}
            </Text>
            <Text style={{ fontSize: 14, color: 'white' }}>{toast.message}</Text>
          </View>
        </View>
        <Pressable onPress={()=>onClose({id:index})}>
          <DynamicIcon iconType={'close'} iconProps={{ width: 14, height: 14, color: 'white' }} />
        </Pressable>
      </View>
      
    )
      }




const ToastContainer = () => {
  const {toasts}=UseToastService()
  return (
    <View position={'absolute'} right={'0'} bottom={'0'}> 
      {toasts.length>0  && 
      <View style={{ gap:6 }}>
       {toasts?.map((toast,index)=>{
           return(
               <SingleToast toast={toast}
               index={index}
               />
               )
           })}
       </View>
      } 
      </View>
  )
}

export default ToastContainer

