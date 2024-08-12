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