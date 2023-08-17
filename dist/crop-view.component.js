import React, { createRef, forwardRef, useRef } from 'react';
import { findNodeHandle, requireNativeComponent, UIManager, } from 'react-native';
const RCTCropView = requireNativeComponent('CropView');
export const CropViewForwarded = forwardRef((props, ref) => {
    const viewRef = useRef();
    const { onImageCrop, aspectRatio, ...rest } = props;
    React.useImperativeHandle(ref, () => ({
        saveImage(preserveTransparency, quality) {
            UIManager.dispatchViewManagerCommand(findNodeHandle(viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.saveImage, [preserveTransparency, quality]);
        },
        rotateImage(clockwise) {
            UIManager.dispatchViewManagerCommand(findNodeHandle(viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.rotateImage, [clockwise]);
        },
    }), []);
    return (React.createElement(RCTCropView, { ref: viewRef, cropAspectRatio: aspectRatio, onImageSaved: (event) => {
            onImageCrop(event.nativeEvent);
        }, ...rest }));
});
CropViewForwarded.defaultProps = {
    keepAspectRatio: false,
    iosDimensionSwapEnabled: false,
};
export class CropView extends React.PureComponent {
    static defaultProps = {
        keepAspectRatio: false,
        iosDimensionSwapEnabled: false,
    };
    viewRef = createRef();
    saveImage = (preserveTransparency = true, quality = 90) => {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this.viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.saveImage, [preserveTransparency, quality]);
    };
    rotateImage = (clockwise = true) => {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this.viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.rotateImage, [clockwise]);
    };
    render() {
        const { onImageCrop, aspectRatio, ...rest } = this.props;
        return (React.createElement(RCTCropView, { ref: this.viewRef, cropAspectRatio: aspectRatio, onImageSaved: (event) => {
                onImageCrop(event.nativeEvent);
            }, ...rest }));
    }
}
