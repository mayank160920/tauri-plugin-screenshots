const COMMANDS: &[&str] = &[
    "get_screenshotable_windows",
    "get_screenshotable_monitors",
    "get_window_screenshot",
    "get_monitor_screenshot",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
