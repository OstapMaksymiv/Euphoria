// import axios from "axios";
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

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active-discover");
    } else {
      button.classList.remove("active-discover");
    }
  });
  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}
//Search button click
if(search){
  search.addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });
}
//Initially display all products
window.onload = () => {
  filterProduct("all");
};

if(registerBtn || loginBtn){
  registerBtn.addEventListener('click', () => {
    registration_container.classList.add("active");
  });
  
  loginBtn.addEventListener('click', () => {
    registration_container.classList.remove("active");
  });
}

// addingPost_form.addEventListener('submit',async (e)=>{
//   e.preventDefault()
//   const formaData = new formaData()
//   formaData.append("image", img_inp.files[0])
//   const result = await axios.post(
//     "http://localhost:3000/add-post",
//     formData,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//     }
//   );
// })
// const discover_AllBtn = document.querySelectorAll('.discover');
// const searchBar = document.querySelector('.searchBar');
// const searchInput = document.getElementById('searchInput');
// const searchClose = document.getElementById('searchClose');
// for(let i = 0; i < discover_AllBtn.length; i++){

//   discover_AllBtn[i].addEventListener('click', function(){
//         searchBar.classList.toggle('open')
//         searchInput.focus()
//     })
//     searchClose.addEventListener('click', function(){
//         searchBar.classList.remove('open')
//     })
// }






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
      header__nav.classList.remove('blurClass')
      main_content.classList.remove('blurClass')
      swipeR.classList.remove('blurClass')
  
      cloud.classList.remove('stopMobileNav')
      fa_shake.style.animationName='fa-shake'
      bgActive.classList.remove('blockClass')
      temporary_class.classList.remove('down')
      rope_cloud.classList.remove('animate__bounceInDown')
      rope_cloud.classList.add('animate__bounceOutUp')
    })
}
if(window.location.pathname === '/search' || window.location.pathname === '/dashboard'){
  main.style.display = 'block'
}
// else if(window.location.pathname === '/login'){}
else if(window.location.pathname === '/admin'){
  signup.forEach(btn => {
    btn.style.display = 'none'
    
  });
}
if(cloud){
  cloud.addEventListener('click', () => {
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    section_hero.classList.toggle('blurClass')
    container.classList.toggle('blurClass')
    bgActive.classList.toggle('blockClass')
    block.classList.add('flexClass')
    rope_cloud.style.display = 'block';
    rope_cloud.classList.toggle('animate__bounceInDown')
    rope_cloud.classList.toggle('animate__bounceOutUp')
  })
}
if(login || signup){
  login.addEventListener('click', () => {
  
    window.scrollTo(0, 0);
    body.classList.toggle('hiddenClass');
    section_hero.classList.toggle('blurClass')
  
    header__nav.classList.add('blurClass')
    main_content.classList.add('blurClass')
    swipeR.classList.add('blurClass')
  
    bgActive.classList.toggle('blockClass')
    registration_container.classList.remove('active')
    temporary_class.classList.add('down')
    cloud.classList.add('stopMobileNav')
  
    fa_shake.style.animationName='none'
  })
  signup.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo(0, 0);
      body.classList.toggle('hiddenClass');
      section_hero.classList.toggle('blurClass')
  
      header__nav.classList.add('blurClass')
      main_content.classList.add('blurClass')
      swipeR.classList.add('blurClass')
      bgActive.classList.toggle('blockClass')
      registration_container.classList.add('active')
      temporary_class.classList.add('down')
      cloud.classList.add('stopMobileNav')
      fa_shake.style.animationName='none'
    })
  })
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



