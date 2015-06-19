var Parallel = function(config){
    this.total = config.total;  
    this.storage = []; 
    this.recieved = 0; 
    this.handler = null; 
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
    console.log('calling handler and passing complete dataset'); 
    this.handler(this.storage); 
}; 

Parallel.prototype.setHandler = function(fn){
    if(typeof fn == 'function')
        this.handler = fn; 
}

module.exports = function(numberOfUpdates){
    return new Parallel({
        total: numberOfUpdates || 5 
    }); 
}; 