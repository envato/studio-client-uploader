"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;

var AssetPreview = (function (_Component) {
  function AssetPreview() {
    _classCallCheck(this, AssetPreview);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(AssetPreview, _Component);

  _createClass(AssetPreview, {
    _progress: {
      value: function _progress() {
        if (this.props.asset.progress < 100) {
          return Math.floor(this.props.asset.progress) + "%";
        }
      }
    },
    render: {
      value: function render() {
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
    }
  });

  return AssetPreview;
})(Component);

module.exports = AssetPreview;