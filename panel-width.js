function updatePanelWidth() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');

    // canvas-containerの左端の位置を計算
    const canvasLeftEdge = canvasContainer.getBoundingClientRect().left;

    // panel-leftの幅を設定
    panelLeft.style.width = `${canvasLeftEdge - panelLeft.offsetLeft}px`;
}

// ウィンドウのリサイズ時とページの初期読み込み時に関数を実行
window.addEventListener('resize', updatePanelWidth);
document.addEventListener('DOMContentLoaded', updatePanelWidth);
