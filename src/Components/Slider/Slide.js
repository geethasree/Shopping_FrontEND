import React from 'react'
import './slider.css'
import { prevSlide,nextSlide,dotSlide } from '../Features/Slices/SliderSlice'
import { useSelector,useDispatch } from 'react-redux'
import {sliderData} from '../../assets/data/dummyData'

const Slide = () => {
  const slideIndex=useSelector((state)=>state.slider.value);
  console.log('value is : ',slideIndex)
  const dispatch=useDispatch()
  return (
    <div>
        <div className='sliderImage'>
        {
            sliderData.map((eachItem)=>
                    
                    <img src={eachItem.img} alt={eachItem.alt} className={(slideIndex===parseInt(eachItem.id))?'sliderimageshow':'sliderimagehide'} />
            )
        }
          <div className='slidercontrols'>
              <button onClick={()=>dispatch(prevSlide(slideIndex-1))}>&lt;</button>
              <button onClick={()=>dispatch(nextSlide(slideIndex+1))}>&gt;</button>   
          </div>
        </div>
        
    </div>
  )
}

export default Slide