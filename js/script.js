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