const adBtn = document.getElementById("add-btn");
const noteCont = document.getElementById("note-container");
const textWarn = document.querySelector(".text-warn");


let state = {
    notes: [],
    _notes: [],
    proto: {
        text: "",
        positionTop: "",
        positionLeft: "",
        isPositionAbsolute: false,
        isInputDisabled: true,
    }
}

function saveNotes() {
    return localStorage.setItem("notes", JSON.stringify(state));
}


function loadNotes() {
    const myNotes = localStorage.getItem("notes");
    if (myNotes) {
        const stateLS = JSON.parse(myNotes);
        state = { ...stateLS };
    }
}

const createNote = ({ text, positionTop, positionLeft, isPositionAbsolute, isInputDisabled }) => {
    if (state.notes.length === 0 || !state.notes[state.notes.length - 1]?.isPositionAbsolute == false) {
        const newNote = {
            id: state._notes.length + 1,
            text: text,
            positionTop: positionTop,
            positionLeft: positionLeft,
            isPositionAbsolute: isPositionAbsolute,
            isInputDisabled: isInputDisabled,
        }
        state.notes.push(newNote);
        state._notes.push(newNote);
    } else if (state.notes[state.notes.length - 1]?.isPositionAbsolute == false) {
        textWarn.innerHTML = "Drag this note before creating another one";
    }
}

function renderNotes() {
    let html = state.notes.map((note) =>
        `<div class="note" id=${note.id} ${note.isPositionAbsolute ? `style="position: absolute; top: ${note.positionTop}; left: ${note.positionLeft}"` : ""}>
        <div class="buttons">
        <img class="dragger" data-id=${note.id} src="./drag.png"></img>
            <button class="btn delete-btn" data-id=${note.id}>
            <img class="cursor delete-btn" data-id=${note.id} src="./trash.svg"></img>
            </button>
            <button class="btn edit-btn" data-id=${note.id}>
            ${note.isInputDisabled ? `<img class="cursor edit-btn" data-id=${note.id} src="./pen-to-square-solid.svg"` :
            "&#10003;"}
            </button>
            </div>
            <textarea data-id=${note.id}
            class="note-txt" ${note.isInputDisabled ? "disabled" : `placeholder="Write here..."`}>${note.text ? note.text : ""}</textarea>
            </div>`
    ).join("");
    noteCont.innerHTML = html;

}

function setHandlers() {
    adBtn.addEventListener("click", () => {
        createNote(state.proto);
        saveNotes();
        loadNotes();
        renderNotes();
    })

    document.addEventListener("click", (event) => {
        function removeNote(target) {
            state.notes.splice(target, 1);
            saveNotes();
            renderNotes();
        }
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.dataset.id;
            const targetIndex = state.notes.findIndex((note) => {
                return note.id == id;
            });
            removeNote(targetIndex)
        }  else if (event.target.classList.contains("edit-btn")) {
            const id = event.target.dataset.id;
            const targetIndex = state.notes.findIndex((note) => {
                return note.id == id;
            });
            state.notes[targetIndex].isInputDisabled = !state.notes[targetIndex].isInputDisabled;
            state._notes[targetIndex].isInputDisabled = !state._notes[targetIndex].isInputDisabled;
            saveNotes();
            renderNotes();
            let thisNote = event.target.parentElement.parentElement;
            let thisTextarea = thisNote.querySelector(".note-txt");
            if (state.notes[targetIndex].isInputDisabled == true) {
                state.notes[targetIndex].text = thisTextarea.value;
                saveNotes();
                renderNotes();
            }
        }
    })
    
    document.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("dragger")) {
            function draggableElement() {
                    let dragger = event.target;
                    let item = dragger.parentElement.parentElement;
                    dragger.onmousedown = dragMouseDown;
        
                    function dragMouseDown(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        document.onmousemove = elementDrag;
        
                    }
        
                    function elementDrag(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        item.style.position = "absolute";
                        item.style.top = (item.offsetTop - pos2) + "px";
                        item.style.left = (item.offsetLeft - pos1) + "px";
                        const thisId = dragger.dataset.id;
                        const thisTargetIndex = state.notes.findIndex((note) => {
                            return note.id == thisId;
                        });
                        if (state.notes[state.notes.length - 1]?.isPositionAbsolute == true) {
                            textWarn.innerHTML = "";
                        }
                        state.notes[thisTargetIndex] = {
                            ...state.notes[thisTargetIndex],
                            isPositionAbsolute: true,
                            positionTop: item.style.top,
                            positionLeft: item.style.left,
                        }
                        state._notes[thisTargetIndex] = {
                            ...state._notes[thisTargetIndex],
                            isPositionAbsolute: true,
                            positionTop: item.style.top,
                            positionLeft: item.style.left,
                        }
                    }
        
                    function closeDragElement(e) {
                        document.onmouseup = null;
                        document.onmousemove = null;
                        saveNotes();
                        renderNotes();
                    }
                }
                draggableElement();
        }
    })
}

loadNotes();
renderNotes();
setHandlers();