import AppDispatcher from '../dispatcher/AppDispatcher';
import UploadConstants from '../constants/UploadConstants';
import assign from 'object-assign';
import EventEmitter from 'eventemitter3';

var _uploads = {};

const states = {
  QUEUED: 'QUEUED',
  IN_PROGRESS: 'IN_PROGRESS',

  // TERMINAL
  ERROR: 'ERROR',
  DONE: 'DONE'
};

function clearUploads(uploaderId) {
  _uploads[uploaderId] = {};
}

var UploadStore = assign({}, EventEmitter.prototype, {
  CHANGE_EVENT: 'change',
  addUpload: function(uploaderId, file) {
    if (_uploads[uploaderId] == undefined) {
      _uploads[uploaderId] = {};
    }

    _uploads[uploaderId][file.id] = { file: file, status: states.QUEUED };
  },
  updateUpload: function(uploaderId, id, data) {
    assign(_uploads[uploaderId][id], data);
  },
  getByUploaderId: function(uploaderId) {
    return _uploads[uploaderId] || {};
  },
  getValidUploads: function(uploaderId) {
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
  uploadsDone: function(uploaderId) {
    var uploadIds = Object.keys(_uploads[uploaderId] || {});

    return uploadIds.every(function(uploadId) {
      var status = _uploads[uploaderId][uploadId].status;
      return status == states.ERROR || status == states.DONE;
    });
  },
  emitChange: function() {
    this.emit(this.CHANGE_EVENT);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case UploadConstants.ADD_UPLOAD:
      UploadStore.addUpload(action.uploaderId, action.file);
      UploadStore.emitChange();
      break;
    case UploadConstants.ADD_THUMBNAIL:
      UploadStore.updateUpload(action.uploaderId, action.id, { thumbnail: action.thumbnail });
      UploadStore.emitChange();
      break;
    case UploadConstants.PROGRESS_UPDATED:
      UploadStore.updateUpload(action.uploaderId, action.id, { progress: action.progress, status: states.IN_PROGRESS });
      UploadStore.emitChange();
      break;
    case UploadConstants.UPLOAD_DONE:
      UploadStore.updateUpload(action.uploaderId, action.id, { progress: 100, status: states.DONE });
      UploadStore.emitChange();
      break;
    case UploadConstants.UPLOAD_ERROR:
      UploadStore.updateUpload(action.uploaderId, action.id, { error: action.error, status: states.ERROR });
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

export default UploadStore;
