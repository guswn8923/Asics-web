let meuns = document.querySelectorAll('nav > ul > li');
let main_menu = document.querySelector('.main_menu');
let mainOrgHeight = main_menu.offsetHeight;

meuns.forEach(item=>{
  item.addEventListener('mouseenter',(e)=>{
    let subMenuHeight = e.target.querySelector('div').offsetHeight;
    main_menu.style.height = subMenuHeight + mainOrgHeight + 'px';
  });
  item.addEventListener('mouseleave',(e)=>{
    main_menu.style.height = mainOrgHeight + 'px';
  });
});

const slideWrapper = document.querySelector('.slide_wrapper');
const slideContainer = slideWrapper.querySelector('.slides');
let slides = slideContainer.querySelectorAll('li');
let currentIdx = 0;
let slideCount = slides.length;
const slidToShow = 1;
const leftBtn =slideWrapper.querySelector('#left');
const rightBtn =slideWrapper.querySelector('#right');
let timer;
let slideWidth = slideWrapper.offsetWidth;

//복사본 생성
  for(let slide of slides){
  let slideClone = slide.cloneNode(true);
  slideContainer.appendChild(slideClone);
}

  for(let i = 2;i>=0;i--){
  let slideClone = slides[i].cloneNode(true);
  slideContainer.prepend(slideClone);
}

slides = slideContainer.querySelectorAll('li');
let newslideCount = slides.length;


function moveSlide(idx){
  for(let slide of slides){
    slide.classList.remove('animated');
  }
}
slideContainer.style.left = `${slideWidth * -idx}px`;
currentIdx = idx;

  if(currentIdx == slideCount || currentIdx == -slideCount){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = 0;
    }, 500);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    }, 550);
    currentIdx = 0;
  }

leftBtn.addEventListener('click',(()=>{
  moveSlide(currentIdx-1);
},500));
rightBtn.addEventListener('click',(()=>{
  moveSlide(currentIdx+1);
},500));

slideContainer.addEventListener('mouseenter',()=>{
  clearInterval(timer);
});
slideContainer.addEventListener('mouseleave',()=>{
  autoSlide();
});

// let xAxis = {
//   downX:0,
//   upX:0
// };

// slideContainer.addEventListener('mousedown',(e)=>{
//   xAxis.downX = e.clientX;
// });
// slideContainer.addEventListener('mouseup',(e)=>{
//   xAxis.upX = e.clientX;
//   let diffenceX = xAxis.downX - xAxis.upX;

//   if(diffenceX > 0){
//     moveSlide(currentIdx + 1);
//   }else{
//     moveSlide(currentIdx - 1);
//   }
// });


document.addEventListener('DOMContentLoaded',()=>{
  const goTop = document.querySelector('#go-top');

  window.addEventListener('scroll',()=>{
    let scrollAmt = window.scrollY;
    if(scrollAmt > 600){
      goTop.classList.add('active');
    }else{
      goTop.classList.remove('active');
    }
  });

  goTop.addEventListener('click',(e)=>{
    e.preventDefault();
    window.scrollTo({
      left:0,
      top:0,
      behavior:'smooth'
    });
  });
});
