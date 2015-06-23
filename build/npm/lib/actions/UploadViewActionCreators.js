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
  updateUpload: function (uploaderId, id, data) {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPDATE_UPLOAD,
      data: data,
      id: id,
      uploaderId: uploaderId
    });
  }
};