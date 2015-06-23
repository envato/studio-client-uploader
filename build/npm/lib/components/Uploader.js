"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Dropzone = _interopRequire(require("../vendor/dropzone"));

var StudioAssetService = _interopRequire(require("studio-asset-service-client-js"));

var UploadActionCreators = _interopRequire(require("../actions/UploadViewActionCreators"));

var UploadStore = _interopRequire(require("../stores/UploadStore"));

var AssetPreview = _interopRequire(require("../components/AssetPreview"));

var uuid = _interopRequire(require("node-uuid"));

var Uploader = React.createClass({
  displayName: "Uploader",

  getInitialState: function getInitialState() {
    return { validUploads: UploadStore.getValidUploads(this.props.id) };
  },
  _valid: function _valid(file) {
    if (this.props.minWidth != null) {
      if (file.width >= this.props.minWidth) {
        return true;
      } else {
        UploadActionCreators.updateUpload(this.props.id, file.id, { error: "Invalid Dimensions. Minimum width is " + this.props.minWidth });
        return false;
      }
    } else {
      return true;
    }
  },
  _accept: function _accept(file, done) {
    file.id = uuid.v4();
    UploadActionCreators.addUpload(this.props.id, file);

    var self = this;

    file.acceptDimensions = function () {
      self.assetServiceClient.newAsset(self.props.assetType, function (err, data) {
        file.signature = data.transloadit.signature;
        file.params = data.transloadit.params;
        file.assetId = data.asset.id;
        done();
      });
    };

    file.rejectDimensions = function () {
      done("Invalid dimension.");
    };

    if (!file.type.match(/image.*/)) {
      file.acceptDimensions();
    }
  },
  componentDidMount: function componentDidMount() {
    this.assetServiceClient = new StudioAssetService(this.props.assetServiceUrl);
    UploadStore.addListener("change", this._onChange);

    var self = this;

    this.dropzone = new Dropzone(this.refs.uploader.getDOMNode(), {
      url: this.props.uploadUrl,
      accept: this._accept,
      previewsContainer: false,
      maxFiles: this.props.maxFiles,
      acceptedFiles: this.props.acceptedFiles
    });

    this.dropzone.on("sending", function (file, xhr, formData) {
      formData.append("signature", file.signature);
      formData.append("params", file.params);
    });

    this.dropzone.on("thumbnail", function (file, dataUrl) {
      if (self._valid(file)) {
        file.acceptDimensions();
      } else {
        file.rejectDimensions();
      }

      UploadActionCreators.updateUpload(self.props.id, file.id, { thumbnail: dataUrl });
    });

    this.dropzone.on("uploadprogress", function (file, progress) {
      UploadActionCreators.updateUpload(self.props.id, file.id, { progress: Math.min(progress, 99) });
    });

    this.dropzone.on("success", function (file) {
      UploadActionCreators.updateUpload(self.props.id, file.id, { progress: 100 });
      self.props.onUpload(file.assetId);
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    UploadStore.clear();
    UploadStore.removeListener("change", this._onChange);
    this.dropzone.destroy();
    this.dropzone = null;
  },
  _onChange: function _onChange() {
    this.setState(this.getInitialState());
  },
  _disabled: function _disabled() {
    return Object.keys(this.state.validUploads).length >= this.props.maxFiles;
  },
  _onClick: function _onClick(e) {
    React.findDOMNode(this.refs.uploader).click();
  },
  render: function render() {
    if (!this._disabled()) {
      var button = React.createElement(
        "div",
        { ref: "uploader", className: "dz-clickable", onClick: this._onClick },
        this.props.children
      );
    }

    return React.createElement(
      "div",
      null,
      button
    );
  }
});

module.exports = Uploader;