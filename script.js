const noteTitle = document.getElementById('noteTitle');
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

document.addEventListener("DOMContentLoaded", loadNotes);

// Function to create a new note item
function createNoteItem(title, noteText) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');

    const noteTitleElem = document.createElement('div');
    noteTitleElem.classList.add('note-title1');
    noteTitleElem.textContent = title;

    const noteContentElem = document.createElement('div');
    noteContentElem.classList.add('note-content');
    noteContentElem.textContent = noteText;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.classList.add('note-btn', 'view-btn');
    viewBtn.onclick = () => alert(`Title: ${title}\n\n${noteText}`);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('note-btn', 'edit-btn');
    editBtn.onclick = () => editNoteItem(noteItem, title, noteText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('note-btn', 'delete-btn');
    deleteBtn.onclick = () => deleteNoteItem(noteItem, title);

    btnContainer.append(viewBtn, editBtn, deleteBtn);
    noteItem.append(noteTitleElem, noteContentElem, btnContainer);
    notesList.appendChild(noteItem);

    saveNotes();
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-item').forEach(note => {
        notes.push({
            title: note.querySelector('.note-title1').textContent,
            content: note.querySelector('.note-content').textContent
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => createNoteItem(note.title, note.content));
}

// Delete note with confirmation
function deleteNoteItem(noteItem, title) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        noteItem.remove();
        saveNotes();
    }
}

// Edit note
function editNoteItem(noteItem, title, content) {
    noteTitle.value = title;
    noteInput.value = content;
    noteItem.remove();
    saveNotes();
}

// Add a new note
addNoteBtn.addEventListener('click', () => {
    if (noteTitle.value && noteInput.value) {
        createNoteItem(noteTitle.value, noteInput.value);
        noteTitle.value = "";
        noteInput.value = "";
    }
});
