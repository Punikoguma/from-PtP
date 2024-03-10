document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
      var content = document.querySelector('.content');
      var mobileWarning = document.querySelector('.mobile-warning');
      var isLandscape = window.matchMedia("(orientation: landscape)").matches;
      var isMobileOrTabletLandscape = isLandscape && (window.innerWidth <= 600 || window.innerHeight <= 600);
  
      if (window.innerWidth <= 600 || isMobileOrTabletLandscape) {
        // スマホが縦向き、またはスマホ/タブレットが横向きの場合
        content.style.display = 'none';
        mobileWarning.style.display = 'block';
      } else {
        // それ以外のデバイス、または向きの場合
        content.style.display = 'block';
        mobileWarning.style.display = 'none';
      }
    }
    
    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
  });
  
  // 画面の向きが変わった場合の再読み込みのロジックはそのままです。
  window.addEventListener('resize', function() {
    let isPortrait = (window.innerHeight > window.innerWidth);
    let wasPortrait = !isPortrait; // 直前の向きを反転させて初期化
  
    // 画面の向きが変わったかどうかを判定
    isPortrait = (window.innerHeight > window.innerWidth);
  
    if (isPortrait !== wasPortrait) {
      window.location.reload();
    }
  });
  