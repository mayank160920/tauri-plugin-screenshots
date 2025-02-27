use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

mod commands;

pub use commands::*;

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("screenshots")
        .invoke_handler(tauri::generate_handler![
            commands::get_screenshotable_windows,
            commands::get_screenshotable_monitors,
            commands::get_window_screenshot,
            commands::get_monitor_screenshot
        ])
        .build()
}
