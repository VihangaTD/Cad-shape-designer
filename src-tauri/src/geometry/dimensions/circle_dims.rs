use crate::geometry::dimensions::common::point_label_dimension;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(
    geometry: &ShapeGeometry,
    shape_config: &ShapeConfig,
) -> Result<Vec<DimensionData>, String> {
    let circle = geometry
        .circle
        .as_ref()
        .ok_or_else(|| "Circle geometry is missing.".to_string())?;

    let radius = shape_config.parameters.get("radius").copied().unwrap_or(0.0);

    let start = Point::new(circle.center.x, circle.center.y);
    let end = Point::new(circle.center.x + circle.radius, circle.center.y);

    Ok(vec![point_label_dimension(
        "radius",
        format!("{radius} mm"),
        start,
        end,
        Point::new(circle.center.x + circle.radius / 2.0, circle.center.y - 20.0),
    )])
}