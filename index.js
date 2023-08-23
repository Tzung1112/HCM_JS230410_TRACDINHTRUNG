"use strict";
class Note {
    constructor(id = Date.now() * Math.random(), title = "") {
        this.id = id;
        this.title = title;
    }
    setData() {
        this.title = document.getElementById("title").value;
    }
    getData() {
        return {
            id: this.id,
            title: this.title,
        };
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.notes = [];
        let notesLocal = JSON.parse((_a = localStorage.getItem("notes")) !== null && _a !== void 0 ? _a : "[]");
        let notesTemp = [];
        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].id, notesLocal[i].title));
        }
        this.notes = notesTemp;
        this.renderHtml("mid_body");
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }
    deleteNote(id) {
        this.notes = this.notes.filter((item) => item.getData().id !== id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }
    getData() {
        return this.notes;
    }
    renderHtml(idRender) {
        let tableEl = document.getElementById(idRender);
        let trString = ``;
        this.notes.map((note, index) => {
            trString += `
              <div class="item_render"><span>${note.getData().title}</span>
              <i onclick="handleDelete(${note.getData().id})"  class="fa-solid fa-trash"></i>
              </div>
                            
         
            `;
            return note;
        });
        tableEl.innerHTML = trString;
    }
}
let tag = new NoteManager();
console.log("🚀 ~ file: index.ts:59 ~ tag:", tag);
function addNote() {
    let newNote = new Note();
    newNote.setData();
    tag.createNote(newNote);
    tag.renderHtml("mid_body");
    alert("Thêm thành công");
    document.getElementById("title").value = "";
}
function handleDelete(id) {
    /*  tag.deleteNote(id);
        tag.renderHtml('mid_body'); */
    let confirmation = window.confirm("Bạn có chắc chắn muốn xóa ghi chú này?");
    if (confirmation) {
        tag.deleteNote(id);
        tag.renderHtml('mid_body');
    }
}
