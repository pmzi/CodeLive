// Some function helpers to speed up developement time

// For selecting single element
window.$ = (selector)=>{
    return document.querySelector(selector);
};

// For selecting multiple elements
window.$$ = (selector)=>{
    return document.querySelectorAll(selector);
};

// For making an element empty
Element.prototype.empty = function(){
    this.innerHTML = "";
}

// For appending an html inside another element
Element.prototype.append = function(html){
        var div = document.createElement('div');
        div.innerHTML = html;
        while (div.children.length > 0) {
          this.appendChild(div.children[0]);
        }
}

// For triggering events
Element.prototype.trigger = function(eventName){
    this.dispatchEvent(new Event(eventName));
}

Element.prototype.on = function(eventNames, eventFunction){
    eventNames = eventNames.split(" ");
    for(let eventName of eventNames){
        this.addEventListener(eventName, eventFunction);
    }
}