"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var UploadConstants = _interopRequire(require("../constants/UploadConstants"));

var AppDispatcher = _interopRequire(require("../dispatcher/AppDispatcher"));

module.exports = {
  addUpload: function (uploaderId, file) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.ADD_UPLOAD,
      file: file,
      uploaderId: uploaderId
    });
  },
  addThumbnail: function (uploaderId, id, thumbnail) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.ADD_THUMBNAIL,
      thumbnail: thumbnail,
      id: id,
      uploaderId: uploaderId
    });
  },
  progressUpdated: function (uploaderId, id, progress) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.PROGRESS_UPDATED,
      progress: progress,
      id: id,
      uploaderId: uploaderId
    });
  },
  uploadError: function (uploaderId, id, error) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPLOAD_ERROR,
      error: error,
      id: id,
      uploaderId: uploaderId
    });
  },
  uploadDone: function (uploaderId, id) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPLOAD_DONE,
      id: id,
      uploaderId: uploaderId
    });
  },
  clearUploads: function (uploaderId) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.CLEAR_UPLOADS,
      uploaderId: uploaderId
    });
  }
};