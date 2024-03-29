import { useState, useEffect } from 'react';

import './styles.css';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface Props {
  images: string[];
  height: number;
  width: number;
}

function ImageSlider({images, height, width, ...rest}: Props) {
 
  const [current, setCurrent] = useState(0);
  const [invisibleArrow, setInvisibleArrow] = useState('');
  const length = images.length;

  function nextSlide() {
    setCurrent(current === length -1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? length -1 : current -1);
  }

  useEffect(() => {
    setInvisibleArrow(images.length <= 1 ? "invisible-arrow" : "")  ;
  }, [images]);
  
  return (
    <section className="slider">
      <FaAngleLeft  className={`left-arrow ${invisibleArrow}`} onClick={prevSlide} size={32} color="#048243"/>
      <FaAngleRight className={`right-arrow ${invisibleArrow}`} onClick={nextSlide} size={32} color="#048243"/>

      {images.map((image, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && (<img src={image} alt="imagem do produto"  />)}
          
        </div>
      ))}
    </section>
  );
}
    
export default ImageSlider;