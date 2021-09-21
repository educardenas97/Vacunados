class Button {
    constructor(id, text, className) {
        this.id = id;
        this.text = text;
        this.className = className;
    }

    update() {
        const button = document.getElementById(this.id);
        button.setAttribute('class', this.className);
        button.innerText = this.text;
    }

    getElement() {
        return document.getElementById(this.id);
    }
    
}

export class SubmitButton extends Button {
    constructor(id, text, className, status) {
        super(id, text, className);
        this.isEnable = status;
    }

    enable() {
        super.className = 'primary enabled';
        super.update();
        this.isEnable = true;
    }

    disable() {
        super.className = 'primary disabled';
        super.update();
        this.isEnable = false;
    }

    switchStatus() {
        if (this.isEnable) {
            this.disable();
        } else {
            this.enable();
        }
    }
}

export class HeaderButton extends Button {
    constructor(id, text, className, isFocus) {
        super(id, text, className);
        this.isFocus = isFocus;
    }

    focus() {
        super.className = 'button primary icon solid fa-chevron-down scrolly';
        super.update();
        this.isFocus = true;
    }

    unFocus() {
        super.className = 'button icon solid fa-search';
        super.update();
        this.isFocus = false;
    }

    switchStatus() {
        if (this.isFocus) {
            this.unFocus();
        } else {
            this.focus();
        }
    }

}
