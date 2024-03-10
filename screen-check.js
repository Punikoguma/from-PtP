document.addEventListener("DOMContentLoaded", function() {
    // スクリーン状態を確認し、コンテンツ表示を切り替える関数
    function checkScreenAndToggleContent() {
        var content = document.querySelector('.content');
        var mobileWarning = document.querySelector('.mobile-warning');
        var tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');
        var fullscreenMessage = document.querySelector(".fullscreenMessage"); // フルスクリーンメッセージ用の要素

        // タブレットとスマホの判定
        var isTablet = window.innerWidth > 600 && window.innerHeight > 600; //タブレットの大きさ
        var isMobile = window.innerWidth <= 600 || window.innerHeight <= 800;

        // フルスクリーン状態の確認
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        var isFullscreen = !!fullscreenElement;

        // スマホの場合
        if (isMobile) {
            content.style.display = 'none';
            mobileWarning.style.display = 'block';
            tabletLandscapeRecommendation.style.display = 'none';
            fullscreenMessage.style.display = "none";
        }
        // タブレットで縦向きの場合
        else if (isTablet && window.matchMedia("(orientation: portrait)").matches) {
            content.style.display = 'none';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'block';
            fullscreenMessage.style.display = "none";
        } else {
            content.style.display = 'block';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'none';
            fullscreenMessage.style.display = "none";
        }

        // フルスクリーン状態でない場合、メッセージを表示
        if (!fullscreenElement) {
            content.style.display = 'none';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'none';
            fullscreenMessage.style.display = "block";
        } else {
            content.style.display = 'block';
            mobileWarning.style.display = 'none';
            tabletLandscapeRecommendation.style.display = 'none';
            fullscreenMessage.style.display = "none";
        }
    }

    // フルスクリーン状態の変更イベントにリスナーを設定
    document.addEventListener("fullscreenchange", checkScreenAndToggleContent);
    document.addEventListener("mozfullscreenchange", checkScreenAndToggleContent);
    document.addEventListener("webkitfullscreenchange", checkScreenAndToggleContent);
    document.addEventListener("msfullscreenchange", checkScreenAndToggleContent);

    // ウィンドウリサイズ時にもコンテンツの表示をチェック
    window.addEventListener('resize', checkScreenAndToggleContent);

    // 初期ロード時に状態をチェック
    checkScreenAndToggleContent();
});

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
