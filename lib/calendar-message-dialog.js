'use babel';

import * as React from 'react';
import { CompositeDisposable } from 'event-kit';
var calendarGen = require("./calendar-gen");


export default class CalendarMessageDialog extends React.Component {

  componentWillMount () {
    // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this dialog
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'calendar:insertToday': () => this.insertToday()
    }));

    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'calendar:add-today-calendar': () => calendarGen.createTodayCalendar()
    }));    

    this.setState( { words: 999 } );
  }

  componentWillUnmount () {
    this.subscriptions.dispose();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;
    return (
       <MessageDialog ref='dialog' title='Calendar'>
        There are { this.state.words } words.
      </MessageDialog>
    );
  }

  putTodayCalendar() {    
    const { cm } = inkdrop.getActiveEditor()
    cm.replaceSelection('Todays Calendar');
    return true
  }

  insertToday() {
    console.log('Calendar was toggled!');    
    const { dialog } = this.refs;
    if (!dialog.isShown) {
      const { editingNote } = inkdrop.store.getState();
      console.log('!shown!');    
      if(editingNote) {
        const { body } = editingNote;
        const words = body.split(/\s+/).length;
        this.setState({ words });                
        dialog.showDialog();
      }
    } else {
      dialog.dismissDialog();
    }
  }
}
