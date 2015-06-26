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
  addThumbnail: (uploaderId, id, thumbnail) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.ADD_THUMBNAIL,
      thumbnail: thumbnail,
      id: id,
      uploaderId: uploaderId
    });
  },
  progressUpdated: (uploaderId, id, progress) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.PROGRESS_UPDATED,
      progress: progress,
      id: id,
      uploaderId: uploaderId
    });
  },
  uploadError: (uploaderId, id, error) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPLOAD_ERROR,
      error: error,
      id: id,
      uploaderId: uploaderId
    });
  },
  uploadDone: (uploaderId, id) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.UPLOAD_DONE,
      id: id,
      uploaderId: uploaderId
    });
  },
  clearUploads: (uploaderId) => {
    AppDispatcher.handleViewAction({
      actionType: UploadConstants.CLEAR_UPLOADS,
      uploaderId: uploaderId
    });
  }
};
