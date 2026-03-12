use crate::commands::file_io::write_bytes_to_file;
use crate::models::export_request::SavePngRequest;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub async fn save_png_file(
    app: AppHandle,
    request: SavePngRequest,
) -> Result<String, String> {
    let file_path = app
        .dialog()
        .file()
        .set_file_name(&request.file_name)
        .add_filter("PNG Image", &["png"])
        .blocking_save_file();

    let Some(file_path) = file_path else {
        return Err("Save cancelled by user.".to_string());
    };

    let path = file_path
        .as_path()
        .ok_or_else(|| "Invalid file path.".to_string())?
        .to_path_buf();

    write_bytes_to_file(path, &request.bytes)
}