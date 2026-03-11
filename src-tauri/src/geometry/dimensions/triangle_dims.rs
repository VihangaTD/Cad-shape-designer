use crate::geometry::bounds::calculate_bounds;
use crate::geometry::dimensions::common::{horizontal_dimension, vertical_dimension};
use crate::models::dimension_data::DimensionData;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(
    geometry: &ShapeGeometry,
    shape_config: &ShapeConfig,
) -> Result<Vec<DimensionData>, String> {
    let bounds = calculate_bounds(geometry);
    let base = shape_config.parameters.get("base").copied().unwrap_or(0.0);
    let height = shape_config.parameters.get("height").copied().unwrap_or(0.0);

    Ok(vec![
        horizontal_dimension(
            "base",
            format!("{base} mm"),
            bounds.min_x,
            bounds.max_x,
            bounds.max_y,
            60.0,
        ),
        vertical_dimension(
            "height",
            format!("{height} mm"),
            bounds.min_y,
            bounds.max_y,
            bounds.max_x,
            60.0,
        ),
    ])
}