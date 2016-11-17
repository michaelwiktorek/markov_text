function exists(thing) {
    return typeof(thing) !== "undefined" && thing !== null;
}

class MarkovChain {
    constructor(text, k) {
	this.dict = {};
	this.k = k;
	this.text = text;
	for (let i = 0; i < text.length; i++) {
	    var key = '';
	    var value = '';
	    if (i < text.length - this.k) {
		key = text.substring(i, i+this.k);
		value = text.substring(i+1, i+this.k+1);
	    } else {
		var diff = (i+this.k) - text.length;
		key = text.substring(i, i+this.k) + text.substring(0, diff);
		value = text.substring(i+1, i+this.k+1) + text.substring(0, diff+1);
	    }
	    this.add_transition(key, value);
	}
    }

    add_transition(v, w) {
	if (!exists(this.dict[v])) {
	    this.dict[v] = [];
	}
	this.dict[v].push(w);
	if (!exists(this.dict[w])) {
	    this.dict[w] = [];
	}
    }

    next(v) {
	var len = this.dict[v].length;
	var rand = Math.floor(Math.random() * len);
	return this.dict[v][rand];
    }

    print() {
	console.log("keys: ");
	for (let i of this.dict) {
	    console.log(i);
	}
    }

    print_neighbors(v) {
	var len = this.dict[v].length;
	console.log(len);
	for (let i = 0; i < len-1; i++) {
	    console.log(this.dict[v][i]);
	}
    }

    last_char(v) {
	return v.slice(-1);
    }

    generate_text(length) {
	var m = parseInt(length, 10);
	var state = this.text.slice(0, this.k);
	var output = "" + state;
	for (let i = 0; i < m-this.k; i++) {
	    state = this.next(state);
	    if (state == -1 || !exists(state)) {
		return output;
	    }
	    output = output + this.last_char(state);
	}
	return output;
    }
}

class Manager {
    constructor() {
	console.log("made manager");
    }

    build_chain(text, k) {
	this.chain = new MarkovChain(text, parseInt(k, 10));
    }

    generate_text(M) {
	var m = parseInt(M, 10);
	if (!exists(this.chain)) {
	    alert("you need to build a markov chain first!");
	    return "";
	} else {
	    return this.chain.generate_text(m);
	}  
    }
}

window.onload = function() {
    var manager = new Manager();
    
    var build_chain = function() {
	var k_val = document.querySelector("#kval").value;
	var text = document.querySelector("#text").value;
	manager.build_chain(text, k_val);
    };

    var build_text = function() {
	var length = document.querySelector("#length").value;
	var output = manager.generate_text(length);
	var div = document.querySelector("#output");
	div.innerHTML = output;
    };

    document.querySelector("#start").onclick = build_chain;
    document.querySelector("#print").onclick = build_text;
};



