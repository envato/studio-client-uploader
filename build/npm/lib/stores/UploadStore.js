"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

var UploadConstants = _interopRequire(require("../constants/UploadConstants"));

var assign = _interopRequire(require("object-assign"));

var EventEmitter = _interopRequire(require("eventemitter3"));

var _uploads = {};

function clearUploads(uploaderId) {
  _uploads[uploaderId] = {};
}

var UploadStore = assign({}, EventEmitter.prototype, {
  CHANGE_EVENT: "change",
  addUpload: function addUpload(uploaderId, file) {
    if (_uploads[uploaderId] == undefined) {
      _uploads[uploaderId] = {};
    }

    _uploads[uploaderId][file.id] = { file: file };
  },
  updateUpload: function updateUpload(uploaderId, id, data) {
    assign(_uploads[uploaderId][id], data);
  },
  getByUploaderId: function getByUploaderId(uploaderId) {
    return _uploads[uploaderId] || {};
  },
  getValidUploads: function getValidUploads(uploaderId) {
    var output = {};
    var uploadIds = Object.keys(_uploads[uploaderId] || {});

    for (var i = 0; i < uploadIds.length; i++) {
      var upload = _uploads[uploaderId][uploadIds[i]];
      if (upload.error == null && upload.file && upload.file.accepted == true) {
        output[uploadIds[i]] = upload;
      }
    }

    return output;
  },
  emitChange: function emitChange() {
    this.emit(this.CHANGE_EVENT);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case UploadConstants.ADD_UPLOAD:
      UploadStore.addUpload(action.uploaderId, action.file);
      UploadStore.emitChange();
      break;
    case UploadConstants.UPDATE_UPLOAD:
      UploadStore.updateUpload(action.uploaderId, action.id, action.data);
      UploadStore.emitChange();
      break;
    case UploadConstants.CLEAR_UPLOADS:
      clearUploads(action.uploaderId);
      UploadStore.emitChange();
      break;

    default:
    // Nothing to do here.
  }
});

module.exports = UploadStore;