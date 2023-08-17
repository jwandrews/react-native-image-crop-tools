import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
    aspectRatio?: {
        width: number;
        height: number;
    };
    iosDimensionSwapEnabled?: boolean;
};
export type CropViewRef = {
    saveImage: (preserveTransparency?: boolean, quality?: number) => void;
    rotateImage: (clockwise?: boolean) => void;
};
export declare const CropViewForwarded: React.ForwardRefExoticComponent<Props & React.RefAttributes<CropViewRef>>;
export declare class CropView extends React.PureComponent<Props> {
    static defaultProps: {
        keepAspectRatio: boolean;
        iosDimensionSwapEnabled: boolean;
    };
    private viewRef;
    saveImage: (preserveTransparency?: boolean, quality?: number) => void;
    rotateImage: (clockwise?: boolean) => void;
    render(): JSX.Element;
}
export {};
