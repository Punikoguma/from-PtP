function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function updatePanelWidth() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');
    const canvasLeftEdge = canvasContainer.getBoundingClientRect().left;

    // CSSから--marginの値を取得
    const rootStyle = getComputedStyle(document.documentElement);
    const margin = parseFloat(rootStyle.getPropertyValue('--margin')) * window.innerWidth / 100;

    // panel-leftの幅を設定
    panelLeft.style.width = `${canvasLeftEdge - panelLeft.offsetLeft - margin}px`;

    // panel-leftのleftプロパティを更新して、左側の余白を確保
    panelLeft.style.left = `${margin}px`;
}

function observeCanvasContainerChanges() {
    const canvasContainer = document.getElementById('canvas-container');
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        // 変更が検出されたらupdatePanelWidthを呼び出す
        updatePanelWidth();
    };

    const observer = new MutationObserver(callback);
    observer.observe(canvasContainer, config);
}

document.addEventListener('DOMContentLoaded', () => {
    setViewportHeight();
    updatePanelWidth();
    observeCanvasContainerChanges();
});

window.addEventListener('resize', () => {
    setViewportHeight();
    updatePanelWidth();
});
