document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
      var content = document.querySelector('.content');
      var mobileWarning = document.querySelector('.mobile-warning');
      
      // タブレットとスマホの判定（幅が600px以下かつ高さが800px以下の場合をスマホとみなし、それ以外をタブレットとする）
      var isTablet = window.innerWidth > 600 && window.innerHeight > 800;
      var isMobile = window.innerWidth <= 600 || window.innerHeight <= 800;
      
      // タブレットで縦向き、またはスマホの場合
      if ((isTablet && window.matchMedia("(orientation: portrait)").matches) || isMobile) {
        content.style.display = 'none';
        mobileWarning.style.display = 'block';
      } else {
        content.style.display = 'block';
        mobileWarning.style.display = 'none';
      }
    }
    
    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
  });
  
  // 画面の向きが変わった場合の処理はそのまま利用可能
  let isPortrait = (window.innerHeight > window.innerWidth);
  
  window.addEventListener('resize', function() {
    let wasPortrait = isPortrait;
    isPortrait = (window.innerHeight > window.innerWidth);
  
    if (isPortrait !== wasPortrait) {
      window.location.reload();
    }
  });
  