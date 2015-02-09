// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('pages#main');
  this.match('date/:month/:day/:year', { controller: 'pages', action: 'main' });
  this.match('write/:hour/:user/:date', { controller: 'pages', action: 'write' });
  this.match('cancel/:hour/:user/:date', { controller: 'pages', action: 'cancel' });
}
