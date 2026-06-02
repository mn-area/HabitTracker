// ======================
// 1. 状態
// ======================
const taskstate = {
    reading : false,
    studying : false,
    gaming : false
}

const tasks = [
    {
        taskId : "reading",
        text : "読書",
        completed : false
    },
    {
        taskId : "studying",
        text : "勉強",
        completed : false
    },
    {
        taskId : "gaming",
        text : "ゲーム",
        completed : false 
    }
]
// ======================
// 2. 定数
// ======================
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const day = now.getDay();
const weekday = ["日","月","火","水","木","金","土"];
const showDate = `${year}年${month}月${date}日（${weekday[day]}）`;

const reading = "reading";
const studying = "studying";
const gaming = "gaming";

// ======================
// 3. 関数
// ======================

// タスク完了状態変更処理 
function changeTaskState(taskId) {
    const task = tasks.find(task => task.taskId == taskId);
    if (task) {
        task.completed = !task.completed;
    }
};

// タスク完了状態LocalStrage保存
function saveTaskState(task, state) {
    localStorage.setItem("taskState", JSON.stringify(tasks))
} 

// タスク完了状態取得
function loadTask() {
    const storageState = JSON.parse(localStorage.getItem("taskState")) ?? taskstate;
    taskstate.reading = storageState.reading;
    taskstate.studying = storageState.studying;
    taskstate.gaming = storageState.gaming;
}

// 配列から登録済みタスクを描画
function renderTask(tasks) {
    const listArea = document.getElementById("card-area");

    for (task in tasks) {
        const li = document.createElement('li');
        li.id = tasks[task].taskId;
        li.className = "li-item";
        li.innerHTML = `
                <p class="task-text">${tasks[task].text}</p>
                <button type="button" class="btn-task" taskState=${tasks[task].completed}>
                </button>
            `;
        listArea.appendChild(li);
    }
}

// 画面再描画処理
function render(tasks) {
    for (task in tasks) {
        const eleTask = document.getElementsByClassName('li-item');
        const eleId = eleTask[task].id;
        for (let i = 0; i <= eleTask.length; i++) {
            if (eleId == tasks[task].taskId) {
                document.getElementById(eleId).children[1].textContent = tasks[task].completed ? "完了" : "完了する";
                break;
            }
        }
    }
}

// ======================
// 4. HTML要素取得
// ======================
// const readingButton = document.getElementById("btn-reading");
// const studyingButton = document.getElementById("btn-studying");
// const gamingButton = document.getElementById("btn-gaming");

// ======================
// 5. イベント登録
// ======================
window.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('.btn-task').forEach(x=> {
        x.addEventListener('click', e=> {
            const taskId = x.parentNode.id;
            const taskState = x.getAttribute('taskState');
            console.log(taskState)
            changeTaskState(taskId);
            saveTaskState(taskId, taskState);
            render(tasks);
        });
    });
});

// ======================
// 6. 初回実行
// ======================
document.getElementById("date").textContent = showDate;
loadTask();
renderTask(tasks);
render(tasks);
