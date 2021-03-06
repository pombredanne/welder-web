// Toast Notification page object
const MainPage = require('./main');

module.exports = class TostaNotifPage extends MainPage {
  constructor(recipeName) {
    super('Toast Notification');
    this.notifFor = recipeName;

    // Notification pop up window
    this.divNotifWindow = '.toast-notifications-list-pf';

    // Working and Complete icon
    this.iconCreating = '#cmpsr-toast-0 .pficon .spinner-inverse';
    this.iconComplete = '#cmpsr-toast-0 .pficon-ok';

    // Recipe Name label
    this.labelRecipeName = '#cmpsr-toast-0 span strong';
    this.varRecipeName = `${this.notifFor}:`;
    this.varEmptyName = ':';

    // Working and Complete status label
    this.varStatusCreating = `${this.varRecipeName} Creating composition.`;
    this.varStatusComplete = `${this.varRecipeName} Composition creation is complete.`;

    // Notification label
    this.labelStatus = '#cmpsr-toast-0 span + span';

    // Recipe saving and saved status label
    this.varStatusSaving = `${this.varRecipeName} Saving recipe.`;
    this.varStatusSaved = `${this.varRecipeName} Recipe is saved.`;

    // Cancel link
    this.linkCancel = '#cmpsr-toast-0 .toast-pf-action a';
  }
};
