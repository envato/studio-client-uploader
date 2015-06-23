"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var UploadStore = _interopRequire(require("../stores/UploadStore"));

var AssetPreview = _interopRequire(require("./AssetPreview"));

var UploaderPreview = React.createClass({
  displayName: "UploaderPreview",

  getInitialState: function getInitialState() {
    return { uploads: UploadStore.getByUploaderId(this.props.uploaderId) };
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
  render: function render() {
    var assetPreviews = [];
    var uploadIds = Object.keys(this.state.uploads);
    for (var i = 0; i < uploadIds.length; i++) {
      assetPreviews.push(React.createElement(this.props.previewComponent, { asset: this.state.uploads[uploadIds[i]], key: uploadIds[i] }));
    }

    return React.createElement(
      "div",
      null,
      assetPreviews
    );
  }
});

module.exports = UploaderPreview;