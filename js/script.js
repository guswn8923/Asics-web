let meuns = document.querySelectorAll('nav > ul > li');
let main_menu = document.querySelector('.main_menu');
let mainOrgHeight = main_menu.offsetHeight;
let slideWrapper = document.querySelector('.slide_wrapper');
let slideContainer = slideWrapper.querySelector('.slides');
let slides = slideContainer.querySelectorAll('li');
let slideCount = slides.length;
let currentIdx = 0;
let leftBtn = slideWrapper.querySelector('#left');
let rightBtn = slideWrapper.querySelector('#right');
let timer;
let slideWidth = 0;

//sitemap
meuns.forEach(item=>{
  item.addEventListener('mouseenter',(e)=>{
    let subMenuHeight = e.target.querySelector('div').offsetHeight;
    main_menu.style.height = subMenuHeight + mainOrgHeight + 'px';
  });
  item.addEventListener('mouseleave',(e)=>{
    main_menu.style.height = mainOrgHeight + 'px';
  });
});



for(let i = 0; i<slideCount; i++){
  let cloneSlide = slides[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  slideContainer.appendChild(cloneSlide);
}

for(let i = slideCount-1; i >= 0; i--){
  let cloneSlide = slides[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  slideContainer.prepend(cloneSlide);
}


let allslides = slideContainer.querySelectorAll('li');
let newslideCount = allslides.length;

slideContainer.style.width =slideWidth*newslideCount+'px';

//main slide
function setLayout(){
  slideWidth = slideWrapper.offsetWidth;
  slideContainer.style.transform = `translateX(-${slideWidth*slideCount}px)`;
  slideContainer.style.width =slideWidth*newslideCount+'px';
}
setLayout();

window.addEventListener('resize',()=>{
  setLayout();
})

function goToslide(num){
  slideContainer.style.left = `${-num * slideWidth}px`;
  currentIdx =num;
  
  for(let h2 of allslides){
    h2.classList.remove('active');
  }
  allslides[slideCount + num].classList.add('active');
  console.log(currentIdx);
  if(currentIdx === -3){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = 0;
      currentIdx = 0;
    },400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500);
  }

  if(currentIdx == slideCount*2-1){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = `${(slideCount-1)*-100}%`;
      currentIdx = slideCount-1;
    },400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500);
  }
}



leftBtn.addEventListener('click',((e)=>{
  e.preventDefault();
  goToslide(currentIdx-1);
}));
rightBtn.addEventListener('click',((e)=>{
  e.preventDefault();
  goToslide(currentIdx+1);
}));
goToslide(0);


function AutoSlide(){
  timer = setInterval(()=>{
    let nextIdx = (currentIdx + 1)% slideCount;

    goToslide(nextIdx);
  }, 4000);
}

AutoSlide();

slideWrapper.addEventListener('mouseenter', ()=>{clearInterval(timer);
});
slideWrapper.addEventListener('mouseleave', ()=>{ AutoSlide();});





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
