/*========================== Menu Show Y Hidden ============================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* ============= Menu Show ============== */
/* Validate if constant exist */
if(navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/* ============= Menu Hidden ============== */
/* Validate if constant exist */
if(navClose){
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/* ==================== Remove Menu Mobile =================== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
  const navMenu = document.getElementById('nav-menu');
  /*  When we click on each nav__menu link then, we remove the show-menu class*/
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* =================== Accordion Skiils ====================== */
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
  let itemClass = this.parentNode.className;
  for(let i=0; i<skillsContent.length; i++){
    skillsContent[i].className = 'skills__content skills__close';
  }
  if(itemClass === 'skills__content skills__close'){
    this.parentNode.className = 'skills__content skills__open';
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/* =================== Qualification Tabs =====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active');
    });
    target.classList.add('qualification__active');
    tabs.forEach(tab => {
      tab.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  })
});

/* ==================  Services Modal =========================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
  modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach(modalView => {
      modalView.classList.remove('active-modal');
    });
  });
});


/* ======================= Portfolio Swiper ========================== */
let swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

/* ======================= Testimonial Swiper ========================== */
let swiperTestimonial = new Swiper('.testimonial__container', {
  grabCursor: true,
  loop: true,
  spaceBetween: 48,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  breakpoints: {
    568: {
      slidesPerView: 2
    }
  }
});

/* ========================= Scroll section active link =================== */
const sections = document.querySelectorAll('section[id]');
function scrollActive(){
  const scrollY = window.pageYOffset;
  sections.forEach(currentSection => {
    const sectionHeight = currentSection.offsetHeight;
    const sectionTop = currentSection.offsetTop - 50;
    sectionId = currentSection.getAttribute('id');
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    }else{
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/* ======================== Change Background Header ======================= */
function scrollHeader(){
  const nav = document.getElementById('header');
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80){
    nav.classList.add('scroll-header');
  }else{
    nav.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);

/* ============================  Show scroll up ======================== */
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the tag with the scroll-up id
  if(this.scrollY >= 560){
    scrollUp.classList.add('show-scroll');
  }else{
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);

/* ============================ Dark light theme ============================ */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if user previously choose a topic
if(selectedTheme){
  // if the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / Deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // we save the current theme and icon that the user choose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/* ================ Send email using SMTP JS ==================================*/
function formSubmit(){
  const contactForm = document.querySelector('form.contact__form');
  let formData = Object.values(contactForm).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {});
  Object.keys(formData).map(function(key) {
    formData[key] = removeTags(formData[key]);
  });
  if(formData['name'] === '' && formData['email'] === '' && formData['subject'] === '' && formData['message'] === ''){
    alert('Contact form should not be empty.');
  }else{
    if(validateEmail(formData.email)){
      formData.message = `${formData.message} %0d%0a%0d%0a Thanks and Regard %0d%0a Name: ${formData.name} %0d%0a Email: ${formData.email}%0d%0a`;
      window.open(`mailto:giriaakash00@gmail.com?subject=${formData['subject']}&body=${formData.message}`);
    }
  }
}

let tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
let tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');

function removeTags(html) {
  let oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}

function validateEmail(email){
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(mailformat)){
    alert("You have entered an invalid email address!");
    return false
  }else{
    return true;
  }
}
