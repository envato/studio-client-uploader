"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var AssetPreview = React.createClass({
  displayName: "AssetPreview",

  _progress: function _progress() {
    if (this.props.asset.progress < 100) {
      return Math.floor(this.props.asset.progress) + "%";
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "asset-uploader__previews__item" },
      React.createElement("span", { className: "asset-uploader__previews__item__icon" }),
      React.createElement("span", { className: "asset-uploader__previews__item__filename" }),
      React.createElement(
        "div",
        { className: "dz-progress asset-uploader__previews__item__mask" },
        React.createElement("span", { className: "asset-uploader__previews__item__mask__bar dz-upload", style: { width: this._progress() } })
      ),
      React.createElement(
        "span",
        null,
        this._progress()
      ),
      React.createElement("img", { className: "asset-uploader__previews__item__image", src: this.props.asset.thumbnail }),
      React.createElement(
        "span",
        null,
        this.props.asset.error
      )
    );
  }
});

module.exports = AssetPreview;