'use babel';

import * as React from 'react';
import { CompositeDisposable } from 'event-kit';
var calendarGen = require("./calendar-gen");


export default class CalendarMessageDialog extends React.Component {

    date = new Date();

    componentWillMount() {
        // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this dialog
        this.subscriptions.add(inkdrop.commands.add(document.body, {
            'calendar:add-selected-calendar': () => this.showCalendarSelection()
        }));

        this.subscriptions.add(inkdrop.commands.add(document.body, {
            'calendar:add-today-calendar': () => calendarGen.AddCalendar()
        }));

        this.setState({ words: 999 });

        console.log(this.date);
    }

    componentWillUnmount() {
        this.subscriptions.dispose();
    }

    render() {
        const { MessageDialog } = inkdrop.components.classes;
        return ( < MessageDialog ref = 'dialog'
            title = 'Date selection'
            buttons = {
                [
                    { label: "Cancel", cancel: true },
                    { label: "Insert", primary: true },
                ]
            }
            onDismiss = {
                (caller, buttonIndex) => {
                    console.log(buttonIndex);
                    if (buttonIndex === 1 /* Share */ ) {
                        calendarGen.AddCalendar(this.date);
                        return true
                    } else {
                        return true
                    }
                }
            } >
            <span > Please select the desired date
            for calendar </span><input id="cal-date-sel" onChange={event => this.setDate(event.target.value)} type='date'></input >
            </MessageDialog>

        );
    }


    setDate(value) {
        value = value.replace(/-/g, '/');
        console.log(value);
        this.date = new Date(value);
        this.date.setHours(0, 0, 0);
        console.log(this.date);
    }

    showCalendarSelection() {
        console.log('Calendar was toggled!');
        const { dialog } = this.refs;
        if (!dialog.isShown) {
            const { editingNote } = inkdrop.store.getState();
            if (editingNote) {
                dialog.showDialog();
            }
        } else {
            dialog.dismissDialog();
        }
    }
}