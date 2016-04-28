"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;

var ReactDOM = _interopRequire(require("react-dom"));

var Dropzone = _interopRequire(require("../vendor/dropzone"));

var StudioAssetService = _interopRequire(require("studio-asset-service-client-js"));

var UploadActionCreators = _interopRequire(require("../actions/UploadViewActionCreators"));

var UploadStore = _interopRequire(require("../stores/UploadStore"));

var AssetPreview = _interopRequire(require("../components/AssetPreview"));

var uuid = _interopRequire(require("node-uuid"));

var Uploader = (function (_Component) {
  function Uploader(props) {
    _classCallCheck(this, Uploader);

    _get(Object.getPrototypeOf(Uploader.prototype), "constructor", this).call(this, props);
    this.state = this._getInitialState(props);
  }

  _inherits(Uploader, _Component);

  _createClass(Uploader, {
    componentDidMount: {
      value: function componentDidMount() {
        this.assetServiceClient = new StudioAssetService(this.props.assetServiceUrl);
        UploadStore.addListener("change", this._onChange.bind(this));

        var self = this;

        this.dropzone = new Dropzone(ReactDOM.findDOMNode(this.refs.uploader), {
          url: this.props.uploadUrl,
          maxFilesize: 512,
          accept: this._accept.bind(this),
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

          UploadActionCreators.addThumbnail(self.props.id, file.id, dataUrl);
        });

        this.dropzone.on("uploadprogress", function (file, progress) {
          UploadActionCreators.progressUpdated(self.props.id, file.id, Math.min(progress, 99));
        });

        this.dropzone.on("success", function (file) {
          UploadActionCreators.uploadDone(self.props.id, file.id);
          self.props.onUpload(file.assetId);
        });
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        UploadActionCreators.clearUploads(this.props.id);
        UploadStore.removeListener("change", this._onChange);
        this.dropzone.destroy();
        this.dropzone = null;
      }
    },
    _getInitialState: {
      value: function _getInitialState(props) {
        return {
          validUploads: UploadStore.getValidUploads(props.id)
        };
      }
    },
    _onChange: {
      value: function _onChange() {
        this.setState(this._getInitialState(this.props));
      }
    },
    _valid: {
      value: function _valid(file) {
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
    },
    _accept: {
      value: function _accept(file, done) {
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
      }
    },
    _disabled: {
      value: function _disabled() {
        return Object.keys(this.state.validUploads).length >= this.props.maxFiles;
      }
    },
    _onClick: {
      value: function _onClick(e) {
        this.refs.uploader.click();
      }
    },
    render: {
      value: function render() {
        var button = null;
        if (!this._disabled()) {
          button = React.createElement(
            "div",
            { ref: "uploader", className: "dz-clickable", onClick: this._onClick.bind(this) },
            this.props.children
          );
        }

        return React.createElement(
          "div",
          null,
          button
        );
      }
    }
  });

  return Uploader;
})(Component);

;

module.exports = Uploader;