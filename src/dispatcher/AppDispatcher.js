import Flux from 'flux';
import assign from 'object-assign';

var Dispatcher = Flux.Dispatcher;

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

export default AppDispatcher;
