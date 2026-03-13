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

    if p.len() != 6 {
        return Err("L-shape requires 6 points.".to_string());
    }

    let outer_width = shape_config.parameters.get("outerWidth").copied().unwrap_or(0.0);
    let outer_height = shape_config.parameters.get("outerHeight").copied().unwrap_or(0.0);
    let cutout_width = shape_config.parameters.get("cutoutWidth").copied().unwrap_or(0.0);
    let cutout_height = shape_config.parameters.get("cutoutHeight").copied().unwrap_or(0.0);

    let p0 = p[0].clone();
    let p1 = p[1].clone();
    let p2 = p[2].clone();
    let p3 = p[3].clone();
    let p4 = p[4].clone();
    let p5 = p[5].clone();

    let shape_center = Point::new(
        p.iter().map(|pt| pt.x).sum::<f64>() / p.len() as f64,
        p.iter().map(|pt| pt.y).sum::<f64>() / p.len() as f64,
    );

    Ok(vec![
        edge_dimension(
            "outerWidth",
            format!("{outer_width} mm"),
            p0.clone(),
            p1,
            50.0,
            &shape_center,
        ),
        edge_dimension(
            "outerHeight",
            format!("{outer_height} mm"),
            p5,
            p0,
            50.0,
            &shape_center,
        ),
        edge_dimension(
            "cutoutWidth",
            format!("{cutout_width} mm"),
            p3.clone(),
            p2,
            45.0,
            &shape_center,
        ),
        edge_dimension(
            "cutoutHeight",
            format!("{cutout_height} mm"),
            p4,
            p3,
            45.0,
            &shape_center,
        ),
    ])
}