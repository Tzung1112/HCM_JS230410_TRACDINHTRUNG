interface NoteType{
    id:number;
    title:string;
}
class Note{
  private id: number;
    private title: string;
    constructor(id: number = Date.now() * Math.random(),title:string=""){
         this.id = id;
        this.title = title;
    }
    setData(){
         this.title = (document.getElementById("title") as HTMLInputElement).value!;
    }
    getData():NoteType{
        return{
            id: this.id,
            title: this.title,
        }
    }
}
class NoteManager{
    notes:Note[]=[];
    constructor(){
        let notesLocal=JSON.parse(localStorage.getItem("notes") ?? "[]");
        let notesTemp=[];
        for(let i in notesLocal){
            notesTemp.push(new Note(notesLocal[i].id,notesLocal[i].title))
        }
        this.notes=notesTemp;
        this.renderHtml("mid_body");
    }
    createNote(newNote:Note) {
        this.notes.push(newNote);
         localStorage.setItem("notes", JSON.stringify(this.notes))
    }
    deleteNote(id: number) {
        this.notes = this.notes.filter((item) => item.getData().id !== id);
         localStorage.setItem("notes", JSON.stringify(this.notes))
    }
    
     getData(): Note[] {
        return this.notes
    }
    renderHtml(idRender:string){
       let tableEl = document.getElementById(idRender)as HTMLElement;

        let trString = ``;

        this.notes.map((note, index) => {
            trString += `
              <div class="item_render"><span>${note.getData().title}</span>
              <i onclick="handleDelete(${note.getData().id})"  class="fa-solid fa-trash"></i>
              </div>
                            
         
            `
            return note
        })
        
       
        tableEl.innerHTML = trString;
    }
}
let tag= new NoteManager();
console.log("🚀 ~ file: index.ts:59 ~ tag:", tag)
function addNote():void{

    let newNote=new Note();
    newNote.setData()
    tag.createNote(newNote)
    tag.renderHtml("mid_body");
    alert("Thêm thành công");
    (document.getElementById("title") as HTMLInputElement).value = "";
}
function handleDelete(id:number){
    /*  tag.deleteNote(id);
        tag.renderHtml('mid_body'); */
     let confirmation = window.confirm("Bạn có chắc chắn muốn xóa ghi chú này?");
   if (confirmation) {
        tag.deleteNote(id);
        tag.renderHtml('mid_body');
    }
}