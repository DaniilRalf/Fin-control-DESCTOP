import {createSlice} from "@reduxjs/toolkit"
import {IncomeInterface} from "common/dist"
import _ from 'lodash';

const electronCacheSlice = createSlice({
    name: 'electronCacheSlice',
    initialState: {
        income: []
    } as {
        income: IncomeInterface[]
    },
    reducers: {
        setIncomeCache: (state, action) => {
            state.income = _.cloneDeep(action.payload.data)
        },
    }
})

export const { setIncomeCache } = electronCacheSlice.actions
export default electronCacheSlice.reducer
