import { Link } from 'react-router-dom';
import heroImg1 from '../assets/hero1.webp';
import heroImg2 from '../assets/hero2.webp';
import heroImg3 from '../assets/hero3.webp';
import heroImg4 from '../assets/hero4.webp';

const carouselImages = [heroImg1, heroImg2, heroImg3, heroImg4];

const Hero = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
          We're changing the way people shop
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <div className='mt-10'>
          <Link to='products' className='btn btn-primary uppercase'>
            Our Products
          </Link>
        </div>
      </div>
      <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box'>
        {carouselImages.map((img) => {
          return (
            <div key={img} className='carousel-item'>
              <img src={img} className='rounded-box h-full w-80 object-cover' />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;
