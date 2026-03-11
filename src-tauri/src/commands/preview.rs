use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::preview_response::PreviewResponse;
use crate::models::shape_config::ShapeConfig;

#[tauri::command]
pub fn generate_preview(shape_config: ShapeConfig) -> Result<PreviewResponse, String> {
    validate_shape_config(&shape_config)?;

    let preview = PreviewResponse {
        svg: build_mock_svg(&shape_config),
        view_box: "0 0 1400 1000".to_string(),
        bounds: Bounds {
            min_x: 0.0,
            min_y: 0.0,
            max_x: 1400.0,
            max_y: 1000.0,
        },
        dimensions: build_mock_dimensions(&shape_config),
    };

    Ok(preview)
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

fn build_mock_svg(shape_config: &ShapeConfig) -> String {
    let label = format!(
        "{} | rot={} | flipX={} | flipY={}",
        shape_config.shape_type,
        shape_config.rotation,
        shape_config.flip_x,
        shape_config.flip_y
    );

    format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1000">
  <rect x="250" y="220" width="900" height="560" rx="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="8" />
  <text x="700" y="520" font-size="42" text-anchor="middle" fill="#0f172a">{label}</text>
</svg>"##
    )
}

fn build_mock_dimensions(shape_config: &ShapeConfig) -> Vec<DimensionData> {
    let mut result = Vec::new();

    for (key, value) in &shape_config.parameters {
        result.push(DimensionData {
            key: key.clone(),
            label: format!("{value} mm"),
            line_start: Point { x: 300.0, y: 830.0 },
            line_end: Point { x: 1100.0, y: 830.0 },
            ext1_start: Point { x: 300.0, y: 780.0 },
            ext1_end: Point { x: 300.0, y: 860.0 },
            ext2_start: Point { x: 1100.0, y: 780.0 },
            ext2_end: Point { x: 1100.0, y: 860.0 },
            text_position: Point { x: 700.0, y: 810.0 },
        });
    }

    result
}