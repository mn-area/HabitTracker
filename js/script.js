// ======================
// 1. 状態
// ======================
const taskstate = {
    reading : false,
    studying : false,
    gaming : false
}

// ======================
// 2. 定数
// ======================
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const day = now.getDay();
const weekday = ["日","月","火","水","木","金","土"];
const showDate = `${year}年${month}月${date}日${weekday[day]}曜日`;

const reading = "reading";
const studying = "studying";
const gaming = "gaming";

// ======================
// 3. 関数
// ======================

// タスク完了状態変更処理 
function changeTaskState(state) {
    taskstate[state] = taskstate[state] ? false : true;
};

// タスク完了状態LocalStrage保存
function saveTaskState(task, state) {
    localStorage.setItem(task, state)
} 

// タスク完了状態取得
function loadTask() {
    const readingState = localStorage.getItem(reading);
    const studyingState = localStorage.getItem(studying);
    const gamingState = localStorage.getItem(gaming);
    taskstate.reading = JSON.parse(readingState);
    taskstate.studying = JSON.parse(studyingState);
    taskstate.gaming = JSON.parse(gamingState);
}

// 画面再描画処理
function render() {
    readingButton.textContent = taskstate.reading ? "完了" : "完了する";
    studyingButton.textContent = taskstate.studying ? "完了" : "完了する";
    gamingButton.textContent = taskstate.gaming ? "完了" : "完了する";
}

// ======================
// 4. HTML要素取得
// ======================
const readingButton = document.getElementById("btn-reading");
const studyingButton = document.getElementById("btn-studying");
const gamingButton = document.getElementById("btn-gaming");

// ======================
// 5. イベント登録
// ======================
readingButton.addEventListener("click", function()
    {
        changeTaskState(reading);
        saveTaskState(reading, taskstate.reading);
        render();
    }
);
studyingButton.addEventListener("click", function()
    {
        changeTaskState(studying);
        saveTaskState(studying, taskstate.studying);
        render();
    }
);
gamingButton.addEventListener("click", function()
    {
        changeTaskState("gaming");
        saveTaskState(gaming, taskstate.gaming);
        render();
    }
);

// ======================
// 6. 初回実行
// ======================
document.getElementById("date").textContent = showDate;
loadTask();
render();