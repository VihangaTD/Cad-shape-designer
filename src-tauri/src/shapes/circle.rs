use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::{CircleData, ShapeGeometry};

pub fn build(shape_config: &ShapeConfig) -> Result<ShapeGeometry, String> {
    let radius = require_positive(shape_config, "radius")?;

    Ok(ShapeGeometry {
        shape_type: "circle".to_string(),
        points: vec![],
        circle: Some(CircleData {
            center: Point::new(radius, radius),
            radius,
        }),
    })
}

fn require_positive(shape_config: &ShapeConfig, key: &str) -> Result<f64, String> {
    let value = *shape_config
        .parameters
        .get(key)
        .ok_or_else(|| format!("Missing parameter: {key}"))?;

    if value <= 0.0 {
        return Err(format!("{key} must be greater than 0"));
    }

    Ok(value)
}