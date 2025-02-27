import { invoke } from "@tauri-apps/api/core";

export interface ScreenshotableWindow {
  id: number;
  name: string;
}

export interface ScreenshotableMonitor {
  id: number;
  name: string;
}

export const COMMAND = {
  GET_SCREENSHOTABLE_WINDOWS: "plugin:screenshots|get_screenshotable_windows",
  GET_SCREENSHOTABLE_MONITORS: "plugin:screenshots|get_screenshotable_monitors",
  GET_WINDOW_SCREENSHOT: "plugin:screenshots|get_window_screenshot",
  GET_MONITOR_SCREENSHOT: "plugin:screenshots|get_monitor_screenshot",
};

/**
 * Get all windows that can take screenshots.
 *
 * @example
 * import { getScreenshotableWindows } from "tauri-plugin-screenshots-api"
 *
 * const windows = await getScreenshotableWindows()
 * console.log(windows)
 */
export const getScreenshotableWindows = () => {
  return invoke<ScreenshotableWindow[]>(COMMAND.GET_SCREENSHOTABLE_WINDOWS);
};

/**
 * Get all monitors that can take screenshots.
 *
 * @example
 * import { getScreenshotableMonitors } from "tauri-plugin-screenshots-api"
 *
 * const monitors = await getScreenshotableMonitors()
 * console.log(monitors)
 */
export const getScreenshotableMonitors = () => {
  return invoke<ScreenshotableMonitor[]>(COMMAND.GET_SCREENSHOTABLE_MONITORS);
};

/**
 * Get a screenshot of the window with the specified id.
 *
 * @param id Window id.
 *
 * @example
 * import { getWindowScreenshot } from "tauri-plugin-screenshots-api"
 *
 * const path = await getWindowScreenshot(1)
 * console.log(path) // xx/tauri-plugin-screenshots/window-1.png
 */
export const getWindowScreenshot = (id: number) => {
  return invoke<string>(COMMAND.GET_WINDOW_SCREENSHOT, { id });
};

/**
 * Get a screenshot of the monitor with the specified id.
 *
 * @param id Monitor id.
 *
 * @example
 * import { getMonitorScreenshot } from "tauri-plugin-screenshots-api"
 *
 * const path = await getMonitorScreenshot(1)
 * console.log(path) // xx/tauri-plugin-screenshots/monitor-1.png
 */
export const getMonitorScreenshot = (id: number) => {
  return invoke<string>(COMMAND.GET_MONITOR_SCREENSHOT, { id });
};
