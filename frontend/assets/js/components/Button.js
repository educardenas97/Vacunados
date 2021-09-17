class button {
    constructor(id, text, className) {
        this.id = id;
        this.text = text;
        this.className = className;
    }

    render() {
        const button = document.createElement('button');
        button.setAttribute('id', this.id);
        button.setAttribute('class', this.className);
        button.innerText = this.text;
        return button;
    }

    //Add event listener to button, if event is click, call function
    addEventListener(event, callback) {
    
    }
}