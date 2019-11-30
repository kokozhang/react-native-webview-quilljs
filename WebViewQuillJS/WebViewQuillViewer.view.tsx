import React, { ReactElement } from "react";
import { StyleSheet, View, NativeSyntheticEvent, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import DebugMessageBox from "./DebugMessageBox";
import { WebViewError } from "react-native-webview/lib/WebViewTypes";

export interface Props {
  backgroundColor: string;
  containerStyle?: ViewStyle;
  debugMessages: string[];
  doShowDebugMessages: boolean;
  handleMessage: (data: string) => void;
  webviewContent: string;
  loadingIndicator: () => ReactElement;
  onError: (syntheticEvent: NativeSyntheticEvent<WebViewError>) => void;
  onLoadEnd: () => void;
  onLoadStart: () => void;
  setWebViewRef: (ref: WebView) => void;
  style?: ViewStyle;
}

const WebViewQuillJSView = ({
  backgroundColor,
  containerStyle,
  debugMessages,
  doShowDebugMessages,
  handleMessage,
  webviewContent,
  loadingIndicator,
  onError,
  onLoadEnd,
  onLoadStart,
  setWebViewRef,
  style
}: Props) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: backgroundColor
      }}
    >
      {webviewContent && (
        <WebView
          allowFileAccess={true}
          containerStyle={containerStyle}
          ref={component => {
            setWebViewRef(component);
          }}
          javaScriptEnabled={true}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onMessage={event => {
            if (event && event.nativeEvent && event.nativeEvent.data) {
              handleMessage(event.nativeEvent.data);
            }
          }}
          onError={onError}
          originWhitelist={["*"]}
          /*  renderLoading={loadingIndicator || null} */
          domStorageEnabled={true}
          useWebKit={true}
          startInLoadingState={true}
          source={{
            html: webviewContent
          }}
          style={style}
        />
      )}
      <DebugMessageBox
        debugMessages={debugMessages}
        doShowDebugMessages={doShowDebugMessages}
      />
    </View>
  );
};

export default WebViewQuillJSView;