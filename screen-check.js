document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');
        
        // タブレットとスマホの判定
        // 新しい基準に基づくデバイス判定
var isMobilePortrait = window.innerWidth <= 499 || window.innerHeight <= 499;
var isMobileLandscapeOrTabletPortrait = (window.innerWidth >= 500 && window.innerWidth <= 899) || (window.innerHeight >= 500 && window.innerHeight <= 899);
var isTabletLandscape = (window.innerWidth >= 900 && window.innerWidth <= 1280) || (window.innerHeight >= 900 && window.innerHeight <= 1280);

// スマホの場合（縦横問わず）
if (isMobilePortrait || (isMobileLandscapeOrTabletPortrait && window.matchMedia("(orientation: landscape)").matches)) {
    content.style.display = 'none';
    mobileWarning.style.display = 'block';
    tabletLandscapeRecommendation.style.display = 'none';
} 
// タブレットで縦向きの場合
else if (isMobileLandscapeOrTabletPortrait && window.matchMedia("(orientation: portrait)").matches) {
    content.style.display = 'none';
    mobileWarning.style.display = 'none';
    tabletLandscapeRecommendation.style.display = 'block';
} 
// それ以外（タブレット横向きやPCなど）
else {
    content.style.display = 'block';
    mobileWarning.style.display = 'none';
    tabletLandscapeRecommendation.style.display = 'none';
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
  