document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');
        
        // 画面の向きを考慮したデバイス判定
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// スマホ判定（縦横問わず）
var isMobile = screenWidth <= 499 || (screenWidth >= 500 && screenWidth <= 899 && screenHeight <= 499);

// タブレット縦向き判定
var isTabletPortrait = screenWidth >= 500 && screenWidth <= 899 && screenHeight > 499;

// タブレット横向きおよびそれ以外（デスクトップ、ラップトップ）の判定
var isTabletLandscapeOrLarger = screenWidth >= 900;

// スマホの場合（縦横問わず）
if (isMobile) {
    content.style.display = 'none';
    mobileWarning.style.display = 'block';
    tabletLandscapeRecommendation.style.display = 'none';
} 
// タブレットで縦向きの場合
else if (isTabletPortrait) {
    content.style.display = 'none';
    mobileWarning.style.display = 'none';
    tabletLandscapeRecommendation.style.display = 'block';
} 
// それ以外（タブレットの横向き・デスクトップ・ラップトップ）
else if (isTabletLandscapeOrLarger) {
    content.style.display = 'block';
    mobileWarning.style.display = 'none';
    tabletLandscapeRecommendation.style.display = 'none';
}

    }

    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
});

window.onload = function() {
    // 3つ目の.container要素を選択
    var thirdContainer = document.querySelectorAll('.container')[2]; // 0から数えるため、3つ目はインデックス2
    if (thirdContainer) {
        // .containerの下端の位置を取得
        var thirdContainerBottom = thirdContainer.offsetTop + thirdContainer.offsetHeight;
        // color-picker-containerの位置を設定
        var colorPickerContainer = document.querySelector('.color-picker-container');
        if (colorPickerContainer) {
            colorPickerContainer.style.top = thirdContainerBottom + 'px';
        }
    }
};

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
  