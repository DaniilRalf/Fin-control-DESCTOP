import {createSlice} from "@reduxjs/toolkit"

const electronCacheSlice = createSlice({
    name: 'electronCacheSlice',
    initialState: {
        data: null
    } as {data: any},
    reducers: {
        setCache: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { setCache } = electronCacheSlice.actions
export default electronCacheSlice.reducer
