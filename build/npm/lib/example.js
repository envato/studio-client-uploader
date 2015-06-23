"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var _index = require("./index");

var Uploader = _index.Uploader;
var AssetPreview = _index.AssetPreview;
var UploaderPreview = _index.UploaderPreview;

var Application = React.createClass({
  displayName: "Application",

  _onUpload: function _onUpload(asset) {
    console.log(asset);
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      "Uploader:",
      React.createElement(
        Uploader,
        { id: "test-uploader", assetType: "message-asset", assetServiceUrl: "http://studio-asset-api.lancerdev.com", uploadUrl: "https://api2.transloadit.com/assemblies", onUpload: this._onUpload },
        React.createElement(
          "div",
          { className: "button button--muted" },
          "Upload a file"
        )
      ),
      React.createElement(UploaderPreview, { uploaderId: "test-uploader", previewComponent: AssetPreview })
    );
  }
});

React.render(React.createElement(Application, null), document.getElementById("app"));