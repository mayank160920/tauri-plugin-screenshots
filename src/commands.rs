use std::{fs::create_dir_all, path::PathBuf};

use serde::Serialize;
use tauri::{command, AppHandle, Manager, Runtime};
use xcap::{Monitor, Window};

#[derive(Debug, Serialize)]
pub struct ScreenshotableWindow {
    pub id: u32,
    pub name: String,
}

#[derive(Debug, Serialize)]
pub struct ScreenshotableMonitor {
    pub id: u32,
    pub name: String,
}

/// Get all windows that can take screenshots.
///
/// # Returns
/// - `Ok(Vec<ScreenshotableWindow>)`: List of screenshotable window information.
/// - `Err(String)`: An error message string on failure.
///
/// # Example
/// ```
/// use tauri_plugin_screenshots::get_screenshotable_windows;
///
/// let windows = get_screenshotable_windows().await.unwrap();
/// println!("{:#?}", windows); // Vec<ScreenshotableWindow>
/// ```
#[command]
pub async fn get_screenshotable_windows() -> Result<Vec<ScreenshotableWindow>, String> {
    let windows = Window::all().map_err(|err| err.to_string())?;

    let mut screenshotable_windows = vec![];

    for window in windows {
        // Minimized windows can't take screenshots
        if window.is_minimized() {
            continue;
        }

        let app_name = window.app_name().to_string();
        let title = window.title().to_string();

        let name = if title.is_empty() || app_name.eq(&title) {
            app_name
        } else {
            format!("{} - {}", app_name, title)
        };

        screenshotable_windows.push(ScreenshotableWindow {
            id: window.id(),
            name,
        });
    }

    Ok(screenshotable_windows)
}

/// Get all monitors that can take screenshots.
///
/// # Returns
/// - `Ok(Vec<ScreenshotableMonitor>)`: List of screenshotable monitor information.
/// - `Err(String)`: An error message string on failure.
///
/// # Example
/// ```
/// use tauri_plugin_screenshots::get_screenshotable_monitors;
///
/// let monitors = get_screenshotable_monitors().await.unwrap();
/// println!("{:#?}", monitors); // Vec<ScreenshotableMonitor>
/// ```
#[command]
pub async fn get_screenshotable_monitors() -> Result<Vec<ScreenshotableMonitor>, String> {
    let monitors = Monitor::all().map_err(|err| err.to_string())?;

    let mut screenshotable_monitors = vec![];

    for monitor in monitors {
        screenshotable_monitors.push(ScreenshotableMonitor {
            id: monitor.id(),
            name: monitor.name().to_string(),
        });
    }

    Ok(screenshotable_monitors)
}

/// Get a screenshot of the window with the specified id.
///
/// # Arguments
///
/// - `id`: Window id.
///
/// # Returns
/// - `Ok(PathBuf)`: Path to store the image.
/// - `Err(String)`: An error message string on failure.
///
/// # Example
/// ```
/// use tauri_plugin_screenshots::get_window_screenshot;
///
/// let path = get_window_screenshot(app_handle, 1).await.unwrap();
/// println!("{:?}", path); // xx/tauri-plugin-screenshots/window-1.png
/// ```
#[command]
pub async fn get_window_screenshot<R: Runtime>(
    app_handle: AppHandle<R>,
    id: u32,
) -> Result<PathBuf, String> {
    let windows = Window::all().map_err(|err| err.to_string())?;

    for window in windows {
        if window.id() == id {
            // Minimized windows can't take screenshots.
            if window.is_minimized() {
                return Err("Minimized windows can't take screenshots".to_string());
            }

            let image = window.capture_image().map_err(|err| err.to_string())?;

            let save_path = get_save_path(app_handle, "window", window.id())?;

            image.save(&save_path).map_err(|err| err.to_string())?;

            return Ok(save_path);
        }
    }

    Err("Window not found".to_string())
}

/// Get a screenshot of the monitor with the specified id.
///
/// # Arguments
///
/// - `id`: Monitor id.
///
/// # Returns
/// - `Ok(PathBuf)`: Path to store the image.
/// - `Err(String)`: An error message string on failure.
///
/// # Example
/// ```
/// use tauri_plugin_screenshots::get_monitor_screenshot;
///
/// let path = get_monitor_screenshot(app_handle, 1).await.unwrap();
/// println!("{:?}", path); // xx/tauri-plugin-screenshots/monitor-1.png
/// ```
#[command]
pub async fn get_monitor_screenshot<R: Runtime>(
    app_handle: AppHandle<R>,
    id: u32,
) -> Result<PathBuf, String> {
    let monitors = Monitor::all().map_err(|err| err.to_string())?;

    for monitor in monitors {
        if monitor.id() == id {
            let image = monitor.capture_image().map_err(|err| err.to_string())?;

            let save_path = get_save_path(app_handle, "monitor", monitor.id())?;

            image.save(&save_path).map_err(|err| err.to_string())?;

            return Ok(save_path);
        }
    }

    Err("Monitor not found".to_string())
}

/// Get the save path of the screenshot.
///
/// # Arguments
///
/// - `prefix`: Screenshot file name prefix.
/// - `id`: Window id or monitor id.
///
/// # Returns
/// - `Ok(PathBuf)`: Path to store the image.
/// - `Err(String)`: An error message string on failure.
fn get_save_path<R: Runtime>(
    app_handle: AppHandle<R>,
    prefix: &str,
    id: u32,
) -> Result<PathBuf, String> {
    let save_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|err| err.to_string())?
        .join("tauri-plugin-screenshots");

    create_dir_all(&save_dir).map_err(|err| err.to_string())?;

    let save_path = save_dir.join(format!("{prefix}-{id}.png"));

    return Ok(save_path);
}
