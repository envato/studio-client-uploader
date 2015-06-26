"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var UploaderPreview = React.createClass({
  displayName: "UploaderPreview",

  render: function render() {
    var assetPreviews = [];
    var uploadIds = Object.keys(this.props.uploads);
    for (var i = 0; i < uploadIds.length; i++) {
      assetPreviews.push(React.createElement(this.props.previewComponent, { asset: this.props.uploads[uploadIds[i]], key: uploadIds[i] }));
    }

    return React.createElement(
      "div",
      null,
      assetPreviews
    );
  }
});

module.exports = UploaderPreview;