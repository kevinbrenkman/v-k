function applyImageStyles() {
  const images = Array.from(document.querySelectorAll('img'));
  const videos = Array.from(document.querySelectorAll('video'));
  const fadeInDuration = 300; // Duration of the fade-in animation in milliseconds

  const imagesToAnimate = [];
  const videosToAnimate = [];

  images.forEach(function (image) {
    if (!image.complete) {
      image.addEventListener('load', function () {
        addComboClass(image);
        imagesToAnimate.push(image);
        checkAnimationCompletion();
      });
    } else {
      addComboClass(image);
      imagesToAnimate.push(image);
      checkAnimationCompletion();
    }
  });

  videos.forEach(function (video) {
    video.addEventListener('loadedmetadata', function () {
      videosToAnimate.push(video);
      checkAnimationCompletion();
    });
  });

  function checkAnimationCompletion() {
    if (imagesToAnimate.length === images.length && videosToAnimate.length === videos.length) {
      animateImages();
      animateVideos();
    }
  }

  function animateImages() {
    imagesToAnimate.forEach(function (image) {
      fadeInImage(image);
    });
  }

  function animateVideos() {
    videosToAnimate.forEach(function (video) {
      fadeInVideo(video);
    });
  }

  function addComboClass(image) {
    if (image.naturalHeight > image.naturalWidth) {
      image.classList.add('portrait');
      image.classList.remove('landscape');
    } else {
      image.classList.add('landscape');
      image.classList.remove('portrait');
    }
  }

  function fadeInImage(image) {
    image.style.opacity = '0';
    image.style.transition = 'opacity ' + (fadeInDuration / 1000) + 's';
    setTimeout(function () {
      image.style.opacity = '1';
    }, 0);
  }

  function fadeInVideo(video) {
    video.style.opacity = '0';
    video.style.transition = 'opacity ' + (fadeInDuration / 1000) + 's';
    setTimeout(function () {
      video.style.opacity = '1';
    }, 0);
  }

  const gridButton = document.getElementById('grid');
  const closeButton = document.getElementById('close');
  const gridContainer = document.getElementById('grid-container');
  const nonImageElements = document.querySelectorAll('body > :not(img)');
  const originalParents = new Map();
const fullImage = document.querySelectorAll('.full-image');
  const projectVideos = document.querySelectorAll('.project-video');
  const muteButton = document.getElementById('muteBtn');
  let isGridViewActive = false;
  let scrollPosition = { x: 0, y: 0 };
  let fullImageOriginalHeight = fullImage.offsetHeight;

gridButton.addEventListener('click', function () {
  if (isGridViewActive) {
    exitGridView();
    showMuteButton();
    fullImage.style.height = fullImageOriginalHeight + 'px';
    restorePortraitImageWidth();
  } else {
    enterGridView();
    hideMuteButton();
fadeInImage(image);
fadeInVideo(video);
    fullImage.style.height = 'auto';
    applyImageStyles();
  }
});

  function enterGridView() {
  const mediaElements = Array.from(document.querySelectorAll('img, video'));
  const thumbnailVideos = Array.from(document.querySelectorAll('.thumbnail-video'));
  const navigation = document.querySelector('.navigation');
  const mobileNavWrap = document.querySelector('.mobile-nav-wrap');

  scrollPosition.x = window.scrollX;
  scrollPosition.y = window.scrollY;

  gridContainer.classList.add('open');
  gridContainer.innerHTML = '';

  nonImageElements.forEach(function(element) {
    if (
      !element.classList.contains('navigation') &&
      !element.classList.contains('mobile-nav-wrap')
    ) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
  });

  fullImage.style.position = 'relative';

  gsap.to(mediaElements, {
    duration: 0.5,
    opacity: 0,
    onComplete: function() {
      mediaElements.forEach(function(element) {
        if (element.tagName === 'VIDEO') {
          element.removeAttribute('controls');
        }
        originalParents.set(element, element.parentNode);
        if (!element.closest('.w-condition-invisible')) {
          gridContainer.appendChild(element);
        }
      });

      gsap.fromTo(gridContainer.children, { opacity: 0 }, { opacity: 1, duration: 0.5 });

      thumbnailVideos.forEach(function(video) {
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.position = 'relative';
      });

      projectVideos.forEach(function(video) {
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.marginBottom = '0';
        video.style.marginTop = '0';
      });

      window.scrollTo(0, gridContainer.offsetTop);

      navigation.classList.remove('invert');
      mobileNavWrap.classList.remove('invert');

      gridButton.textContent = 'Close grid view';
    }
  });

  isGridViewActive = true;
}


 function exitGridView() {
  const thumbnailVideos = Array.from(document.querySelectorAll('.thumbnail-video'));
  const navigation = document.querySelector('.navigation');
  const mobileNavWrap = document.querySelector('.mobile-nav-wrap');

  const mediaElements = Array.from(document.querySelectorAll('img, video'));

  nonImageElements.forEach(function(element) {
    if (
      !element.classList.contains('navigation') &&
      !element.classList.contains('mobile-nav-wrap')
    ) {
      element.classList.remove('hidden');
    }
  });

  originalParents.forEach(function(parent, element) {
    parent.appendChild(element);
  });

  gridContainer.innerHTML = '';
  gridContainer.classList.remove('open');

  Array.from(document.getElementsByTagName('img')).forEach(function(img) {
    img.setAttribute('data-action', null);
  });

  fullImage.style.position = 'absolute';

  window.scrollTo(scrollPosition.x, scrollPosition.y);

  thumbnailVideos.forEach(function(video) {
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.position = 'absolute';
  });

  // Exclude .full-image and .thumbnail-video from fading out
  const fadeOutElements = mediaElements.filter(
    (element) => !element.classList.contains('full-image') && !element.classList.contains('thumbnail-video')
  );

  gsap.to(fadeOutElements, { opacity: 0, duration: 0.3 });

  gridButton.textContent = 'View as grid';

  isGridViewActive = false;
	handleViewportChange(); // Add this line to call handleViewportChange function
}

  function showMuteButton() {
    muteButton.style.display = 'block';
  }

  function hideMuteButton() {
    muteButton.style.display = 'none';
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const isHidden = element.classList.contains('w-condition-invisible');

    return (
      !isHidden &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
  }

  function handleViewportChange() {
    const navigation = document.querySelector('.navigation');
    const mobileNav = document.querySelector('.mobile-nav');
    const navShouldInvert = document.querySelector('.nav-should-invert');

    if (!isGridViewActive && isInViewport(navShouldInvert)) {
      navigation.classList.add('invert');
      mobileNav.classList.add('invert');
    } else {
      navigation.classList.remove('invert');
      mobileNav.classList.remove('invert');
    }
  }



  function initializeScript() {
    handleViewportChange();
    window.addEventListener('scroll', handleViewportChange);
    window.addEventListener('resize', handleViewportChange);
  }

 function applyPortraitImageWidth() {
  const portraitImages = Array.from(document.querySelectorAll('img'));

  portraitImages.forEach(function (image) {
    adjustImageWidth(image);

    if (!image.complete) {
      image.addEventListener('load', function () {
        adjustImageWidth(image);
      });
    }
  });
}

function adjustImageWidth(image) {
  if (image.naturalHeight > image.naturalWidth) {
    image.style.width = '100%';
  } else {
    image.style.width = '100%';
  }
}


  function restorePortraitImageWidth() {
    const portraitImages = Array.from(document.querySelectorAll('img'));

    portraitImages.forEach(function(image) {
      image.addEventListener('load', function() {
        if (image.naturalHeight > image.naturalWidth) {
          image.style.width = '';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initializeScript);
