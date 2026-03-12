mod commands;
mod dxf;
mod geometry;
mod models;
mod shapes;
mod svg;

use commands::export_dxf::save_dxf_file;
use commands::export_png::save_png_file;
use commands::preview::generate_preview;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            generate_preview,
            save_png_file,
            save_dxf_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}