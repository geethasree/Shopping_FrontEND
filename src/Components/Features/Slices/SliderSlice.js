import {createSlice} from '@reduxjs/toolkit'
import {sliderData} from '../../../assets/data/dummyData'
export const SliderSlice=createSlice({
    name:'slider slice',
    initialState:{
        value:0,
        length:sliderData.length-1,
    },
    reducers:{
        prevSlide(state,action){
            console.log('state : ',state)
            console.log('action : ',action)
            state.value=action.payload<0?state.length:action.payload;
        },
        nextSlide(state,action){
            console.log('state : ',state)
            console.log('action : ',action)
            state.value=action.payload>state.length?0:action.payload;
        },
        dotSlide(){

        },
    }
})

export const {prevSlide,nextSlide,dotSlide} = SliderSlice.actions;
export default SliderSlice.reducer;