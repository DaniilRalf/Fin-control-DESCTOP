import {configureStore} from "@reduxjs/toolkit"
import electronCacheSlice from './slices/electron-cache.slice'

export const store = configureStore({
    reducer: {
        electronCacheSlice: electronCacheSlice
    }
})
