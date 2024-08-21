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

let bsetWrapper = document.querySelector('.best-wrapper');
let bsetContainer = bsetWrapper.querySelector('.best-container');
let bestslides = bsetContainer.querySelectorAll('.best-container > li');
let bestCount = bestslides.length;
let bestCurrentIdx = 0;
let bestWidth = 342;
let bestgap = 30
let bsetmaxSlide = 3;
let nextBtn = bsetWrapper.querySelector('#next');
let prevBtn = bsetWrapper.querySelector('#prev'); 

let arrWrapper = document.querySelector('.arrival-wrapper');
let arrContainer = arrWrapper.querySelector('.arrival-container');
let arrslides = arrContainer.querySelectorAll('.arrival-container > li');
let arrnextBtn = arrWrapper.querySelector('#nexarr');
let arrprevBtn = arrWrapper.querySelector('#prearr'); 
let arrCount = arrslides.length;
let arrCurrentIdx = 0;
let arrWidth = 342;
let arrgap = 10;
let arrmaxSlide = 5;

let eventWrapper = document.querySelector('.event-wrapper');
let eventContainer = eventWrapper.querySelector('.event-contain');
let eventslides = eventContainer.querySelectorAll('.event-contain > li');
let eventnextBtn = eventWrapper.querySelector('#next_en');
let eventprevBtn = eventWrapper.querySelector('#prev_en'); 
let eventCount = eventslides.length;
let eventCurrentIdx = 0;
let eventWidth = 365;
let eventgap = 15;
let eventmasSlide = 5;
let timertwo;

//cookie
  document.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("hidePopup=true")) {
      document.getElementById("cookiePopup").style.display = "none";
  }

  document.getElementById("closeBtn").addEventListener("click", () => {
      if (document.getElementById("check").checked) {
          document.cookie = `hidePopup=true; expires=${new Date(Date.now() + 864e5).toUTCString()}; path=/`;
      }
      document.getElementById("cookiePopup").style.display = "none";
  });
});

//event_cookie
document.addEventListener('DOMContentLoaded', () => {
  document.cookie.split('; ').forEach(cookie => {
      const [name, value] = cookie.split('=');
      if (name === 'hideEventPopup' && value === 'true') {
          document.getElementById('evcookie_Popup').style.display = 'none';
      }
  });

  document.getElementById('event_closeBtn').addEventListener('click', () => {
      if (document.getElementById('event_check').checked) {
          const date = new Date();
          date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
          document.cookie = `hideEventPopup=true; expires=${date.toUTCString()}; path=/`;
      }
      document.getElementById('evcookie_Popup').style.display = 'none';
  });
});


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


//main slide
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


//best slide
function moveSlide(num){
  bsetContainer.style.left = `${-num * (bestWidth + bestgap)}px`;
  bestCurrentIdx  = num;

  if(bestCurrentIdx  >= bestCount-bsetmaxSlide){
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }

  if(bestCurrentIdx  === 0){
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }
}

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(bestCurrentIdx  < bestCount - bsetmaxSlide) {
    moveSlide(bestCurrentIdx  + 1);
  }
});

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(bestCurrentIdx  > 0) {
    moveSlide(bestCurrentIdx  - 1);
  }
});

moveSlide(0);

//arrival slide
function moveToSlide(num){
  arrContainer.style.left = `${-num * (arrWidth + arrgap)}px`;
  arrCurrentIdx = num;

  if(arrCurrentIdx >= arrCount-arrmaxSlide){
    arrnextBtn.classList.add('disabled');
  } else {
    arrnextBtn.classList.remove('disabled');
  }

  if(arrCurrentIdx === 0){
    arrprevBtn.classList.add('disabled');
  } else {
    arrprevBtn.classList.remove('disabled');
  }
}

arrnextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(arrCurrentIdx < arrCount - arrmaxSlide) {
    moveToSlide(arrCurrentIdx + 1);
  }
});

arrprevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(arrCurrentIdx > 0) {
    moveToSlide(arrCurrentIdx - 1);
  }
});

moveToSlide(0);

//event slide
for(let i = 0; i<eventCount; i++){
  let cloneSlide = eventslides[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  eventContainer.appendChild(cloneSlide);
}

for(let i = eventCount-1; i >= 0; i--){
  let cloneSlide = eventslides[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  eventContainer.prepend(cloneSlide);
}

let allEventSlied = eventContainer .querySelectorAll('li');
let NewEventSlideCount = allEventSlied.length;

eventContainer.style.width =eventWidth*NewEventSlideCount+'px';

function setToLayout(){
  eventContainer.style.transform = `translateX(-${eventWidth*eventCount+(eventgap*(allEventSlied-1))}px)`;
  eventContainer.style.width =eventWidth*NewEventSlideCount+'px';
}
setToLayout();

window.addEventListener('resize',()=>{
  setToLayout();
})

function goslide(num){
  eventContainer.style.left = `${-num * (eventWidth+eventgap)}px`;
  eventCurrentIdx =num;
  
  for(let h2 of allEventSlied){
    h2.classList.remove('active');
  }
  allEventSlied[eventCount + num].classList.add('active');

  if(eventCurrentIdx === -5){
    setTimeout(()=>{
      eventContainer.classList.remove('animated');
      eventContainer.style.left = 0;
      eventCurrentIdx = 0;
    },500);
    setTimeout(()=>{
      eventContainer.classList.add('animated');
    },600);
  }

  if(eventCurrentIdx == eventCount*2-1){
    setTimeout(()=>{
      eventContainer.classList.remove('animated');
      eventContainer.style.left = `${(eventCount-1)*-100}%`;
      eventCurrentIdx = eventCount-1;
    },500);
    setTimeout(()=>{
      eventContainer.classList.add('animated');
    },600);
  }
}

eventnextBtn.addEventListener('click',((e)=>{
  e.preventDefault();
  goslide(eventCurrentIdx+1);
}));
eventprevBtn.addEventListener('click',((e)=>{
  e.preventDefault();
  goslide(eventCurrentIdx-1);
}));
goslide(0);

function AutoTSlide(){
  timertwo = setInterval(()=>{
    let ntIdx = (eventCurrentIdx + 1)% eventCount;

    goslide(ntIdx);
  }, 3000);
}

AutoTSlide();

eventWrapper.addEventListener('mouseenter', ()=>{clearInterval(timertwo);
});
eventWrapper.addEventListener('mouseleave', ()=>{ AutoTSlide();});

//top btn
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
