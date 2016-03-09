import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from '../vendor/dropzone';
import StudioAssetService from 'studio-asset-service-client-js';
import UploadActionCreators from '../actions/UploadViewActionCreators';
import UploadStore from '../stores/UploadStore';
import AssetPreview from '../components/AssetPreview';
import uuid from 'node-uuid';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = this._getInitialState(props);
  }

  componentDidMount() {
    this.assetServiceClient = new StudioAssetService(this.props.assetServiceUrl);
    UploadStore.addListener('change', this._onChange.bind(this));

    var self = this;

    this.dropzone = new Dropzone(ReactDOM.findDOMNode(this.refs.uploader), {
      url: this.props.uploadUrl,
      accept: this._accept.bind(this),
      previewsContainer: false,
      maxFiles: this.props.maxFiles,
      acceptedFiles: this.props.acceptedFiles
    });

    this.dropzone.on('sending', function(file, xhr, formData) {
      formData.append('signature', file.signature);
      formData.append('params', file.params);
    });

    this.dropzone.on('thumbnail', function(file, dataUrl) {
      if (self._valid(file)) {
        file.acceptDimensions();
      } else {
        file.rejectDimensions();
      }

      UploadActionCreators.addThumbnail(self.props.id, file.id, dataUrl);
    });

    this.dropzone.on('uploadprogress', function(file, progress) {
      UploadActionCreators.progressUpdated(self.props.id, file.id, Math.min(progress,99));
    });

    this.dropzone.on('success', function(file) {
      UploadActionCreators.uploadDone(self.props.id, file.id);
      self.props.onUpload(file.assetId);
    });
  }

  componentWillUnmount() {
    UploadActionCreators.clearUploads(this.props.id);
    UploadStore.removeListener('change', this._onChange);
    this.dropzone.destroy();
    this.dropzone = null;
  }

  _getInitialState(props) {
    return {
      validUploads: UploadStore.getValidUploads(props.id)
    };
  }

  _onChange() {
    this.setState(this._getInitialState(this.props));
  }

  _valid(file) {
    if (this.props.minWidth != null) {
      if (file.width >= this.props.minWidth) {
        return true;
      } else {
        UploadActionCreators.uploadError(this.props.id, file.id, "Invalid Dimensions. Minimum width is " + this.props.minWidth + "px");
        return false;
      }
    } else {
      return true;
    }
  }

  _accept(file, done) {
    file.id = uuid.v4();
    UploadActionCreators.addUpload(this.props.id, file);

    var self = this;

    file.acceptDimensions = function() {
      self.assetServiceClient.newAsset(self.props.assetType, function(err, data) {
        file.signature = data.transloadit.signature;
        file.params    = data.transloadit.params;
        file.assetId   = data.asset.id;
        done();
      });
    };

    file.rejectDimensions = function() {
      done("Invalid dimension.");
    };

    if (!file.type.match(/image.*/)) {
      file.acceptDimensions();
    }
  }

  _disabled() {
    return Object.keys(this.state.validUploads).length >= this.props.maxFiles;
  }

  _onClick(e) {
    this.refs.uploader.click();
  }

  render() {
    let button = null;
    if (!this._disabled()) {
      button = <div ref="uploader" className="dz-clickable" onClick={this._onClick.bind(this)}>{this.props.children}</div>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
};

export default Uploader;
