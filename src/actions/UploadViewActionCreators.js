import UploadConstants from '../constants/UploadConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  addUpload: (uploaderId, file) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.ADD_UPLOAD,
      file: file,
      uploaderId: uploaderId
    });
  },
  clearUploads: (uploaderId) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.CLEAR_UPLOADS,
      uploaderId: uploaderId
    });
  },
  updateUpload: (uploaderId, id, data) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPDATE_UPLOAD,
      data: data,
      id: id,
      uploaderId: uploaderId
    });
  }
};
