var Parallel = function(config){
    this.total = config.total;
    this.timeout = config.timeout;   
    this.timer = null; 
    this.finished = false; 
    this.storage = []; 
    this.recieved = 0; 
    this.handler = null; 

    if(this.timeout){
        var self = this; 
        this.timer = setTimeout(function(){
            self.onReady(); 
        }, this.timeout); 
    }

};  

Parallel.prototype.update = function(name, data){
        this.recieved += 1; 
        this.storage = this.storage.concat({name: name, data: data}); 
        this.onUpdate(); 
    }; 

Parallel.prototype.onUpdate = function(){
        if( this.recieved >= this.total ){ 
            console.log('all request are made'); 
            return this.onReady(); 
        }    
}; 

Parallel.prototype.update = function(name, data){
    this.recieved += 1; 
    this.storage = this.storage.concat({name: name, data: data}); 
    this.onUpdate(); 
}; 

Parallel.prototype.onReady = function(){
    if(this.finished)
        return console.log('timeout was hit, current dataset was sent'); 
    
    if(this.timer) clearTimeout(this.timer); 

    console.log('calling handler and passing complete dataset'); 
    this.finished = true; 
    this.handler(this.storage); 
}; 

Parallel.prototype.setHandler = function(fn){
    if(typeof fn == 'function')
        this.handler = fn; 
}

module.exports = function(numberOfUpdates, timeout){
    return new Parallel({
        total: numberOfUpdates || 5, 
        timeout:  timeout || 5000 
    }); 
}; 