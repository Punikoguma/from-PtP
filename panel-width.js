function updatePanelWidth() {//panel-leftの幅を決める関数（canvas-containerの幅に対して動的に変化する）
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
    panelLeft.style.top = `${margin}px`;
}

// ウィンドウのリサイズ時とページの初期読み込み時に関数を実行
window.addEventListener('resize', updatePanelWidth);
document.addEventListener('DOMContentLoaded', updatePanelWidth);
