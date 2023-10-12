import { useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import style from './home.module.css';
const slideItems = [
  {
    image: 'https://i.postimg.cc/y8ZRzZR6/hill.jpg',
    title: 'Hills',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/BvfKZn5T/cox-bazar.jpg',
    title: "Cox's Bazar",
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/9FS9SprN/sajek.jpg',
    title: 'Sajek',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/g0y6xb4f/sundorbon.jpg',
    title: 'Sundarban',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/BvfKZn5T/cox-bazar.jpg',
    title: "Cox's Bazar",
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/y8ZRzZR6/hill.jpg',
    title: 'Hills',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/9FS9SprN/sajek.jpg',
    title: 'Sajek',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
  {
    image: 'https://i.postimg.cc/g0y6xb4f/sundorbon.jpg',
    title: 'Sundarban',
    desc: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat  tieu',
  },
];
const Home = () => {
  useEffect(() => {
    document.getElementById('next').onclick = function () {
      let lists = document.querySelectorAll('.item');
      document.getElementById('slide').appendChild(lists[0]);
    };
    document.getElementById('prev').onclick = function () {
      let lists = document.querySelectorAll('item');
      document.getElementById('slide').prepend(lists[lists.length - 1]);
    };
  }, []);
  return (
    <div className=''>
      <div className={style.containerWrap}>
        <div id='slide'>
          {slideItems.map((item, index) => (
            <div
              key={index}
              className={`${style.item} item`}
              style={{
                backgroundImage: `url('${item.image}')`,
              }}
            >
              <div className={style.content}>
                <div className={style.name}>{item.title}</div>
                <div className={style.des}>{item.desc}</div>
                <button className={style.btn}>Booking</button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.buttons}>
          <button id='prev' className='flex justify-center items-center'>
            <AiOutlineArrowLeft className='text-black text-2xl' />
          </button>
          <button id='next' className='flex justify-center items-center'>
            <AiOutlineArrowRight className='text-black text-2xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
