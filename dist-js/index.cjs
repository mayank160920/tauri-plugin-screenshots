'use strict';

var core = require('@tauri-apps/api/core');

const COMMAND = {
    GET_SCREENSHOTABLE_WINDOWS: "plugin:screenshots|get_screenshotable_windows",
    GET_SCREENSHOTABLE_MONITORS: "plugin:screenshots|get_screenshotable_monitors",
    GET_WINDOW_SCREENSHOT: "plugin:screenshots|get_window_screenshot",
    GET_MONITOR_SCREENSHOT: "plugin:screenshots|get_monitor_screenshot",
    GET_MONITOR_SCREENSHOT_BASE64URL: "plugin:screenshots|get_monitor_screenshot_base64url",
    REMOVE_WINDOW_SCREENSHOT: "plugin:screenshots|remove_window_screenshot",
    REMOVE_MONITOR_SCREENSHOT: "plugin:screenshots|remove_monitor_screenshot",
    CLEAR_SCREENSHOTS: "plugin:screenshots|clear_screenshots",
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
const getScreenshotableWindows = () => {
    return core.invoke(COMMAND.GET_SCREENSHOTABLE_WINDOWS);
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
const getScreenshotableMonitors = () => {
    return core.invoke(COMMAND.GET_SCREENSHOTABLE_MONITORS);
};
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
const getWindowScreenshot = (id) => {
    return core.invoke(COMMAND.GET_WINDOW_SCREENSHOT, { id });
};
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
const getMonitorScreenshot = (id) => {
    return core.invoke(COMMAND.GET_MONITOR_SCREENSHOT, { id });
};
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
const getMonitorScreenshotBase64url = (id) => {
    return core.invoke(COMMAND.GET_MONITOR_SCREENSHOT_BASE64URL, { id });
};
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
const removeWindowScreenshot = (id) => {
    return core.invoke(COMMAND.REMOVE_WINDOW_SCREENSHOT, { id });
};
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
const removeMonitorScreenshot = (id) => {
    return core.invoke(COMMAND.REMOVE_MONITOR_SCREENSHOT, { id });
};
/**
 * Remove all locally stored screenshots.
 *
 * @example
 * import { clearScreenshots } from "tauri-plugin-screenshots-api"
 *
 * await clearScreenshots()
 */
const clearScreenshots = () => {
    return core.invoke(COMMAND.CLEAR_SCREENSHOTS);
};

exports.COMMAND = COMMAND;
exports.clearScreenshots = clearScreenshots;
exports.getMonitorScreenshot = getMonitorScreenshot;
exports.getMonitorScreenshotBase64url = getMonitorScreenshotBase64url;
exports.getScreenshotableMonitors = getScreenshotableMonitors;
exports.getScreenshotableWindows = getScreenshotableWindows;
exports.getWindowScreenshot = getWindowScreenshot;
exports.removeMonitorScreenshot = removeMonitorScreenshot;
exports.removeWindowScreenshot = removeWindowScreenshot;
