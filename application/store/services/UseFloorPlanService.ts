import { useCallback } from 'react'

import { SelectFloorPlans, FloorPlanActions,  } from 'application/store/slices/FloorPlan.Slice'

import {  FloorPlan } from 'application/models/floorPlans/FloorPlans'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type FloorPlanServiceOperators = {
    floor_plans: FloorPlan[],
    FetchFloorPlans: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseFloorPlanService = (): Readonly<FloorPlanServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        floor_plans: useAppSelector(SelectFloorPlans),
        FetchFloorPlans: useCallback(
            () => {
                dispatch(FloorPlanActions.FetchFloorPlans())
            },
            [dispatch],
        ),
    }
}

export default UseFloorPlanService
