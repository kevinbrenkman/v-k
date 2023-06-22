document.addEventListener('DOMContentLoaded', function() {
  const images = Array.from(document.querySelectorAll('img'));

  images.forEach(function(image) {
    if (image.complete) {
      addComboClass(image);
    } else {
      image.addEventListener('load', function() {
        addComboClass(image);
      });
    }
  });

  function addComboClass(image) {
    if (image.naturalHeight > image.naturalWidth) {
      image.classList.add('portrait');
      image.classList.remove('landscape');
    } else {
      image.classList.add('landscape');
      image.classList.remove('portrait');
    }
  }
});
