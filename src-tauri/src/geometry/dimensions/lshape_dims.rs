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

    let outer_width = shape_config.parameters.get("outerWidth").copied().unwrap_or(0.0);
    let outer_height = shape_config.parameters.get("outerHeight").copied().unwrap_or(0.0);
    let cutout_width = shape_config.parameters.get("cutoutWidth").copied().unwrap_or(0.0);
    let cutout_height = shape_config.parameters.get("cutoutHeight").copied().unwrap_or(0.0);

    let p = &geometry.points;
    if p.len() < 6 {
        return Err("L-shape requires 6 points.".to_string());
    }

    Ok(vec![
        horizontal_dimension(
            "outerWidth",
            format!("{outer_width} mm"),
            bounds.min_x,
            bounds.max_x,
            bounds.max_y,
            60.0,
        ),
        vertical_dimension(
            "outerHeight",
            format!("{outer_height} mm"),
            bounds.min_y,
            bounds.max_y,
            bounds.max_x,
            60.0,
        ),
        horizontal_dimension(
            "cutoutWidth",
            format!("{cutout_width} mm"),
            p[3].x.min(p[4].x),
            p[3].x.max(p[4].x),
            p[3].y.max(p[4].y),
            45.0,
        ),
        vertical_dimension(
            "cutoutHeight",
            format!("{cutout_height} mm"),
            p[2].y.min(p[3].y),
            p[2].y.max(p[3].y),
            p[2].x.max(p[3].x),
            45.0,
        ),
    ])
}