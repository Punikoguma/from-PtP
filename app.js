window.globals = {};

window.onload = function() {
    console.log('on load');
}

// ------------- Vue
const worldApp = Vue.createApp({
    data(){
        return {
            config: {
                size: 450, 
                step: 9,
                diameter: 10,
                ratio: 50,
                bgC: '#000000', // 初期背景色（黒）
                CircleC: '#ffffff', // 初期円の色（白）
                windowBgC: '#ffffff' // 初期ウィンドウ背景色（白）
            },
            firstUpdate: true // 初回更新かどうかを示すフラグ
        };
    },
    methods: {
        updateWorld() {
            // circle.jsのconfigを更新
            Object.assign(window.config, this.config);
            resetDestination(); // 目的地をリセットして変更を適用
            document.body.style.backgroundColor = this.config.windowBgC;
            if (this.firstUpdate) {
                this.adjustColorPickerPosition(); // 初回のみcolor-picker-containerの位置を調整
                this.firstUpdate = false; // 初回フラグをfalseに設定
            }
        },
    },
    adjustColorPickerPosition() {
        const panelLeft = document.querySelector('.panel-left');
        const colorPickerContainer = document.querySelector('.color-picker-container');
        if (panelLeft && colorPickerContainer) {
            const panelLeftTop = panelLeft.offsetTop;
            const panelLeftLeft = panelLeft.offsetLeft;
            colorPickerContainer.style.position = 'absolute';
            colorPickerContainer.style.top = `${panelLeftTop}px`;
            colorPickerContainer.style.left = `${panelLeftLeft}px`;
        }
    },
    watch: {
        // configの変更を監視して、自動的にupdateWorldを呼び出す
        'config.size': function() { this.updateWorld(); },
        'config.step': function() { this.updateWorld(); },
        'config.diameter': function() { this.updateWorld(); },
        'config.ratio': function() { this.updateWorld(); }
    }
}).mount("#world");