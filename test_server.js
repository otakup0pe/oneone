var _ = require('underscore');
var Server = require('./Server');

var server = new Server(8080);
server.onRequest(function(handler, context, cb){
  console.log(' <-- ', context.req.method, ' ', context.req.url);
  cb(null, context);
});

var resourceDir = __dirname + '/test/test_fixtures/resources';
server.staticRoute(__dirname + '/test/test_fixtures/static', function(){
  console.log("statically routed!");
});
server.routeDirectory(resourceDir, '/api', function(err){
  console.log("routed resources in " + resourceDir);

  server.route('/inside', 
                      { GET : function($){ 
                                console.log("hideyho");
                                $.res.end("muahahah!"); 
                              }
                      });

  if (err) {
    console.log("Routing error");
    console.log(err);
    return;
  }
  server.listen(function(err){
    if (err) {console.log(err);throw err;}
    console.log(server.router.routes);
    console.log('Server running on ' + server.port);
  });
});
