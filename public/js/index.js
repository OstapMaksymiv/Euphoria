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
const signup = document.querySelector('.signup')
const addingPost_form = document.querySelector('.addingPost_form');
let img_inp = document.querySelector('.img_inp');
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
const discover_AllBtn = document.querySelectorAll('.discover');
const searchBar = document.querySelector('.searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
for(let i = 0; i < discover_AllBtn.length; i++){

  discover_AllBtn[i].addEventListener('click', function(){
        searchBar.classList.toggle('open')
        searchInput.focus()
    })
    searchClose.addEventListener('click', function(){
        searchBar.classList.remove('open')
    })
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
bgActive.addEventListener('click', () => {
    body.classList.remove('hiddenClass');
    section_hero.classList.remove('blurClass')
    container.classList.remove('blurClass')

    bgActive.classList.remove('blockClass')
    rope_cloud.classList.remove('animate__bounceInDown')
    rope_cloud.classList.add('animate__bounceOutUp')
  })
if(window.location.pathname === '/search' || window.location.pathname === '/dashboard'){
  main.style.display = 'block'
}
else if(window.location.pathname === '/admin'){
  signup.style.display = 'none'
}
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
function adjustSwiperWidth() {
  const windowWidth = window.innerWidth;
  const container = document.querySelector('.container')
  const containerWidth = container.clientWidth - 82;
  console.log('asd');
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