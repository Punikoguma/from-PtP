function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setViewportHeight);
window.addEventListener('DOMContentLoaded', setViewportHeight);

function updatePanelWidth() {
    const canvasContainer = document.getElementById('canvas-container');
    const panelLeft = document.querySelector('.panel-left');
    const canvasLeftEdge = canvasContainer.getBoundingClientRect().left;
    panelLeft.style.width = `${canvasLeftEdge}px`;
    panelLeft.style.left = `0px`;
}

// MutationObserverを使用してcanvas-containerの変更を監視する
function observeCanvasContainerChanges() {
    const canvasContainer = document.getElementById('canvas-container');
    const config = { attributes: true, childList: true, subtree: true }; // 監視する変更の種類

    const callback = function(mutationsList, observer) {
        // 変更が検出されたらupdatePanelWidthを呼び出す
        updatePanelWidth();
    };

    const observer = new MutationObserver(callback);
    observer.observe(canvasContainer, config);
}

// DOMContentLoadedイベントで監視を開始する
document.addEventListener('DOMContentLoaded', () => {
    setViewportHeight();
    updatePanelWidth();
    observeCanvasContainerChanges();
});

// resizeイベントでビューポートの高さを更新し、updatePanelWidthを再度呼び出す
window.addEventListener('resize', () => {
    setViewportHeight();
    updatePanelWidth();
});
