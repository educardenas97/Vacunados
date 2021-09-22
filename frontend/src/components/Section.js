export class Section {
    constructor(id, className) {
        this.id = id;
        this.className = className;
        this.headButton = null;
        this.submitButton = null;
    }

    addButton(button) {
        this.headButton = button;
    }

    hide() {
        this.className += ' hidden';
        const element = document.getElementById(this.id);
        element.className = this.className;
        this.headButton.switchStatus();
    }

    show() {
        this.className = this.className.replace('hidden', '');
        const element = document.getElementById(this.id);
        element.className = this.className;
        this.headButton.switchStatus();
    }

}

