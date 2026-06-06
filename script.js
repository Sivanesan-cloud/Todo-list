const input = document.getElementById("taskInput");
const list = document.getElementById("list-container");
let num = 1;

function addTask() {
    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.dataset.id = num;

    let span = document.createElement("span");
    span.textContent = input.value;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = () => {
        li.remove();
        let d_id=li.dataset.id;
        const key=parseInt(d_id,10);
        localStorage.removeItem(li.dataset.id);
      
    };

    span.onclick = () => {
        li.classList.toggle("checked");
    };

    span.ondblclick = () => {
        editInline(span, li);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    localStorage.setItem(num, input.value);
    let lastl= num;
    num++;
    input.value = "";
}

function editInline(span, li) {
    let inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = span.textContent;
    inputEdit.className = "edit-input";

    li.replaceChild(inputEdit, span);
    inputEdit.focus();

    inputEdit.onblur = () => saveEdit(li, inputEdit.value);
    inputEdit.onkeydown = (e) => {
        if (e.key === "Enter") saveEdit(li, inputEdit.value);
    };
}

function saveEdit(li, text) {
    if (text.trim() === "") {
        li.remove();
        localStorage.removeItem(li.dataset.id);
        return;
    }

    let span = document.createElement("span");
    span.textContent = text;

    span.onclick = () => li.classList.toggle("checked");
    span.ondblclick = () => editInline(span, li);

    li.replaceChild(span, li.querySelector("input"));
    localStorage.setItem(li.dataset.id, text);
}
