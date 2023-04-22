import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Slider.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function MainSlider() {
  const [imageIndex, setImageIndex] = useState(0)
  const [baners, setBaners] = useState([])

  useEffect(() => {
    const fetchGetBaners = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/baners'
        )
        setBaners(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetBaners()
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '-30px',
    beforeChange: (current, next) => setImageIndex(next),
    swipe: true,
    touchMove: true,

    touchThreshold: 15,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {baners?.map((slider, idx) => (
          <div
            key={new Date()}
            className={
              idx === imageIndex
                ? `${styles.slide} ${styles.activeSlide}`
                : styles.slide
            }>
            <img
              src={`/image/baners/${slider.img}`}
              alt="Image"
              className={styles.img}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MainSlider
