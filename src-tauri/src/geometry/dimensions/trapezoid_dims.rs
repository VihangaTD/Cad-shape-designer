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
        return Err("Trapezoid requires 4 points.".to_string());
    }

    let top_width = shape_config.parameters.get("topWidth").copied().unwrap_or(0.0);
    let bottom_width = shape_config.parameters.get("bottomWidth").copied().unwrap_or(0.0);
    let height = shape_config.parameters.get("height").copied().unwrap_or(0.0);

    let top_left = p[0].clone();
    let top_right = p[1].clone();
    let bottom_right = p[2].clone();
    let bottom_left = p[3].clone();

    let top_mid = Point::new(
        (top_left.x + top_right.x) / 2.0,
        (top_left.y + top_right.y) / 2.0,
    );
    let bottom_mid = Point::new(
        (bottom_left.x + bottom_right.x) / 2.0,
        (bottom_left.y + bottom_right.y) / 2.0,
    );

    let shape_center = Point::new(
        p.iter().map(|pt| pt.x).sum::<f64>() / p.len() as f64,
        p.iter().map(|pt| pt.y).sum::<f64>() / p.len() as f64,
    );

    Ok(vec![
        edge_dimension(
            "topWidth",
            format!("{top_width} mm"),
            top_left,
            top_right,
            50.0,
            &shape_center,
        ),
        edge_dimension(
            "bottomWidth",
            format!("{bottom_width} mm"),
            bottom_left,
            bottom_right,
            60.0,
            &shape_center,
        ),
        edge_dimension(
            "height",
            format!("{height} mm"),
            top_mid,
            bottom_mid,
            60.0,
            &shape_center,
        ),
    ])
}