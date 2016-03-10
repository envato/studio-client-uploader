"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;

var UploaderPreview = (function (_Component) {
  function UploaderPreview() {
    _classCallCheck(this, UploaderPreview);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(UploaderPreview, _Component);

  _createClass(UploaderPreview, {
    render: {
      value: function render() {
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
    }
  });

  return UploaderPreview;
})(Component);

;

module.exports = UploaderPreview;