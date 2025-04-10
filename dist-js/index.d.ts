export interface ScreenshotableWindow {
    id: number;
    name: string;
}
export interface ScreenshotableMonitor {
    id: number;
    name: string;
}
export declare const COMMAND: {
    GET_SCREENSHOTABLE_WINDOWS: string;
    GET_SCREENSHOTABLE_MONITORS: string;
    GET_WINDOW_SCREENSHOT: string;
    GET_MONITOR_SCREENSHOT: string;
    GET_MONITOR_SCREENSHOT_BASE64URL: string;
    REMOVE_WINDOW_SCREENSHOT: string;
    REMOVE_MONITOR_SCREENSHOT: string;
    CLEAR_SCREENSHOTS: string;
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
export declare const getScreenshotableWindows: () => Promise<ScreenshotableWindow[]>;
/**
 * Get all monitors that can take screenshots.
 *
 * @example
 * import { getScreenshotableMonitors } from "tauri-plugin-screenshots-api"
 *
 * const monitors = await getScreenshotableMonitors()
 * console.log(monitors)
 */
export declare const getScreenshotableMonitors: () => Promise<ScreenshotableMonitor[]>;
/**
 * Get a screenshot of the window with the specified id.
 *
 * @returns The path to the screenshot.
 *
 * @param id Window id.
 *
 * @example
 * import { getWindowScreenshot } from "tauri-plugin-screenshots-api"
 *
 * const path = await getWindowScreenshot(1)
 * console.log(path) // xx/tauri-plugin-screenshots/window-1.png
 */
export declare const getWindowScreenshot: (id: number) => Promise<string>;
/**
 * Get a screenshot of the monitor with the specified id.
 *
 * @param id Monitor id.
 *
 * @returns The path to the screenshot.
 *
 * @example
 * import { getMonitorScreenshot } from "tauri-plugin-screenshots-api"
 *
 * const path = await getMonitorScreenshot(1)
 * console.log(path) // xx/tauri-plugin-screenshots/monitor-1.png
 */
export declare const getMonitorScreenshot: (id: number) => Promise<string>;
/**
 * Get a screenshot of the monitor with the specified id as a base64 data URL.
 *
 * @param id Monitor id.
 *
 * @returns The base64 data URL of the screenshot image.
 *
 * @example
 * import { getMonitorScreenshotBase64url } from "tauri-plugin-screenshots-api"
 *
 * const dataUrl = await getMonitorScreenshotBase64url(1)
 * console.log(dataUrl) // data:image/png;base64,...
 */
export declare const getMonitorScreenshotBase64url: (id: number) => Promise<string>;
/**
 * Remove locally stored window screenshots.
 *
 * @param id Window id.
 *
 * @example
 * import { removeWindowScreenshot } from "tauri-plugin-screenshots-api"
 *
 * await removeWindowScreenshot(1)
 */
export declare const removeWindowScreenshot: (id: number) => Promise<unknown>;
/**
 * Remove locally stored monitor screenshots.
 *
 * @param id Monitor id.
 *
 * @example
 * import { removeMonitorScreenshot } from "tauri-plugin-screenshots-api"
 *
 * await removeMonitorScreenshot(1)
 */
export declare const removeMonitorScreenshot: (id: number) => Promise<unknown>;
/**
 * Remove all locally stored screenshots.
 *
 * @example
 * import { clearScreenshots } from "tauri-plugin-screenshots-api"
 *
 * await clearScreenshots()
 */
export declare const clearScreenshots: () => Promise<unknown>;
