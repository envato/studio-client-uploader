"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var UploadConstants = _interopRequire(require("../constants/UploadConstants"));

var assign = _interopRequire(require("object-assign"));

var EventEmitter = _interopRequire(require("eventemitter3"));

var _uploads = {};

var UploadStore = assign({}, EventEmitter.prototype, {
  CHANGE_EVENT: "change",
  addUpload: function addUpload(file) {
    _uploads[file.id] = { file: file };
  },
  updateUpload: function updateUpload(id, data) {
    assign(_uploads[id], data);
  },
  getAll: function getAll() {
    return _uploads;
  },
  getValidUploads: function getValidUploads() {
    var output = {};
    var uploadIds = Object.keys(_uploads);

    for (var i = 0; i < uploadIds.length; i++) {
      var upload = _uploads[uploadIds[i]];
      if (upload.error == null && upload.file && upload.file.accepted == true) {
        output[uploadIds[i]] = upload;
      }
    }

    return output;
  },
  clear: function clear() {
    _uploads = {};
  },
  emitChange: function emitChange() {
    this.emit(this.CHANGE_EVENT);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case UploadConstants.ADD_UPLOAD:
      UploadStore.addUpload(action.file);
      UploadStore.emitChange();
      break;
    case UploadConstants.UPDATE_UPLOAD:
      UploadStore.updateUpload(action.id, action.data);
      UploadStore.emitChange();
      break;

    default:
    // Nothing to do here.
  }
});

module.exports = UploadStore;