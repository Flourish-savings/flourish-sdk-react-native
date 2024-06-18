export type LayerType = 'none' | 'software' | 'hardware';

export type WebViewOptions = {
    androidLayerType: 'none' | 'software' | 'hardware';
    scalesPageToFit: boolean;
    javaScriptEnabled: boolean;
    domStorageEnabled: boolean;
    scrollEnabled: boolean;
    setBuiltInZoomControls: boolean;
    bounces: boolean;
    style: string;
};