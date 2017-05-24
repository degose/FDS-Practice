// ! toggleGrid.js @ 2017, gose

// 키보드 g + shift 를 토글하면 그리드를 껐다 켰다 할 수 있는 스크립트
var doc = document;
var body = doc.body;

doc.addEventListener('keyup', toggleGrid);

function toggleGrid(e) {
    if(e.keyCode === 71 && e.shiftKey){}body.classList.toggle('show-grid');
}