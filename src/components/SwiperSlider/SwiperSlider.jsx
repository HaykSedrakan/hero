import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useState } from 'react'
import './carousel.css'

const PreviousBtn = (props) => {
  const { className, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ color: 'rgb(55,55,55)', fontSize: '20px' }} />
    </div>
  )
}

const NextBtn = (props) => {
  const { className, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon
        style={{ color: 'rgb(55,55,55)', fontSize: '20px' }}
      />
    </div>
  )
}

const SwiperSlider = ({ images }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const handleImageClick = (index) => {
    setLightboxIndex(index)
  }

  return (
    <div style={{ margin: '30px', maxWidth: '500px' }} className="carousel">
      <Slider
        autoplay
        autoplaySpeed={10000}
        dots
        initialSlide={2}
        infinite
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
        customPaging={(i) => {
          return (
            <div>
              <img
                src={`/image/products/${images[i]}`}
                alt=""
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </div>
          )
        }}
        dotsClass="slick-dots custom-indicator">
        {images &&
          images.map((item) => (
            <div key={item} className="carousel-img-block">
              <img
                src={`/image/products/${item}`}
                alt=""
                style={{
                  width: '100%',
                  height: '65vh',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default SwiperSlider
