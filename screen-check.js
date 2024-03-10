document.addEventListener("DOMContentLoaded", function() {
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');
        var fullscreenMessage = document.getElementById(".fullscreenMessage"); // フルスクリーンメッセージ用の要素

        // タブレットとスマホの判定
        var isTablet = window.innerWidth > 600 && window.innerHeight > 600; //タブレットの大きさ
        var isMobile = window.innerWidth <= 600 || window.innerHeight <= 800;

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

        // フルスクリーン状態でない場合、メッセージを表示
        checkFullScreenStatus();
    }

    // フルスクリーン状態の変更を検出する関数
    function checkFullScreenStatus() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        var fullscreenMessage = document.getElementById("fullscreenMessage");

        if (!fullscreenElement) {
            fullscreenMessage.style.display = "block";
        } else {
            fullscreenMessage.style.display = "none";
        }
    }

    // フルスクリーン状態の変更イベントにリスナーを設定
    document.addEventListener("fullscreenchange", checkFullScreenStatus);
    document.addEventListener("mozfullscreenchange", checkFullScreenStatus);
    document.addEventListener("webkitfullscreenchange", checkFullScreenStatus);
    document.addEventListener("msfullscreenchange", checkFullScreenStatus);

    // デバイスの画面の向きが変わったらリロードする（誤作動防止のため）
    let isPortrait = (window.innerHeight > window.innerWidth);
    window.addEventListener('resize', function() {
        let wasPortrait = isPortrait;
        isPortrait = (window.innerHeight > window.innerWidth);

        if (isPortrait !== wasPortrait) {
            window.location.reload();
        }
    });

    // 初期ロード時とウィンドウリサイズ時にコンテンツの表示をチェック
    checkScreenAndToggleContent();
    window.addEventListener('resize', checkScreenAndToggleContent);
});
