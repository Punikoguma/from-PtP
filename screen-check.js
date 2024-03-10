document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
      var content = document.querySelector('.content');
      var mobileWarning = document.querySelector('.mobile-warning');
      if (window.innerWidth <= 10000 || (window.innerHeight <= 10000 && window.matchMedia("(orientation: landscape)").matches)) {
        content.style.display = 'none';
        mobileWarning.style.display = 'block'; // .contentが非表示の時、.mobile-warningを表示
      } else {
        content.style.display = 'block';
        mobileWarning.style.display = 'none'; // それ以外の場合、.mobile-warningを非表示
      }
    }
  
    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
  });
  