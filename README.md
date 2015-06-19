## Parallel actor like object for Node 

If you want to process http queries in parallel you can do this 

```js 
var Parallel = require('./parallel'); 
var request  = require('request'); 

```

Create an actor for 2 parallel messages 

```js

var actor = new Parallel(2); 

```

Set a success handler. ```result``` parameter will contail result of both requests 

```js 
actor.setHandler(function(result){
    console.log('complete response: ', result); 
});

```

Now make sample requests 

```js 
            
    request.get('http://example.com/', function(error, response, body){
        if( error || response.statusCode != 200 ){
            return console.log('error', error); 
        }

        var data = JSON.parse(body); 
        actor.update('first request', data); 
    });


    request.get('http://some-other-url.com/', function(error, response, body){
        if( error || response.statusCode != 200 ){
            return console.log('error', error); 
        }

        var data = JSON.parse(body); 
        actor.update('second request', data); 
    });

``` 


