import { createSlice, PayloadAction } from '@reduxjs/toolkit'



import { RootState } from 'application/store/Index'
import { Status } from '../../components/atoms/toast'
export type Toast={
    status:string
    message:string
}

export interface ToastStateType {
    toasts:Toast[]
}

const initialState: ToastStateType = {
    toasts:[],
   
}

// Slice
export const ToastSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        AddToast(state, action: PayloadAction<{ status:string ,message:string}>) { 
            state.toasts.push(action.payload)
        },    
        onClose(state, action: PayloadAction<{id:number}>){
            state.toasts =  state.toasts.filter((item,index)=> index !==action.payload.id)
        },
        removeFirstToast: (state) => {
            state.toasts.shift();
        }
    },
})

// Actions
export const ToastActions = {
    addtoast:ToastSlice.actions.AddToast,
    onclose:ToastSlice.actions.onClose,
    removefirst:ToastSlice.actions.removeFirstToast
}
export const ToastsState = (state: RootState) => state.toast.toasts
// Reducer
export default ToastSlice.reducer