window.onload = () => {

  // scroll이 about bottom에 위치할 경우 project 위로 올라오기
  const header = document.querySelector('#header');
  const sectionAbout = document.querySelector('#about');
  const sectionProject = document.querySelector('#projects');

  const aboutHeading = document.querySelector('.about-inner h1');
  const introduce = document.querySelector('.introduce');
  
  let aboutH;
  let sectionAboutH;
  let scrollY;
  let aboutTop;
  let aboutBottom;
  let aboutBottomScroll;
  let projectTop;
  let projectMove;
  let aboutHeadingTopScroll;
  let weelDeltaY;
  const aboutMoveDistance = 400;

  
  
  function setProperty() {
      windowH = window.innerHeight;
      sectionAboutScrollTop = sectionAbout.offsetHeight - windowH;
      scrollY = window.scrollY;
      aboutH = sectionAbout.getBoundingClientRect().height;
      aboutTop = scrollY + sectionAbout.getBoundingClientRect().top;
      aboutBottom = aboutTop + sectionAbout.offsetHeight;
      aboutBottomScroll = aboutBottom - window.innerHeight;
      projectTop = scrollY + sectionProject.getBoundingClientRect().top;
      projectTopScroll = projectTop - window.innerHeight;
      projectMove = scrollY - projectTopScroll;
      aboutHeadingTopScroll = scrollY + aboutHeading.getBoundingClientRect().top;
      
      const parallaxStartValue = 0;
      const parallaxSpeed = 200;
      const aboutParallaxBody = window.innerHeight;

      parallaxThisTop = scrollY - parallaxSpeed * 100
  }



/* ------------------------------------------------------------------*/
// header
  
  // 스크롤을 내리면 header가 위로 사라짐 
  function headerFadeOut() {
    setProperty();
    window.addEventListener('wheel', (e) => {
        if(scrollY > 0 && e.deltaY > 0) {  // 내려갈때
            header.classList.add('fade');
        } else {  // 올라갈때
            header.classList.remove('fade');
        }
    });
    }

/* ------------------------------------------------------------------*/
// about

  const aboutTitle = document.querySelector('#about h1');
  function aboutTitleShow() {
      aboutTitle.classList.add('active');
  }

  // 스크롤을 내리면 h1의 위치가 위로 서서히 올라감
  function aboutHeadingMoveUp() {
      setProperty();
      aboutHeading.style.transform = `translateY(${-scrollY * 0.15}px)`;
  }

  // about 섹션을 벗어나면 scroll-circle이 사라짐
  function scrollCircleFadeOut() {
      setProperty();
      if(scrollY > sectionAboutScrollTop) {
          sectionAbout.classList.add('active');
      } else {
          sectionAbout.classList.remove('active');
      }
  };

/* ------------------------------------------------------------------*/
// projects

// 웹표준/접근성 팝업창
  const btnModal = document.getElementById("btnmodal")
  const modal = document.getElementById("modal")
  
  btnModal.addEventListener("click", e => {
      modal.style.display = "flex"
  });
  
  const closeBtn = modal.querySelector(".close-area")
  closeBtn.addEventListener("click", e => {
      modal.style.display = "none"
  });
  
  modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modal.style.display = "none"
    }
  });


  const productImg = document.querySelectorAll('.project-img');

  // 태블릿, 모바일 목업이 뷰포트 안에 들어오면 디바이스 안의 스크린샷 이미지의 애니메이션 활성화
  const observerObtion = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
  }
  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          } else {
              entry.target.classList.remove('active');
          }
      });
  };
  const observer = new IntersectionObserver(observerCallback, observerObtion);
  productImg.forEach(item => {
      observer.observe(item);
  });

  //mobile-project 디바이스가 옆에서 가운데로 나타나기
  function project4SlideShow() {
      setProperty();
      
      const project4 = document.querySelector('.project-4');
      const project4Device = document.querySelector('.project-4 .project-img figure')
      const project4Num = document.querySelector('.project-4 .num')
      const slideStartValue = 5000;
      const project4ScrollPercent = scrollY / (scrollY + project4.getBoundingClientRect().top);
      const scrollDistance = Math.max(slideStartValue - slideStartValue, Math.min(slideStartValue, slideStartValue - (slideStartValue * project4ScrollPercent)));
      
      project4Device.style.transform = `translateX(${scrollDistance}px)`
      project4Num.style.transform = `translateX(${scrollDistance * 0.3}px)`
  }
  function project5SlideShow() {
      setProperty();
      
      const project5 = document.querySelector('.project-5');
      const project5Device = document.querySelector('.project-5 .project-img figure')
      const project5Num = document.querySelector('.project-5 .num')
      const slideStartValue = 5000;
      const project5ScrollPercent = scrollY / (scrollY + project5.getBoundingClientRect().top);
      const scrollDistance = Math.max(slideStartValue - slideStartValue, Math.min(slideStartValue, slideStartValue - (slideStartValue * project5ScrollPercent)));
      
      project5Device.style.transform = `translateX(${scrollDistance}px)`
      project5Num.style.transform = `translateX(${scrollDistance * 0.3}px)`
  }



/* ------------------------------------------------------------------*/

  window.addEventListener('scroll', () => {
      setProperty();
      headerFadeOut();
      aboutHeadingMoveUp();
      scrollCircleFadeOut();
    //   projectMoveUp();
      project4SlideShow();
      project5SlideShow();
  });

  window.addEventListener('resize', () => {
      setProperty();
  });


  function init() {
      aboutTitleShow();
      setProperty();
      headerFadeOut();
      aboutHeadingMoveUp();
      scrollCircleFadeOut();
      // projectMoveUp();
      project4SlideShow();
      project5SlideShow();
  };

  init();

}; //window.onload
