class DrumBox {
    constructor() {
        this.initPadMatrix();
        this.renderPadMatrix();
        this.stepPad = 0;
    }
    initPadMatrix() {
        this.padMatrix = [];
        this.padMatrixY = 6;
        this.padMatrixX = 8;
        for(let i = 0; i < this.padMatrixX; i++) {
            let row = [];
            for(let j = 0; j < this.padMatrixY; j++) {
                row.push(0);
            }
            this.padMatrix.push(row);
        }
    }
    renderPadMatrix() {
        var padTag = document.getElementById('padMatrix');
        for(let y = 0; y < this.padMatrixY; y++) {
            var padRowDiv = document.createElement('div');
            padRowDiv.className = "pad-row";
            for(let x = 0; x < this.padMatrixX; x++) {
                padRowDiv.appendChild(this.renderPad(x,y));
            }
            padTag.appendChild(padRowDiv);
        }
    }
    renderPad(x, y) {
        var toggleDiv = document.createElement('div');
        toggleDiv.className = "toggle";
        toggleDiv.id = 'pad_' + x + '_' + y;
        var checkbox = document.createElement('input');
        checkbox.className = "toggle";
        checkbox.type = "checkbox";
        checkbox.setAttribute('pad-x', x);
        checkbox.setAttribute('pad-y', y);
        checkbox.addEventListener('change', this.onClickPadHandler.bind(this));
        var buttonDiv = document.createElement('div');
        buttonDiv.className = "button";
        var indicatorDiv = document.createElement('div');
        indicatorDiv.className = "indicator";
        buttonDiv.appendChild(indicatorDiv);
        toggleDiv.appendChild(checkbox);
        toggleDiv.appendChild(buttonDiv);
        return toggleDiv;
    }
    onClickPadHandler(event) {
        let x = event.target.getAttribute('pad-x')
        let y = event.target.getAttribute('pad-y')
        this.padMatrix[x][y] = event.target.checked;

        console.dir(this.padMatrix);
    }
    lightColumn(column) {
        for(var i = 0; i < this.padMatrixY; i++) {
            let padId = 'pad_' + column + '_' + i;
            let pad = document.getElementById(padId);
            pad.classList.add('light');
        }
    }
    resetStepPad() {
        this.stepPad = 0;
    }
    playColumn(column) {
        for(var y = 0; y < this.padMatrixY; y++) {
            if(this.padMatrix[column][y]) {

                switch (y) {
                    case 0:
                        audioManager.playPad0();
                        break;
                    case 1:
                        audioManager.playPad1();
                        break;
                     case 2:
                        audioManager.playPad2();
                        break;
                     case 3:
                        audioManager.playPad3();
                        break;
                     case 4:
                        audioManager.playPad4();
                        break;
                }
            }
        }
    }
    clearLight() {
        for(var i = 0; i < this.padMatrixX; i++) {
            for(var j = 0; j < this.padMatrixY; j++) {
                let padId = 'pad_' + i + '_' + j;
                let pad = document.getElementById(padId);
                pad.classList.remove('light');
            }
        }
    }
    playLoop(delay) {
        this.loopIntervel = setInterval(this.onLoopHandler.bind(this), delay);
    }
    stopLoop() {
        clearInterval(this.loopIntervel);
    }
    onLoopHandler() {
        // sound.stop();
        this.stepPad = (this.stepPad < this.padMatrixX) ? this.stepPad : 0;
        this.clearLight();
        this.lightColumn(this.stepPad);
        this.playColumn(this.stepPad);
        this.stepPad++;
    }
}
var drumBox = new DrumBox();
var playLoopBtn = document.getElementById('playLoopBtn');
var stopLoopBtn = document.getElementById('stopLoopBtn');
var pauseLoopBtn = document.getElementById('pauseLoopBtn');
var isPlayLoop = false;
var onPlayLoopBtnClickHandler = function(event) {
    isPlayLoop = true;
    drumBox.playLoop(60000/180);
}

var onStopLoopBtnClickHandler = function(event) {
    isPlayLoop = false;
    drumBox.stopLoop();
    drumBox.resetStepPad();
}

var onPauseLoopBtnClickHandler = function(event) {
    isPlayLoop = false;
    drumBox.stopLoop();
}

playLoopBtn.addEventListener('click', onPlayLoopBtnClickHandler);
stopLoopBtn.addEventListener('click', onStopLoopBtnClickHandler);
pauseLoopBtn.addEventListener('click', onPauseLoopBtnClickHandler);