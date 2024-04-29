import { useCallback } from 'react'

import { SelectFloorPlans, FloorPlanActions, SelectFloorPlanSponsorCount, SelectFloorPlanDetail,  } from 'application/store/slices/FloorPlan.Slice'

import {  FloorPlan, FloorPlanDetail } from 'application/models/floorPlans/FloorPlans'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Select } from 'native-base'

export type FloorPlanServiceOperators = {
    floor_plans: FloorPlan[],
    detail: FloorPlanDetail | null,
    sponsorCount: number;
    exhibitorCount: number;
    FetchFloorPlans: () => void,
    FetchFloorPlanDetail: (payload: { id: number }) => void
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseFloorPlanService = (): Readonly<FloorPlanServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        floor_plans: useAppSelector(SelectFloorPlans),
        sponsorCount: useAppSelector(SelectFloorPlanSponsorCount),
        exhibitorCount: useAppSelector(SelectFloorPlanSponsorCount),
        detail: useAppSelector(SelectFloorPlanDetail),
        FetchFloorPlans: useCallback(
            () => {
                dispatch(FloorPlanActions.FetchFloorPlans())
            },
            [dispatch],
        ),
        FetchFloorPlanDetail: useCallback(
            (payload: { id: number }) => {
                dispatch(FloorPlanActions.FetchFloorPlanDetail(payload))
            },
            [dispatch],
        ),
    }
}

export default UseFloorPlanService
