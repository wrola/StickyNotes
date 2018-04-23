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
        tryLocalStorage;

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
    createNote = function () {
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button'),
            onSave,
            onDelete,
            loadnotes;

        onDelete = function () {
            var obj = {};
            deleteNote(obj);
        }
        onSave = function () {
            var obj = {};
            saveNote(obj);
        }

        saveBtnEl.addEventListener('click', onSave);
        deleteBtnEl.addEventListener('click', onDelete);

        saveBtnEl.classList('saveButton');
        deleteBtnEl.classList('deleteButton');

        var transformCSSValue = 'translateX('+Math.random()*400+'px)translateY('+Math.random() *400+'px)';
        stickerEl.style.transform = transformCSSValue;

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
    init = function () {
        if(!testLocalStorage()){
            var message = 'We are sorry but you canoon use localstorage'
        } else {
            saveNote = function () {

            };
            deleteNote = function () {
                //tutaj bedzie usuwanie notatek
            };
            loadNotes = function () {
                // tutaj będą notatki
            }
            loadNotes();
        }

    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click',createNote,false);
    document.addEventListener('mousemove',onDrag,false);
    document.addEventListener('mouseup', onDragEnd, false);
};
init()

})();
