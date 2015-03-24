import UploadConstants from '../constants/UploadConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  addUpload: (file) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.ADD_UPLOAD,
      file: file
    });
  },
  updateUpload: (id, data) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPDATE_UPLOAD,
      data: data,
      id: id
    });
  }
};
