document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation'); // 追加
        
        // タブレットとスマホの判定
        var isTablet = window.innerWidth > 600 && window.innerHeight > 800;//タブレットの大きさ
        var isMobile = window.innerWidth <= 600 || window.innerHeight <= 800;

        // スマホの場合
        if (isMobile) {
            content.style.display = 'none';
            mobileWarning.style.display = 'block';
            tabletLandscapeRecommendation.style.display = 'none'; // 追加
        } 
        // タブレットで縦向きの場合
        else if (isTablet && window.matchMedia("(orientation: portrait)").matches) {
            content.style.display = 'none';
            mobileWarning.style.display = 'none'; // 修正
            tabletLandscapeRecommendation.style.display = 'block'; // 追加
        } else {
            content.style.display = 'block';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'none'; // 追加
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
