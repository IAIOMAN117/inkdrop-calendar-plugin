'use babel';

import CalendarMessageDialog from './calendar-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(CalendarMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'CalendarMessageDialog'
    );    
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'CalendarMessageDialog'
    )
    inkdrop.components.deleteClass(CalendarMessageDialog);
  }

};
