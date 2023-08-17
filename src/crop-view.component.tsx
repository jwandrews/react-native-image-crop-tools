import React, { Component, createRef, forwardRef, useRef } from 'react';
import {
  findNodeHandle,
  HostComponent,
  NativeSyntheticEvent,
  requireNativeComponent,
  StyleProp,
  UIManager,
  ViewStyle,
} from 'react-native';

interface CropViewProps {
  cropAspectRatio?: { width: number; height: number };
  onImageSaved: (event: NativeSyntheticEvent<Response>) => void;
}
const RCTCropView = requireNativeComponent<CropViewProps>('CropView');

export type Response = {
  uri: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

type Props = {
  sourceUrl: string;
  style?: StyleProp<ViewStyle>;
  onImageCrop?: (res: Response) => void;
  keepAspectRatio?: boolean;
  aspectRatio?: { width: number; height: number };
  iosDimensionSwapEnabled?: boolean;
};

export type CropViewRef = {
  saveImage: (preserveTransparency?: boolean, quality?: number) => void;
  rotateImage: (clockwise?: boolean) => void;
};

export const CropViewForwarded = forwardRef<CropViewRef, Props>((props, ref) => {
  const viewRef = useRef<any>(null);
  const { onImageCrop, aspectRatio, ...rest } = props;

  React.useImperativeHandle(
    ref,
    () => ({
      saveImage(preserveTransparency, quality) {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(viewRef.current),
          UIManager.getViewManagerConfig('CropView').Commands.saveImage,
          [preserveTransparency, quality],
        );
      },
      rotateImage(clockwise) {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(viewRef.current),
          UIManager.getViewManagerConfig('CropView').Commands.rotateImage,
          [clockwise],
        );
      },
    }),
    [],
  );

  return (
    <RCTCropView
      ref={viewRef}
      cropAspectRatio={aspectRatio}
      onImageSaved={(event: NativeSyntheticEvent<Response>) => {
        onImageCrop!(event.nativeEvent);
      }}
      {...rest}
    />
  );
});

CropViewForwarded.defaultProps = {
  keepAspectRatio: false,
  iosDimensionSwapEnabled: false,
};

export class CropView extends React.PureComponent<Props> {
  public static defaultProps = {
    keepAspectRatio: false,
    iosDimensionSwapEnabled: false,
  };

  private viewRef = createRef<any>();

  public saveImage = (preserveTransparency: boolean = true, quality: number = 90) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.viewRef.current!),
      UIManager.getViewManagerConfig('CropView').Commands.saveImage,
      [preserveTransparency, quality],
    );
  };

  public rotateImage = (clockwise: boolean = true) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.viewRef.current!),
      UIManager.getViewManagerConfig('CropView').Commands.rotateImage,
      [clockwise],
    );
  };

  public render() {
    const { onImageCrop, aspectRatio, ...rest } = this.props;

    return (
      <RCTCropView
        ref={this.viewRef}
        cropAspectRatio={aspectRatio}
        onImageSaved={(event: NativeSyntheticEvent<Response>) => {
          onImageCrop!(event.nativeEvent);
        }}
        {...rest}
      />
    );
  }
}
