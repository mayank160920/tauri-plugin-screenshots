# tauri-plugin-screenshots

> This plugin only works on tauri v2, if you need the v1 plugin, feel free to submit a PR!

Get screenshots of windows and monitors.

https://github.com/user-attachments/assets/0cc6e2ea-cf85-41ed-a809-078393a95c0f

## Install

```shell
cargo add tauri-plugin-screenshots
```

You can install the JavaScript Guest bindings using your preferred JavaScript package manager:

```shell
pnpm add tauri-plugin-screenshots-api
```

## Usage

`src-tauri/src/lib.rs`

```diff
pub fn run() {
    tauri::Builder::default()
+       .plugin(tauri_plugin_screenshots::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

`src-tauri/capabilities/default.json`

```diff
{
    ...
    "permissions": [
        ...
+       "screenshots:default"
    ]
}
```

Afterwards all the plugin's APIs are available through the JavaScript guest bindings:

```ts
import { getScreenshotableWindows } from "tauri-plugin-screenshots-api";

const windows = await getScreenshotableWindows();
console.log(windows);
```

## Methods

| Method                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `getScreenshotableWindows`  | Get all windows that can take screenshots.              |
| `getScreenshotableMonitors` | Get all monitors that can take screenshots.             |
| `getWindowScreenshot`       | Get a screenshot of the window with the specified id.   |
| `getMonitorScreenshot`      | Get a screenshot of the monitors with the specified id. |

## Example

```shell
git clone https://github.com/ayangweb/tauri-plugin-screenshots.git
```

```shell
pnpm install

pnpm build

cd examples/tauri-app

pnpm install

pnpm tauri dev
```

## Thanks

- Use [xcap](https://github.com/nashaofu/xcap) to get window and monitor screenshots.
