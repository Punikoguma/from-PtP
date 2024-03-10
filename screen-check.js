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
var isTabletPortrait = screenWidth >= 500 && screenWidth <= 1199 && screenHeight > 499;

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

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('#text-container');
    const text = document.querySelector('.vertical-text');
    adjustFontSize();

    function adjustFontSize() {
        let fontSize = 1; // 初期フォントサイズを非常に小さく設定
        text.style.fontSize = fontSize + 'px';

        // テキストがコンテナに収まる最大サイズを探索
        // ここではテキストが回転しているため、幅と高さの条件が逆転します
        while (true) {
            text.style.fontSize = `${fontSize + 1}px`; // フォントサイズを1つ増やす
            // コンテナの高さとテキストの幅、コンテナの幅とテキストの高さを比較
            if (text.offsetWidth <= container.offsetHeight && text.offsetHeight <= container.offsetWidth) {
                fontSize++; // テキストがまだコンテナに収まる場合は、フォントサイズを増やす
            } else {
                // コンテナに収まらなくなった場合は、最後に収まったフォントサイズに設定
                text.style.fontSize = `${fontSize}px`;
                break; // ループを終了
            }
        }
    }

    // ウィンドウサイズの変更に対応
    window.addEventListener('resize', adjustFontSize);
});

window.addEventListener('resize', function() {
    const slidersContainer = document.querySelector('.sliders-container');
    const colorPickerContainer = document.querySelector('.color-picker-container');
    const slidersRect = slidersContainer.getBoundingClientRect();

    // CSS変数から直接marginのピクセル値を計算
    const marginValueVw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--margin'));
    const marginInPixels = marginValueVw * window.innerWidth / 100;

    // marginの値を引いた値を設定
    colorPickerContainer.style.top = `${slidersRect.bottom - marginInPixels/2}px`;
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
  