export type WebViewOptions = {
    androidLayerType: 'none' | 'software' | 'hardware';
    scalesPageToFit: boolean;
    domStorageEnabled: boolean;
    scrollEnabled: boolean;
    setBuiltInZoomControls: boolean;
    bounces: boolean;
    injectedJavaScript: string;
    style: string;
};