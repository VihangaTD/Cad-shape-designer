mod commands;
mod geometry;
mod models;
mod shapes;
mod svg;

use commands::preview::generate_preview;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_preview])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}