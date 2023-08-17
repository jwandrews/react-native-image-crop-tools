"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropViewLegacy = exports.CropView = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const RCTCropView = (0, react_native_1.requireNativeComponent)('CropView');
exports.CropView = (0, react_1.forwardRef)((props, ref) => {
    const viewRef = (0, react_1.useRef)(null);
    const { onImageCrop, aspectRatio, ...rest } = props;
    react_1.default.useImperativeHandle(ref, () => ({
        saveImage(preserveTransparency = true, quality = 0.9) {
            react_native_1.UIManager.dispatchViewManagerCommand((0, react_native_1.findNodeHandle)(viewRef.current), react_native_1.UIManager.getViewManagerConfig('CropView').Commands.saveImage, [preserveTransparency, quality]);
        },
        rotateImage(clockwise = true) {
            react_native_1.UIManager.dispatchViewManagerCommand((0, react_native_1.findNodeHandle)(viewRef.current), react_native_1.UIManager.getViewManagerConfig('CropView').Commands.rotateImage, [clockwise]);
        },
    }), []);
    return (<RCTCropView ref={viewRef} cropAspectRatio={aspectRatio} onImageSaved={(event) => {
            onImageCrop(event.nativeEvent);
        }} {...rest}/>);
});
exports.CropView.defaultProps = {
    keepAspectRatio: false,
    iosDimensionSwapEnabled: false,
};
class CropViewLegacy extends react_1.default.PureComponent {
    static defaultProps = {
        keepAspectRatio: false,
        iosDimensionSwapEnabled: false,
    };
    viewRef = (0, react_1.createRef)();
    saveImage = (preserveTransparency = true, quality = 90) => {
        react_native_1.UIManager.dispatchViewManagerCommand((0, react_native_1.findNodeHandle)(this.viewRef.current), react_native_1.UIManager.getViewManagerConfig('CropView').Commands.saveImage, [preserveTransparency, quality]);
    };
    rotateImage = (clockwise = true) => {
        react_native_1.UIManager.dispatchViewManagerCommand((0, react_native_1.findNodeHandle)(this.viewRef.current), react_native_1.UIManager.getViewManagerConfig('CropView').Commands.rotateImage, [clockwise]);
    };
    render() {
        const { onImageCrop, aspectRatio, ...rest } = this.props;
        return (<RCTCropView ref={this.viewRef} cropAspectRatio={aspectRatio} onImageSaved={(event) => {
                onImageCrop(event.nativeEvent);
            }} {...rest}/>);
    }
}
exports.CropViewLegacy = CropViewLegacy;
