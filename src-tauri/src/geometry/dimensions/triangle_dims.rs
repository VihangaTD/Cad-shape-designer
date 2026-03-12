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

    if p.len() != 3 {
        return Err("Triangle requires 3 points.".to_string());
    }

    let base = shape_config.parameters.get("base").copied().unwrap_or(0.0);
    let height = shape_config.parameters.get("height").copied().unwrap_or(0.0);

    let left_base = p[0].clone();
    let right_base = p[1].clone();
    let apex = p[2].clone();

    let base_mid = Point::new(
        (left_base.x + right_base.x) / 2.0,
        (left_base.y + right_base.y) / 2.0,
    );

    let shape_center = Point::new(
        (p[0].x + p[1].x + p[2].x) / 3.0,
        (p[0].y + p[1].y + p[2].y) / 3.0,
    );

    Ok(vec![
        edge_dimension(
            "base",
            format!("{base} mm"),
            left_base,
            right_base,
            60.0,
            &shape_center,
        ),
        edge_dimension(
            "height",
            format!("{height} mm"),
            base_mid,
            apex,
            60.0,
            &shape_center,
        ),
    ])
}