document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
      var content = document.querySelector('.content');
      var mobileWarning = document.querySelector('.mobile-warning');
      if (window.innerWidth <= 600 || (window.innerHeight <= 600 && window.matchMedia("(orientation: landscape)").matches)) {
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
  // 画面の向きを判定して保存する変数
let isPortrait = (window.innerHeight > window.innerWidth);

window.addEventListener('resize', function() {
  // 画面の向きが変わったかどうかを判定
  let wasPortrait = isPortrait;
  isPortrait = (window.innerHeight > window.innerWidth);

  // 画面の向きが変わった場合、ページを再読み込み
  if (isPortrait !== wasPortrait) {
    window.location.reload();
  }
});
