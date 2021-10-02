import { useState } from 'react';

import './styles.css';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface Props {
  images: string[];
  height: number;
  width: number;
}

function ImageSlider({images, height, width, ...rest}: Props) {
 
  const [current, setCurrent] = useState(0);
  const length = images.length;

  function nextSlide() {
    setCurrent(current === length -1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? length -1 : current -1);
  }
  
  return (
    <section className="slider">
      <FaAngleLeft  className="left-arrow" onClick={prevSlide} size={32} color="#048243"/>
      <FaAngleRight className="right-arrow" onClick={nextSlide} size={32} color="#048243"/>

      {images.map((image, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && (<img src={image} alt="imagem do produto"  />)}
          
        </div>
      ))}
    </section>
  );
}
    
export default ImageSlider;