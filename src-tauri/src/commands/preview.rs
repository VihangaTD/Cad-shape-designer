use crate::geometry::bounds::calculate_bounds;
use crate::geometry::dimensions::build_dimensions;
use crate::geometry::normalize::normalize_geometry;
use crate::geometry::transform::apply_transforms;
use crate::models::preview_response::PreviewResponse;
use crate::models::shape_config::ShapeConfig;
use crate::shapes::build_shape_geometry;
use crate::svg::renderer::render_svg;

#[tauri::command]
pub fn generate_preview(shape_config: ShapeConfig) -> Result<PreviewResponse, String> {
    validate_shape_config(&shape_config)?;

    let raw_geometry = build_shape_geometry(&shape_config)?;
    let transformed_geometry = apply_transforms(&raw_geometry, &shape_config);
    let normalized_geometry = normalize_geometry(&transformed_geometry, 40.0);

    let bounds = calculate_bounds(&normalized_geometry);
    let dimensions = build_dimensions(&normalized_geometry, &shape_config)?;
    let svg = render_svg(&normalized_geometry);

    let view_box = format!(
        "0 0 {} {}",
        bounds.width() + 80.0,
        bounds.height() + 80.0
    );

    Ok(PreviewResponse {
        svg,
        view_box,
        bounds,
        dimensions,
    })
}

fn validate_shape_config(shape_config: &ShapeConfig) -> Result<(), String> {
    if !matches!(shape_config.rotation, 0 | 90 | 180 | 270) {
        return Err("Rotation must be one of 0, 90, 180, or 270.".to_string());
    }

    if shape_config.parameters.is_empty() {
        return Err("Shape parameters cannot be empty.".to_string());
    }

    Ok(())
}