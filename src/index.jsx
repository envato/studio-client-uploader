import React from 'react';
import Dropzone from './vendor/dropzone';
import StudioAssetService from 'studio-asset-service-client-js';
import UploadActionCreators from './actions/UploadViewActionCreators';
import UploadStore from './stores/UploadStore';
import AssetPreview from './components/AssetPreview';
import uuid from 'node-uuid';

var assetServiceClient = new StudioAssetService('http://studio-asset-api.lancerdev.com');

var getUploaderState = function() {
  return {
    uploads: UploadStore.getAll(),
    validUploads: UploadStore.getValidUploads()
  };
};

var Uploader = React.createClass({
  getInitialState: function() {
    return getUploaderState();
  },
  _valid: function(file) {
    if (this.props.minWidth != null) {
      if (file.width >= this.props.minWidth) {
        return true;
      } else {
        UploadActionCreators.updateUpload(file.id, { error: "Invalid Dimensions. Minimum width is " + this.props.minWidth });
        return false;
      }
    } else {
      return true;
    }
  },
  _accept: function(file, done) {
    file.id = uuid.v4();
    UploadActionCreators.addUpload(file);

    file.acceptDimensions = function() {
      assetServiceClient.newAsset(function(err, data) {
        file.signature = data.transloadit.signature;
        file.params    = data.transloadit.params;
        file.assetId   = data.asset.id;
        done();
      });
    };

    file.rejectDimensions = function() {
      done("Invalid dimension.");
    };
  },
  componentDidMount: function() {
    UploadStore.addListener('change', this._onChange);

    this.dropzone = new Dropzone(this.refs.uploader.getDOMNode(), {
      url: "https://api2.transloadit.com/assemblies",
      accept: this._accept,
      previewsContainer: false,
      maxFiles: this.props.maxFiles,
      acceptedFiles: "image/*"
    });

    // this.dropzone.on('sending', function(file, xhr, formData) {
    //   formData.append('signature', file.signature);
    //   formData.append('params', file.params);
    // });
    //
    // this.dropzone.on('thumbnail', function(file, dataUrl) {
    //   if (this._valid(file)) {
    //     file.acceptDimensions();
    //   } else {
    //     file.rejectDimensions();
    //   }
    //
    //   UploadActionCreators.updateUpload(file.id, { thumbnail: dataUrl });
    // });
    //
    // this.dropzone.on('uploadprogress', function(file, progress) {
    //   UploadActionCreators.updateUpload(file.id, { progress: Math.min(progress,99) });
    // });
    //
    // this.dropzone.on('success', function(file) {
    //   UploadActionCreators.updateUpload(file.id, { progress: 100 });
    //   this.props.onUpload(file.assetId);
    // });
  },
  componentWillUnmount: function() {
    UploadStore.removeListener('change', this._onChange);
    this.dropzone.destroy();
    this.dropzone = null;
  },
  _onChange: function() {
    this.setState(getUploaderState());
  },
  _disabled: function() {
    return Object.keys(this.state.validUploads).length >= this.props.maxFiles;
  },
   render: function() {
     var assetPreviews = [];
     var uploadIds = Object.keys(this.state.uploads);
     for (var i = 0; i < uploadIds.length; i++) {
       assetPreviews.push(<AssetPreview asset={this.state.uploads[uploadIds[i]]} key={uploadIds[i]} />);
     }

     if (!this._disabled()) {
       var button = <div id="asset-upload-button" ref="uploader" className="button button--muted stand-alone-button dz-clickable">Upload a file</div>;
     }

    return (
      <div className="asset-uploader">
        {button}
        {assetPreviews}
      </div>
    );
  }
});

export default Uploader;
