const adBtn = document.getElementById("add-btn");
const noteCont = document.getElementById("note-container");

adBtn.addEventListener("click",
    () => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML =
            `<div class="buttons">
        <button class="btn delete-btn">
        <img class="cursor" src="./trash.svg"></img>
        </button>
        <button class="btn edit-btn">
        <img class="cursor" src="./pen-to-square-solid.svg"></img>
        </button>
        </div>
        <textarea class="note-txt" disabled></textarea>`
        noteCont.appendChild(noteDiv);
        const deleteBtn = noteDiv.querySelector(".delete-btn");
        const editBtn = noteDiv.querySelector(".edit-btn");
        const txtArea = noteDiv.querySelector(".note-txt");
        const btnCont = noteDiv.querySelector(".buttons");
        deleteBtn.addEventListener("click", () => {
            console.log(deleteBtn);
            noteCont.removeChild(noteDiv);
        }
        )

        editBtn.addEventListener("click", () => {
            console.log(editBtn);
            txtArea.toggleAttribute("disabled");
            if (!txtArea.placeholder) {
                txtArea.placeholder = "Write here...";
            } else {
                txtArea.placeholder = "";
            }
            txtArea.focus();
        }
        )

        function dragElement(elmnt) {
            btnCont.onmousedown = dragMouseDown;
        }

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
            noteDiv.style.position = "absolute";
            noteDiv.style.top = (noteDiv.offsetTop - pos2) + "px";
            noteDiv.style.left = (noteDiv.offsetLeft - pos1) + "px";
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
        dragElement(noteDiv);
/*         txtArea.addEventListener("input", () => {
            console.log("got it")
        localStorage.setItem("card", noteDiv)
        localStorage.setItem("position", JSON.stringify(noteDiv.style.position));
        localStorage.setItem("top", JSON.stringify(noteDiv.style.top));
        localStorage.setItem("left", JSON.stringify(noteDiv.style.left));
        }
        )
        return noteDiv; */
    }
)

/* localStorage.getItem("card")
JSON.parse(localStorage.getItem("position"));
JSON.parse(localStorage.getItem("top"));
JSON.parse(localStorage.getItem("left")); */
