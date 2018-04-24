(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl,
        init,
        onAddNoteBtnclick,
        testLocalStorage;

    onDragStart = function (ev) {
        var boundClientRect;
        if (ev.target.className.indexOf('bar')=== -1) {
        return;
        }

        draggedEl = this;

        boundClientRect = draggedEl.getBoundingClientRect();

        grabPointY = boundClientRect.top - ev.clientY;
        grabPointX = boundClientRect.left - ev.clientX;
    };

    onDrag = function (ev) {
        if(!draggedEl){
            return;
        }

        var posX = ev.clientX + grabPointX,
            posY = ev.clientY + grabPointY;

        if (posX < 0){
            posX = 0;
        }
        if(posY < 0){
            posY = 0;
        }

        draggedEl.style.transform = 'translateX('+ posX + 'px) translateY('+ posY +'px)';

    };

    onDragEnd = function () {
        draggedEl =  null;
        grabPointY = null;
        grabPointX = null;
    };

    // Make new note
    createNote = function (options) {
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button'),
            onSave,
            onDelete,
            getNoteObject,
            BOUNDARIES = 400,
            noteConfig = options || {
                content: '',
                id: 'sticker_'+new Date().getTime(),
                transformCSSValue: 'translateX('+Math.random()*BOUNDARIES+'px) translateY('+Math.random()*BOUNDARIES+'px)'
            }
            loadNotes;

        onDelete = function () {
            deleteNote(
                getNoteObject(stickerEl)
            );
            document.body.removeChild(stickerEl);
        };
        getNoteObject = function (el) {
            var textarea = el.querySelector('textarea')
            return {
                content: textarea.value,
                id: el.id,
                transformCSSValue:  el.style.transform,
                textarea: {
                    width: textarea.style.width,
                    height: textarea.style.height
                }
            };
        }
        onSave = function () {
            saveNote(
            getNoteObject(stickerEl)
            );
        };
        if(noteConfig.textarea){
            textareaEl.style.width = noteConfig.textarea.width,
            textareaEl.style.height = noteConfig.textarea.height,
            textareaEl.style.resize = 'none';


        }
        stickerEl.id = noteConfig.id;
        textareaEl.value = noteConfig.content
        

        saveBtnEl.addEventListener('click', onSave);
        deleteBtnEl.addEventListener('click', onDelete);

        saveBtnEl.classList('saveButton');
        deleteBtnEl.classList('deleteButton');

        stickerEl.style.transform = noteConfig.transformCSSValue;

        barEl.classList.add('bar');
        stickerEl.classList.add('sticker');

        barEl.appendChild(saveBtnEl);
        barEl.appendChild(deleteBtnEl);

        stickerEl.appendChild(barEl);
        stickerEl.appendChild(textareaEl);
        stickerEl.addEventListener('mousedown', onDragStart, false);

        document.body.appendChild(stickerEl);
    };

    testLocalStorage = function () {
        var foo = 'foo'
        try {
            localStorage.setItem(foo,foo);
            localStorage.removeItem(foo);
            return true;
        } catch (e) {
            return false;
        }
    }

    onAddNoteBtnclick = function () {
        createNote();
    }
    init = function () {
        if(!testLocalStorage()){
            var message = 'We are sorry but you canoon use localstorage'
            saveNote = function () {
                console.warn(message)
            }
        } else {
            saveNote = function () {
            localStorage.setItem(note.id, note);

            };
            deleteNote = function (note) {
                localStorage.removeItem(note.id);
            };
            loadNotes = function () {
                for(let i =0;i<localStorage.length;i++){
                    const noteObject = JSON.parse(
                        localStorage.getItem(
                        localStorage.key(i)
                        )
                    )
                }
                createNote(noteObject)
            }
            loadNotes();
        }

    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click',onAddNoteBtnclick,false);
    document.addEventListener('mousemove',onDrag,false);
    document.addEventListener('mouseup', onDragEnd, false);
};
init()

})();
