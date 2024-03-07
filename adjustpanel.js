function adjustPanelLeftWidth() {
    // ウインドウ幅とcanvas-containerの位置を取得
    const windowWidth = window.innerWidth;
    const canvasContainer = document.getElementById('canvas-container');
    const canvasContainerRect = canvasContainer.getBoundingClientRect();
  
    // .panel-leftのleftと幅を計算して設定
    const panelLeft = document.querySelector('.panel-left');
    const margin = windowWidth * 0.02; // ウインドウ幅の2%
    const leftPosition = margin; // 左側の余白として設定
    const width = canvasContainerRect.left - leftPosition - margin; // canvas-containerの左端までの幅から左右の余白を引く
  
    // スタイルを適用
    panelLeft.style.left = `${leftPosition}px`;
    panelLeft.style.width = `${width}px`;
  }
  
  // DOMが読み込まれた後に関数を実行
  document.addEventListener('DOMContentLoaded', adjustPanelLeftWidth);
  // ウインドウのサイズが変更された時にも適切に調整
  window.addEventListener('resize', adjustPanelLeftWidth);
  