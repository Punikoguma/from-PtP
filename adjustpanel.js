function adjustPanelLeftWidth() {
    // ウィンドウ幅の2%を余白として計算
    const windowMargin = window.innerWidth * 0.02;
    // canvas-containerの幅を計算
    const canvasWidth = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9); // これは前提としています
    // canvas-containerの右側余白を含めた全体の余白を計算
    const totalMargin = windowMargin * 2; // 左側とcanvas-containerとの間の余白を含む
    // panel-leftの新しい幅を計算（ウィンドウ幅からcanvas-containerの幅と全体の余白を引いたもの）
    const panelLeftWidth = window.innerWidth - canvasWidth - totalMargin;

    // panel-leftの幅を設定
    const panelLeft = document.querySelector('.panel-left');
    panelLeft.style.width = `${panelLeftWidth}px`;
    // panel-leftの左側の余白をウィンドウ幅の2%に設定
    panelLeft.style.left = `${windowMargin}px`;
}

// ページ読み込み時とウィンドウサイズ変更時に関数を実行
window.addEventListener('load', adjustPanelLeftWidth);
window.addEventListener('resize', adjustPanelLeftWidth);
