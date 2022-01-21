
import { useState, useEffect, useRef } from 'react';
import { useInterval } from '../../libs/hooks';
import style from './Carousel.module.scss';

const photosArray = [
    'https://picsum.photos/600/400',
    'https://picsum.photos/601/400',
    'https://picsum.photos/600/401',
    'https://picsum.photos/599/400',
];

const Carousel = (props) =>
{
    // Props
    const photos = props.images || photosArray;
    const width = props.width || 600;
    const time = props.time || 6000;

    // Functions
    const scrollDx = () => 
    {
        if(carouselRef.current.scrollLeft % width === 0)
        {
            if((carouselRef.current.scrollLeft + width) >= carouselRef.current.scrollWidth)
            {
                carouselRef.current.scrollLeft = 0;
            }
            else
            {
                carouselRef.current.scrollLeft += width;
            }
        }
    }
    
    const scrollSx = () =>
    {
        if(carouselRef.current.scrollLeft % width === 0)
        {
            if((carouselRef.current.scrollLeft - width) < 0)
            {
                carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - width;
            }
            else
            {
                carouselRef.current.scrollLeft -= width;
            }
        }
    }

    // State
    const [images, setImages] = useState([]);
    const carouselRef = useRef(); 

    useEffect(() => {
        setImages(photos);
    }, []);

    useInterval(scrollDx, time);


    return (
        <div className={style.container} >
            <button onClick={scrollSx}>{'<'}</button>
            <div className={style.carousel} ref={carouselRef} style={{ width: width }}>
                {images.map((img) => (
                    <img src={img} alt={img} key={img} style={{ minWidth: width }}/>
                ))}
            </div>
            <button onClick={scrollDx}>{'>'}</button>
        </div>
    );

};

export default Carousel;