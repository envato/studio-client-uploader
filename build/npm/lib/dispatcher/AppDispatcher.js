"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Flux = _interopRequire(require("flux"));

var assign = _interopRequire(require("object-assign"));

var Dispatcher = Flux.Dispatcher;

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function handleViewAction(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }
});

module.exports = AppDispatcher;