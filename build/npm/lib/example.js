"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var _index = require("./index");

var Uploader = _index.Uploader;
var AssetPreview = _index.AssetPreview;
var UploaderPreview = _index.UploaderPreview;
var UploadStore = _index.UploadStore;
var UploadActionCreators = _index.UploadActionCreators;

var Application = React.createClass({
  displayName: "Application",

  getInitialState: function getInitialState() {
    return { uploads: UploadStore.getByUploaderId("test-uploader") };
  },
  componentDidMount: function componentDidMount() {
    UploadStore.addListener("change", this._onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    UploadStore.removeListener("change", this._onChange);
  },
  _onChange: function _onChange() {
    this.setState(this.getInitialState());
  },
  _onUpload: function _onUpload(asset) {
    console.log(asset);
  },
  _clear: function _clear() {
    UploadActionCreators.clearUploads("test-uploader");
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      "Uploader:",
      React.createElement(
        Uploader,
        { id: "test-uploader", minWidth: 1000, assetType: "message-asset", assetServiceUrl: "http://studio-asset-api.lancerdev.com", uploadUrl: "https://api2.transloadit.com/assemblies", onUpload: this._onUpload },
        React.createElement(
          "div",
          { className: "button button--muted" },
          "Upload a file"
        )
      ),
      React.createElement(UploaderPreview, { uploads: this.state.uploads, previewComponent: AssetPreview }),
      React.createElement(
        "button",
        { onClick: this._clear },
        "Clear Uploads!"
      )
    );
  }
});

React.render(React.createElement(Application, null), document.getElementById("app"));