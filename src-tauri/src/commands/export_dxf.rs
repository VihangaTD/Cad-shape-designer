use crate::commands::file_io::write_bytes_to_file;
use crate::dxf::annotations::{ write_dimensions};
use crate::dxf::normalize::{normalize_dimensions_for_dxf, normalize_geometry_for_dxf};
use crate::dxf::outline::write_outline;
use crate::dxf::writer::DxfWriter;
use crate::geometry::bounds::calculate_bounds;
use crate::geometry::dimensions::build_dimensions;
use crate::geometry::transform::apply_transforms;
use crate::models::export_request::SaveDxfRequest;
use crate::shapes::build_shape_geometry;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub async fn save_dxf_file(
    app: AppHandle,
    request: SaveDxfRequest,
) -> Result<String, String> {
    let raw_geometry = build_shape_geometry(&request.shape_config)?;
    let transformed_geometry = apply_transforms(&raw_geometry, &request.shape_config);

    let original_bounds = calculate_bounds(&transformed_geometry);
    let dimensions = build_dimensions(&transformed_geometry, &request.shape_config)?;

    let dxf_margin = 20.0;

    let (normalized_geometry, _normalized_bounds) =
        normalize_geometry_for_dxf(&transformed_geometry, dxf_margin);

    let normalized_dimensions =
        normalize_dimensions_for_dxf(&dimensions, &original_bounds, dxf_margin);

    let mut writer = DxfWriter::new();

    write_outline(&mut writer, &normalized_geometry);

    if request.detailed {
        write_dimensions(&mut writer, &normalized_dimensions);
    }

    let dxf_content = writer.finish();

    let file_path = app
        .dialog()
        .file()
        .set_file_name(&request.file_name)
        .add_filter("DXF File", &["dxf"])
        .blocking_save_file();

    let Some(file_path) = file_path else {
        return Err("Save cancelled by user.".to_string());
    };

    let path = file_path
        .as_path()
        .ok_or_else(|| "Invalid file path.".to_string())?
        .to_path_buf();

    write_bytes_to_file(path, dxf_content.as_bytes())
}