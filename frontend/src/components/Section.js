export class Section {
    constructor(id, className) {
        this.id = id;
        this.className = className;
        this.buttons = [];
    }

    addButton(button) {
        this.buttons.push(button);
    }

    hide() {
        this.className += ' hidden';
        const element = document.getElementById(this.id);
        element.className = this.className;
        this.buttons.forEach(button => button.switchStatus());
    }

    show() {
        this.className = this.className.replace('hidden', '');
        const element = document.getElementById(this.id);
        element.className = this.className;
        this.buttons.forEach(button => button.switchStatus());
    }

}

