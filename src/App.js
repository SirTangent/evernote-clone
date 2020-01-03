import React from 'react';
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";
import './App.css';

const firebase = require('firebase');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {
    return(
        <div className='app-container'>
            <SidebarComponent
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                selectNote={this.selectNote}
                newNote={this.newNote}
            ></SidebarComponent>
            {
                this.state.selectedNote ?
                    <EditorComponent
                        selectedNote={this.state.selectedNote}
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        notes={this.state.notes}
                        noteUpdate={this.noteUpdate}
                    ></EditorComponent>
                    :
                    null
            }
        </div>
    );
  }

    selectNote = (n, i) => {
        this.setState({selectedNoteIndex: i, selectedNote: n});
    };

    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({notes: this.state.notes.filter(_note => _note !== note )})

        if(this.state.selectedIndex === noteIndex) {
            this.setState({ selectedNoteIndex: null, selectedNote: null });
        } else {
            this.state.notes.length > 1 ?
                this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
                this.setState({ selectedNoteIndex: null, selectedNote: null });
        };

        await firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete();
    };

    noteUpdate = (id, noteObj) => {
        firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: noteObj.title,
                body: noteObj.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    };

    newNote = async (title) => {
        const note = {
            title: title,
            body: ''
        };
        const newFromBD = await firebase
            .firestore()
            .collection('notes')
            .add({
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        const newID = newFromBD.id;
        await this.setState({notes: [...this.state.notes, note]});
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            newNoteIndex: newNoteIndex
        });
    };

  componentDidMount = () => {
    firebase
        .firestore()
        .collection('notes')
        .onSnapshot(serverUpdate => {
          const notes = serverUpdate.docs.map(_doc => {
            const data = _doc.data();
            data['id'] = _doc.id;
            return data;
          });
          this.setState({notes: notes});
        });
  }

}

export default App;
