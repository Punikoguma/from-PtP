function updatePanelLayout() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const margin = windowWidth * 0.02;

    if (window.matchMedia("(orientation: portrait)").matches) {
        // 縦画面の設定
        const canvasTopEdge = canvasContainer.getBoundingClientRect().top;
        const canvasHeight = canvasContainer.offsetHeight;

        // 高さ: 画面上部からcanvas-containerの上辺まで
        // 幅: ウインドウ幅 - 左右の余白
        panelLeft.style.height = `${canvasTopEdge + canvasHeight}px`; // canvas-containerの上辺までの高さ
        panelLeft.style.width = `calc(100% - ${2 * margin}px)`; // 左右に余白
    } else {
        // 横画面の設定（既存のupdatePanelWidth関数を使用）
        updatePanelWidth();
    }

    // 共通の余白設定
    panelLeft.style.padding = `${margin}px`; // 上下左右にウインドウ幅の2%の余白
}

function updatePanelWidth() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');

    // canvas-containerの左端の位置を計算
    const canvasLeftEdge = canvasContainer.getBoundingClientRect().left;

    // ウィンドウ幅の2%を計算
    const windowWidth = window.innerWidth;
    const margin = windowWidth * 0.02;

    // panel-leftの幅を設定（左側にウィンドウ幅の2%の余白を追加）
    // 右側の余白も考慮して、2倍のmarginを引く
    panelLeft.style.width = `${canvasLeftEdge - panelLeft.offsetLeft - 2 * margin}px`;

    // panel-leftのleftプロパティを更新して、左側の余白を確保
    panelLeft.style.left = `${margin}px`;
}

// ウィンドウのリサイズ時とページの初期読み込み時に関数を実行
window.addEventListener('resize', updatePanelWidth);
document.addEventListener('DOMContentLoaded', updatePanelWidth);
