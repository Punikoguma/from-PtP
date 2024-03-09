function updatePanelWidth() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');

    const canvasLeftEdge = canvasContainer.getBoundingClientRect().left;

    // panel-leftの幅をcanvas-containerの左端までの距離として設定
    panelLeft.style.width = `${canvasLeftEdge}px`;

    // panel-leftのleftプロパティを更新して、左側の余白がないことを保証
    panelLeft.style.left = `0px`; // 明示的に0pxとする
}
// ウィンドウの高さを取得し、--vhカスタムプロパティに設定する関数
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 初期ロード時とウィンドウサイズ変更時に関数を実行

// ウィンドウのリサイズ時とページの初期読み込み時に関数を実行
window.addEventListener('resize', updatePanelWidth);
document.addEventListener('DOMContentLoaded', updatePanelWidth);

window.addEventListener('load', setViewportHeight);
window.addEventListener('resize', setViewportHeight);

