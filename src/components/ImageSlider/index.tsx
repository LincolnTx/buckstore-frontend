import './styles.css';

interface Props {
  images: string[];
  height: number;
  width: number;
}

function ImageSlider({images, height, width, ...rest}: Props) {
  
  
  return (
    <img 
      src={images[0]} 
      alt="imagens do produto" 
      height={`${height}%`}
      width={`${width}%`}
    />
  );
}
    
export default ImageSlider;