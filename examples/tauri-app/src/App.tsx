import { useBoolean, useMount, useReactive } from "ahooks";
import {
  getScreenshotableWindows,
  getScreenshotableMonitors,
  ScreenshotableWindow,
  ScreenshotableMonitor,
  getWindowScreenshot,
  getMonitorScreenshot,
  getMonitorScreenshotBase64url,
} from "tauri-plugin-screenshots-api";
import { Button, Divider, List, Image, Spin, message } from "antd";
import { convertFileSrc } from "@tauri-apps/api/core";

interface State {
  screenshotableWindows: ScreenshotableWindow[];
  screenshotableMonitors: ScreenshotableMonitor[];
  windowScreenshots: Record<number, string>;
  monitorScreenshots: Record<number, string>;
}

const App = () => {
  const state = useReactive<State>({
    screenshotableWindows: [],
    screenshotableMonitors: [],
    windowScreenshots: {},
    monitorScreenshots: {},
  });

  const [loading, { toggle }] = useBoolean();

  useMount(async () => {
    state.screenshotableWindows = await getScreenshotableWindows();

    state.screenshotableMonitors = await getScreenshotableMonitors();
  });

  return (
    <>
      <Spin fullscreen spinning={loading} />

      <Divider orientation="left">Screenshotable Windows</Divider>

      <List
        bordered
        dataSource={state.screenshotableWindows}
        renderItem={(item) => {
          const { id, name } = item;

          return (
            <List.Item
              key={id}
              actions={[
                <Button
                  onClick={async () => {
                    try {
                      toggle();

                      const url = await getWindowScreenshot(id);

                      state.windowScreenshots[id] = convertFileSrc(url);
                    } catch (error) {
                      message.error(String(error));
                    } finally {
                      toggle();
                    }
                  }}
                >
                  Screenshot
                </Button>,
                <Image
                  width={50}
                  height={50}
                  src={state.windowScreenshots[id]}
                />,
              ]}
            >
              {name}
            </List.Item>
          );
        }}
      />

      <Divider orientation="left">Screenshotable Monitors</Divider>

      <List
        bordered
        dataSource={state.screenshotableMonitors}
        renderItem={(item) => {
          const { id, name } = item;

          return (
            <List.Item
              key={id}
              actions={[
                <Button
                  onClick={async () => {
                    try {
                      toggle();

                      // const url = await getMonitorScreenshot(id);
                      // state.monitorScreenshots[id] = convertFileSrc(url);

                      const base64url = await getMonitorScreenshotBase64url(id);
                      state.monitorScreenshots[id] = base64url;
                    } catch (error) {
                      message.error(String(error));
                    } finally {
                      toggle();
                    }
                  }}
                >
                  Screenshot
                </Button>,
                <Image
                  width={50}
                  height={50}
                  src={state.monitorScreenshots[id]}
                />,
              ]}
            >
              {name}
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default App;
