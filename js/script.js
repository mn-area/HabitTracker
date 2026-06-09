// ======================
// 1. 状態
// ======================
const tasks2 = [
    {
        taskId : "sample",
        text : "sample",
        state: {
            '2026/6/4' : true,
            '2026/6/5' : true
        }
    }
]
let tasks = JSON.parse(localStorage.getItem("taskState")) ?? tasks2;

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
const today = year + "/" + month  + "/" + date
var editTaskId = "";

// ======================
// 3. 関数
// ======================

// タスク完了状態変更処理 
function changeTaskState(taskId) {
    const task = tasks.find(task => task.taskId == taskId);
    if (task) {
        task.state[today] = !task.state[today];
    }
};

// タスク完了状態LocalStrage保存
function saveTaskState() {
    localStorage.setItem("taskState", JSON.stringify(tasks));
} 

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.taskId != taskId);
    saveTaskState();
    alert("削除が完了しました。");
    deleteDialog.close();
    renderTask(tasks);
}

// 配列から登録済みタスクを描画
function renderTask(tasks) {
    const listArea = document.getElementById("card-area");
    listArea.innerHTML = "";

    for (task in tasks) {
        const li = document.createElement('li');
        li.id = tasks[task].taskId;
        li.className = "li-item";
        li.innerHTML = `
                <p class="task-text">${tasks[task].text}</p>
                <button type="button" class="btn-task taskcontroll" taskState=${tasks[task].state[today]}></button>
                <button type="button" class="btn-edit taskcontroll">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                </button>
                <button type="button" class="btn-trash">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
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
                document.getElementById(eleId).children[1].textContent = tasks[task].state[today] ? "完了" : "完了する";
                break;
            }
        }
    }
}

// ======================
// 4. HTML要素取得
// ======================
const inputTaskBtn = document.getElementById('inputTaskBtn');
const taskDialog = document.getElementById('TaskDialog');
const closeDialog = document.getElementById('closeDialogBtn');
const addTask = document.getElementById('addTaskBtn');
const editTaskBtn = document.getElementById('editTaskBtn');
const taskIdText = document.getElementById('taskIdText');
const taskNameText = document.getElementById('taskNameText');
const deleteDialog = document.getElementById('DeleteDialog');
const closeDeleteDialogBtn = document.getElementById('closeDeleteDialogBtn');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');

// ======================
// 5. イベント登録
// ======================

// タスク追加ボタン
inputTaskBtn.addEventListener('click', () => {
    taskDialog.showModal();
});

// ダイアログを閉じるボタン
closeDialog.addEventListener('click', () =>{
    taskDialog.close();
});

// タスク完了ボタン
window.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('.btn-task').forEach(x=> {
        x.addEventListener('click', e=> {
            const taskId = x.parentNode.id;
            changeTaskState(taskId);
            saveTaskState();
            render(tasks);
        });
    });
});


// 鉛筆ボタン
window.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('.btn-edit').forEach(x=> {
        x.addEventListener('click', e=> {
            if (e.target.classList.contains('btn-edit')) {
                const li = e.target.closest('li');
                const taskText = li.querySelector('.task-text').textContent;
                editTaskId = x.parentNode.id;
                taskIdText.value = editTaskId;
                taskNameText.value = taskText 
                taskDialog.showModal();
                taskIdText.setAttribute("disabled", true);
                addTask.style.display = 'none';
                editTaskBtn.style.display = 'inline';
            }
        });
    });
});

// ゴミ箱ボタン
window.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('.btn-trash').forEach(x=> {
        x.addEventListener('click', e=> {
            editTaskId = x.parentNode.id;
            deleteDialog.showModal();
        });
    });
});


// タスク削除ボタン
deleteTaskBtn.addEventListener('click', () =>{
    if (tasks.some(task => task.taskId == editTaskId)) {
        deleteTask(editTaskId);
    }
});

// タスク削除ダイアログを閉じるボタン
closeDeleteDialogBtn.addEventListener('click', () =>{
    deleteDialog.close();
});

// タスク登録ボタン
addTask.addEventListener('click', () => {
    const taskId = document.getElementById('taskIdText').value;
    const taskName = document.getElementById('taskNameText').value;
    
    if (taskId == null || taskId == undefined || taskId == "") {
        alert("タスクIDを入力して下さい。");
        return;
    } else if ( taskName  == null || taskName == undefined || taskName == "") {
        alert("タスク名を入力してください。");
        return;
    } else {
        if (taskId.match(/^[a-zA-Z0-9-_]+$/)) {
            const inputTask = {
                taskId : taskId,
                text : taskName,
                state: {
                }
            }
            tasks.push(inputTask);
            saveTaskState();
            alert("習慣の追加が完了しました。");
            taskDialog.close();
            renderTask(tasks);
            render(tasks);
        } else {
            alert("タスクIDは半角英数字・ハイフン・アンダースコアのみ使用できます。");
            return;
        }
    }
});

// タスク更新ボタン
editTaskBtn.addEventListener('click', () => { 
    const taskId = document.getElementById('taskIdText').value;
    const taskName = document.getElementById('taskNameText').value;

    if (taskId == null || taskId == undefined || taskId == "") {
        alert("タスクIDを入力して下さい。");
        return;
    } else if ( taskName  == null || taskName == undefined || taskName == "") {
        alert("タスク名を入力してください。");
        return;
    } else {
        const index = tasks.findIndex(task => task.taskId == taskId);
        tasks[index].text = taskName;
        saveTaskState();
        alert("習慣の更新が完了しました。");
        taskDialog.close();
        renderTask(tasks);
        render(tasks);
    }

});
// ======================
// 6. 初回実行
// ======================
document.getElementById("date").textContent = showDate;
renderTask(tasks);
render(tasks);
