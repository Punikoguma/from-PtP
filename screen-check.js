// Document ready
document.addEventListener("DOMContentLoaded", function() {
    checkScreenAndToggleContent();
    adjustFontSize();
});

// Window resize events
window.addEventListener('resize', function() {
    checkScreenAndToggleContent();
    adjustFontSize();
    adjustColorPickerPosition();
    checkOrientationAndReload();
    // 既存の window.onresize は削除して、重複するリロードを防止
});

// Check screen size and toggle content visibility
function checkScreenAndToggleContent() {
    const content = document.querySelector('.content');
    const mobileWarning = document.querySelector('.mobile-warning');
    const tabletLandscapeRecommendation = document.querySelector('.tablet-landscape-recommendation');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const isMobile = screenWidth <= 499 || (screenWidth >= 500 && screenWidth <= 899 && screenHeight <= 499);
    const isTabletPortrait = screenWidth >= 500 && screenWidth <= 1199 && screenHeight > 499;
    const isTabletLandscapeOrLarger = screenWidth >= 900;

    if (isMobile) {
        content.style.display = 'none';
        mobileWarning.style.display = 'block';
        tabletLandscapeRecommendation.style.display = 'none';
    } else if (isTabletPortrait) {
        content.style.display = 'none';
        mobileWarning.style.display = 'none';
        tabletLandscapeRecommendation.style.display = 'block';
    } else if (isTabletLandscapeOrLarger) {
        content.style.display = 'block';
        mobileWarning.style.display = 'none';
        tabletLandscapeRecommendation.style.display = 'none';
    }
}

// Dynamically adjust font size to fit container
function adjustFontSize() {
    const container = document.querySelector('#text-container');
    const text = document.querySelector('.vertical-text');
    let fontSize = 1;
    text.style.fontSize = fontSize + 'px';

    while (text.offsetWidth <= container.offsetHeight && text.offsetHeight <= container.offsetWidth) {
        fontSize++;
        text.style.fontSize = `${fontSize}px`;
    }
    text.style.fontSize = `${fontSize - 1}px`;
}

// Adjust color picker position based on sliders
function adjustColorPickerPosition() {
    const slidersContainer = document.querySelector('.sliders-container');
    const colorPickerContainer = document.querySelector('.color-picker-container');
    const slidersRect = slidersContainer.getBoundingClientRect();
    const marginValueVw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--margin'));
    const marginInPixels = marginValueVw * window.innerWidth / 100;
    colorPickerContainer.style.top = `${slidersRect.bottom - marginInPixels / 2}px`;
}

// Reload page on orientation change
let isPortrait = window.innerHeight > window.innerWidth;

function checkOrientationAndReload() {
    const wasPortrait = isPortrait;
    isPortrait = window.innerHeight > window.innerWidth;

    if (isPortrait !== wasPortrait) {
        window.location.reload();
    }
}