use crate::geometry::dimensions::common::edge_dimension;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(
    geometry: &ShapeGeometry,
    shape_config: &ShapeConfig,
) -> Result<Vec<DimensionData>, String> {
    let p = &geometry.points;

    if p.len() != 4 {
        return Err("Rectangle requires 4 points.".to_string());
    }

    let width = shape_config.parameters.get("width").copied().unwrap_or(0.0);
    let height = shape_config.parameters.get("height").copied().unwrap_or(0.0);

    let top_left = p[0].clone();
    let top_right = p[1].clone();
    let bottom_right = p[2].clone();
    let bottom_left = p[3].clone();

    let shape_center = Point::new(
        (top_left.x + bottom_right.x) / 2.0,
        (top_left.y + bottom_right.y) / 2.0,
    );

    Ok(vec![
        edge_dimension(
            "width",
            format!("{width} mm"),
            bottom_left,
            bottom_right.clone(),
            60.0,
            &shape_center,
        ),
        edge_dimension(
            "height",
            format!("{height} mm"),
            top_right,
            bottom_right,
            60.0,
            &shape_center,
        ),
    ])
}