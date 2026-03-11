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
    let p = &geometry.points;

    if p.len() < 4 {
        return Err("Trapezoid requires 4 points.".to_string());
    }

    let top_width = shape_config.parameters.get("topWidth").copied().unwrap_or(0.0);
    let bottom_width = shape_config.parameters.get("bottomWidth").copied().unwrap_or(0.0);
    let height = shape_config.parameters.get("height").copied().unwrap_or(0.0);

    Ok(vec![
        horizontal_dimension(
            "topWidth",
            format!("{top_width} mm"),
            p[0].x.min(p[1].x),
            p[0].x.max(p[1].x),
            p[0].y,
            -50.0,
        ),
        horizontal_dimension(
            "bottomWidth",
            format!("{bottom_width} mm"),
            p[3].x.min(p[2].x),
            p[3].x.max(p[2].x),
            p[2].y,
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