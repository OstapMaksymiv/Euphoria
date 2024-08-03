
const swipeR = document.querySelector('.swiper');
const swiper_button_next = document.querySelector('.swiper-button-next')
const cloud = document.querySelector('.cloud');
const rope_cloud = document.querySelector('.rope_cloud');
const section_hero = document.querySelector('.section_hero');
const container = document.querySelector('.container');
const body = document.querySelector('body');
const block = document.querySelector('.block');
const hiddenClass = document.querySelector('.hiddenClass');
const bgActive = document.querySelector('.bg');
const main = document.querySelector('main')
const signup = document.querySelectorAll('.signup')
const login = document.querySelector('.login')
const addingPost_form = document.querySelector('.addingPost_form');
let img_inp = document.querySelector('.img_inp');
const registration_container = document.querySelector('.registration_container');
const temporary_class = document.querySelector('.temporary_class');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const fa_shake = document.querySelector('.fa-shake');
const header__nav = document.querySelector('.header__nav')
const main_content = document.querySelector('.main-content')
const search = document.getElementById("search");
const button = document.querySelector('.button')
const arrow_signup = document.querySelector('.arrow_signup');
const arrow_signin = document.querySelector('.arrow_signin');
const block_registration = document.querySelector('.block-registration')
const logout_button = document.querySelector('.logout-button')
const wrapper = document.querySelector('.wrapper')
const swiperSlide = document.querySelectorAll('.swiper-slide');
const activity_search_btn = document = document.getElementById('activity_search_btn')
const activities_page = document.querySelector('.activities_page')
const activity_search = document.getElementById('activity_search')
const article = document.querySelector('.article')
const activity_wrapper = document.querySelector('.activity_wrapper')
const from = document.getElementById('from')
const to = document.getElementById('to');
const submit_btn = document.querySelector('.submit_btn')
const comment_btn = document.querySelector('.comment_btn')
const crt_impr_btn = document.querySelector('.crt-impr_btn')
$(document).ready(function(){
  $('.mountain-swiper').slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed:1000,
    pauseOnFocus:true,
    pauseOnHover:true
  });
});
$(document).ready(function(){
  $('.activity-swiper').slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,
    pauseOnFocus:true,
    pauseOnHover:true
  });
});
if(from){
  from.addEventListener('input', function() {
    if (this.value > 500) {
        this.value = 500;
    }
  });
  
  to.addEventListener('input', function() {
    if (this.value > 500) {
        this.value = 500;
    }
  });
}

let windowWidth;
function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return null;
}
document.addEventListener("DOMContentLoaded", function() {
  const cookieValue = getCookieValue('token');
  if (cookieValue) {
    block_registration.innerHTML = '';
    const a = document.createElement('a');
    a.className = 'signup';
    a.setAttribute('href','/logout')
    a.innerHTML = 'Log out'
    block_registration.appendChild(a);
    if(window.innerWidth <= 530){

      logout_button.classList.add('blockClass')
      button.classList.add('hide')
      block_registration.classList.add('hide')
    }
    else if(window.innerWidth > 530){
      logout_button.classList.remove('blockClass')
      logout_button.classList.add('hide')
      block_registration.classList.remove('hide')
    }
  }
  else{ 
    logout_button.classList.remove('blockClass')
    button.classList.remove('hide')
  }
});
window.addEventListener("resize", function() {
  const cookieValue = getCookieValue('token');
  if (cookieValue) {
    if(window.innerWidth <= 530){
      logout_button.classList.remove('hide')
      logout_button.classList.add('blockClass')
      button.classList.add('hide')
      block_registration.classList.add('hide')
    }
    else if(window.innerWidth > 530){
      logout_button.classList.remove('blockClass')
      logout_button.classList.add('hide')
      block_registration.classList.remove('hide')
    }
  }
})
function filterActivities(value) {
  const type_btns = document.querySelectorAll('input[name="type"]');
  let activities = document.querySelectorAll(".activity");
  let act = document.querySelectorAll(".act");
  type_btns.forEach(elem => {
    if(elem.id === value){
      activities.forEach(activity => {
        activity.classList.remove("hide");  
      });
      act.forEach(acts => {
        acts.classList.remove("hide");  
      });

    }
  })
}
function filterProduct(value) {

  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {

    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active-discover");
    } else {
      button.classList.remove("active-discover");
    }
  });

  let elements = document.querySelectorAll(".card");

  elements.forEach((element) => {

    if (value == "all") {
      element.classList.remove("hide");
    } else {

      if (element.classList.contains(value)) {

        element.classList.remove("hide");
      } else {

        element.classList.add("hide");
      }
    }
  });
}

if(search){
  search.addEventListener("click", () => {

    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");

    elements.forEach((element, index) => {

      if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {

        cards[index].classList.remove("hide");
      } else {

        cards[index].classList.add("hide");
      }
    });
  });
}
if(activity_search_btn){
  activity_search_btn.addEventListener('click', () => {
    let activity_search_input = document.getElementById("activity_search-input").value.trim(); 
    const type_btns = document.querySelectorAll('input[name="type"]');
    let activities = document.querySelectorAll(".activity");
    let acts = document.querySelectorAll(".act");

    let fromValue = parseFloat(from.value) || 0;
    let toValue = parseFloat(to.value) || Infinity;

    type_btns.forEach(elem => {
      if (elem.checked) {
        activities.forEach((act, index) => {
          let activityTypeMatch = elem.id === 'all' || act.classList.contains(elem.id);
          let price = parseFloat(act.id);
          let priceMatch = !isNaN(price) && price >= fromValue && price <= toValue;


          let nameMatch = true; 
          if (activity_search_input) {
            let activity_titles = document.querySelectorAll('.activity-title');
            nameMatch = activity_titles[index].innerText.toUpperCase().includes(activity_search_input.toUpperCase());
          }

          if (activityTypeMatch && priceMatch && nameMatch) {
            act.classList.remove("hide");
          } else {
            act.classList.add("hide");
          }
        });

        acts.forEach((act, index) => {
          let activityTypeMatch = elem.id === 'all' || act.classList.contains(elem.id);
          let price = parseFloat(act.id);
          let priceMatch = !isNaN(price) && price >= fromValue && price <= toValue;

          let nameMatch = true; 
          if (activity_search_input) {
            let activity_titles = document.querySelectorAll('.activity-title');
            nameMatch = activity_titles[index].innerText.toUpperCase().includes(activity_search_input.toUpperCase());
          }

          if (activityTypeMatch && priceMatch && nameMatch) {
            act.classList.remove("hide");
          } else {
            act.classList.add("hide");
          }
        });
      }
    });
  });
}

window.onload = () => {
  filterActivities("all")
  filterProduct("all")
};

if(registerBtn || loginBtn || arrow_signin || arrow_signup){
  registerBtn.addEventListener('click', () => {
    registration_container.classList.add("active");
  });
  arrow_signup.addEventListener('click', () => {
    registration_container.classList.add("active");
  });
  arrow_signin.addEventListener('click', () => {
    registration_container.classList.remove("active");
  });
  loginBtn.addEventListener('click', () => {
    registration_container.classList.remove("active");
  });
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 'auto',
  spaceBetween: 15,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
if(bgActive){
  bgActive.addEventListener('click', () => {
    
      body.classList.remove('hiddenClass');
      section_hero.classList.remove('blurClass')
      container.classList.remove('blurClass')
      if(article){
        article.classList.remove('blurClass')
      }
      header__nav.classList.remove('blurClass')
      if(main_content && swipeR){
        main_content.classList.remove('blurClass')
        swipeR.classList.remove('blurClass')
      }
      if(wrapper){
        wrapper.classList.remove('blurClass')
      }
      if(activities_page){
        activities_page.classList.remove('blurClass')
      }
      if(activity_wrapper){
        activity_wrapper.classList.remove('blurClass')
      }
      if(comment_btn){
        comment_btn.classList.remove('blurClass')
        crt_impr_btn.classList.remove('down')
        document.querySelector('.activity-swiper').classList.remove('blurClass')
        document.querySelector('.mountain-swiper').classList.remove('blurClass')
        document.querySelector('.journal_title').classList.remove('blurClass')
      }
      cloud.classList.remove('stopMobileNav')
      fa_shake.style.animationName='fa-shake'
      bgActive.classList.remove('blockClass')
      temporary_class.classList.remove('down')
      rope_cloud.classList.remove('animate__bounceInDown')
      rope_cloud.classList.add('animate__bounceOutUp')
    })
}

if(window.location.pathname === '/search' ){
  main.style.display = 'block'
}

else if(window.location.pathname === '/admin'){
  signup.forEach(btn => {
    btn.style.display = 'none'
    
  });
}
else if(window.location.pathname ==='/discover'){
  main.style.display='flex'
  main.style.flexDirection='column'
  main.style.alignItems='center'
}
else if(window.location.pathname === '/dashboard/activitys'){
  let activities = document.querySelectorAll(".activity");
  activities.forEach(element => {
    element.style.width = 'auto'
  });
}
else if(window.location.pathname === '/dashboard/posts'){
  let admin_posts = document.querySelector('.admin-posts')
  admin_posts.style.marginTop ='30px'
}

else if(window.location.pathname === '/add-activity' || window.location.pathname === '/add-post' || window.location.pathname === '/add-impression' || window.location.pathname === '/dashboard' ){
  // document.querySelector('.fa-3x').style.display='none'
  main.style.display = 'flex'
  main.style.flexDirection = 'column'
  main.style.alignItems = 'center'
}
else if(window.location.pathname === '/journal'){
  main.style.display = 'flex'
  main.style.flexDirection = 'column'
  main.style.alignItems = 'center'
}
else if(window.location.pathname === '/login'){
   const alert = document.querySelector('.alert');
   alert.innerHTML === 'Successful authorization' ? alert.style.backgroundColor ='rgb(44, 155, 50)' : alert.style.backgroundColor ='rgb(180, 45, 45)'
   alert.style.display = 'block'
   setTimeout(() => {
    alert.style.opacity = '1'

   }, 500);
   setTimeout(() => {
    alert.style.opacity = '0'
   }, 1500);
   setTimeout(() => {
    alert.style.display = 'none'

   }, 2500);
  }
else if(window.location.pathname === '/register'){
   const alert = document.querySelector('.alert');
   alert.innerHTML === 'User Created' ? alert.style.backgroundColor ='rgb(44, 155, 50)' : alert.style.backgroundColor ='rgb(180, 45, 45)'
    alert.style.display = 'block'
   setTimeout(() => {
    alert.style.opacity = '1'

   }, 500);
   setTimeout(() => {
    alert.style.opacity = '0'

   }, 1500);
   setTimeout(() => {
    alert.style.display = 'none'

   }, 2500);
}
  cloud.addEventListener('click', () => {
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    section_hero.classList.toggle('blurClass')
    container.classList.toggle('blurClass')
    bgActive.classList.toggle('blockClass')
    if(article){
      article.classList.toggle('blurClass')
    }
    if(wrapper){
      wrapper.classList.toggle('blurClass')
    }
    if(activities_page){
      activities_page.classList.toggle('blurClass')
    }
    if(activity_wrapper){
      activity_wrapper.classList.toggle('blurClass')
    }
    if(comment_btn){
      comment_btn.classList.toggle('blurClass')
      document.querySelector('.activity-swiper').classList.toggle('blurClass')
      document.querySelector('.mountain-swiper').classList.toggle('blurClass')
      document.querySelector('.journal_title').classList.toggle('blurClass')
    }
    block.classList.add('flexClass')
    rope_cloud.style.display = 'block';
    rope_cloud.classList.toggle('animate__bounceInDown')
    rope_cloud.classList.toggle('animate__bounceOutUp')
  })
if(login){
  login.addEventListener('click', () => {
  
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    section_hero.classList.toggle('blurClass')
    if(article){
      article.classList.add('blurClass')
    }
    header__nav.classList.add('blurClass')
    if(main_content && swipeR){
      main_content.classList.add('blurClass')
      swipeR.classList.add('blurClass')
    }
    if(wrapper){
      wrapper.classList.add('blurClass')
    }
    if(activities_page){
      activities_page.classList.add('blurClass')
    }
    if(activity_wrapper){
      activity_wrapper.classList.toggle('blurClass')
    }
    if(comment_btn){
      comment_btn.classList.toggle('blurClass')
      document.querySelector('.activity-swiper').classList.toggle('blurClass')
      document.querySelector('.mountain-swiper').classList.toggle('blurClass')
      document.querySelector('.journal_title').classList.toggle('blurClass')
    }
    bgActive.classList.toggle('blockClass')
    registration_container.classList.remove('active')
    temporary_class.classList.add('down')
    cloud.classList.add('stopMobileNav')
  
    fa_shake.style.animationName='none'
  })
}if(signup){
signup.forEach(btn => {
  btn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    section_hero.classList.toggle('blurClass')
    if(article){
      article.classList.add('blurClass')
    }
    header__nav.classList.add('blurClass')
    if(main_content && swipeR){
      main_content.classList.add('blurClass')
      swipeR.classList.add('blurClass')
    }
    if(wrapper){
      wrapper.classList.add('blurClass')
    }
    if(activities_page){
      activities_page.classList.add('blurClass')
    }
    if(activity_wrapper){
      activity_wrapper.classList.add('blurClass')
    }
    if(comment_btn){
      comment_btn.classList.add('blurClass')
      document.querySelector('.activity-swiper').classList.add('blurClass')
      document.querySelector('.mountain-swiper').classList.add('blurClass')
      document.querySelector('.journal_title').classList.add('blurClass')
    }
    bgActive.classList.toggle('blockClass')
    registration_container.classList.add('active')
    temporary_class.classList.add('down')
    cloud.classList.add('stopMobileNav')

    fa_shake.style.animationName='none'
  })
})}
if(button){
button.addEventListener('click', () => {
  
  window.scrollTo(0, 0);
  body.classList.toggle('hiddenClass');
  section_hero.classList.toggle('blurClass')
  if(article){
    article.classList.add('blurClass')
  }
  header__nav.classList.add('blurClass')
  if(main_content && swipeR){
    main_content.classList.add('blurClass')
    swipeR.classList.add('blurClass')
  }
  if(wrapper){
    wrapper.classList.add('blurClass')
  }
  if(activities_page){
    activities_page.classList.add('blurClass')
  }
  if(activity_wrapper){
    activity_wrapper.classList.add('blurClass')
  }
  if(comment_btn){
    comment_btn.classList.add('blurClass')
    document.querySelector('.activity-swiper').classList.add('blurClass')
    document.querySelector('.mountain-swiper').classList.add('blurClass')
    document.querySelector('.journal_title').classList.add('blurClass')
  }
  bgActive.classList.toggle('blockClass')
  registration_container.classList.remove('active')
  temporary_class.classList.add('down')
  cloud.classList.add('stopMobileNav')

  fa_shake.style.animationName='none'
})}
if (comment_btn) {
  comment_btn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    header__nav.classList.add('blurClass')
    section_hero.classList.toggle('blurClass');
    document.querySelector('.activity-swiper').classList.toggle('blurClass');
    document.querySelector('.mountain-swiper').classList.toggle('blurClass');
    document.querySelector('.journal_title').classList.toggle('blurClass');
    bgActive.classList.toggle('blockClass');
    if (article) {
      article.classList.toggle('blurClass');
    }
    if (wrapper) {
      wrapper.classList.toggle('blurClass');
    }
    if (activities_page) {
      activities_page.classList.toggle('blurClass');
    }
    if (activity_wrapper) {
      activity_wrapper.classList.toggle('blurClass');
    }
    comment_btn.classList.toggle('blurClass');
    crt_impr_btn.classList.add('down');
    console.log(crt_impr_btn.classList);
    cloud.classList.add('stopMobileNav');
    fa_shake.style.animationName = 'none';
  });
}



if(swipeR){
  function adjustSwiperWidth() {
    const windowWidth = window.innerWidth;
    const container = document.querySelector('.container')
    const containerWidth = container.clientWidth - 82;
  
    const out_container = (windowWidth - containerWidth) / 2
    swipeR.style.width = `${out_container + containerWidth}px`;
    if(windowWidth >= 4054){
      swiper_button_next.style.display = 'none'
  
    }
    else{
      swiper_button_next.style.display = 'flex'
    }
  
  }
  adjustSwiperWidth();
  window.addEventListener('resize', adjustSwiperWidth);
}

function adjustSliderWidth() {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 957) {
    slidesToShow = 1; 
  } else if (windowWidth <= 1300) {
    slidesToShow = 2; 
  } else {
    slidesToShow = 3;
  }


  if ($('.mountain-swiper').hasClass('slick-initialized')) {
    $('.mountain-swiper').slick('slickSetOption', 'slidesToShow', slidesToShow, true);
    $('.activity-swiper').slick('slickSetOption', 'slidesToShow', slidesToShow, true);
  } else {
    $('.mountain-swiper, .activity-swiper').slick({
      slidesToShow: slidesToShow,
      infinite: true,
      autoplay: true,
      slidesToScroll: 1,
      speed: 1500
    });
  }
}

$(document).ready(function() {
  adjustSliderWidth();
  window.addEventListener('resize', adjustSliderWidth);
});
const sr = ScrollReveal({
  origin: 'top',
  distance: '40px',
  opacity: 1,
  scale: 1.1,
  duration: 2500,
  delay: 300,
});

sr.reveal(`.header__logo`,{scale:1, distance: '70px'} )
sr.reveal(`.activity_title`,{scale:0.9} )
sr.reveal(`.description`,{scale:0.9} )
sr.reveal(`.title`,{scale:1.1} )
sr.reveal(`.journal_title`,{scale:1.1} )



sr.reveal(`.filter_activity`,{scale:1, distance: '100px', delay: 500, origin:'bottom' } )
sr.reveal(`.discover-link`,{scale:1, distance: '70px' } )
sr.reveal(`.activities-link`,{scale:1, distance: '80px', delay: 400 } )
sr.reveal(`.journal-link`,{scale:1, distance: '90px', delay: 500 } )
sr.reveal(`.header__nav .block-registration`,{scale:1, distance: '100px', delay: 600 } )
sr.reveal(`.main-content .block-registration`,{scale:0.9, distance: '-30px'} )

sr.reveal(`.button`,{scale:1, distance: '100px', delay: 500 } )
sr.reveal(`.logout-button`,{scale:1, distance: '100px', delay: 500 } )

