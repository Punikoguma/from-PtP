document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');
        
        // タブレットとスマホの判定
        var isTablet = window.innerWidth > 300 && window.innerHeight > 400;//タブレットの大きさ
        var isMobile = window.innerWidth <= 300 || window.innerHeight <= 400;

        // スマホの場合
        if (isMobile) {
            content.style.display = 'none';
            mobileWarning.style.display = 'block';
            tabletLandscapeRecommendation.style.display = 'none';
        } 
        // タブレットで縦向きの場合
        else if (isTablet && window.matchMedia("(orientation: portrait)").matches) {
            content.style.display = 'none';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'block';
        } else {
            content.style.display = 'block';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'none';
        }
    }

    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
});

// 画面の向きが変わったらリロードする（誤作動防止のため）
let isPortrait = (window.innerHeight > window.innerWidth);

window.addEventListener('resize', function() {
    let wasPortrait = isPortrait;
    isPortrait = (window.innerHeight > window.innerWidth);

    if (isPortrait !== wasPortrait) {
        window.location.reload();
    }
});

window.onresize = function() {
    location.reload();
  }
  