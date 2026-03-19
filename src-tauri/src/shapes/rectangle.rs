use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(shape_config: &ShapeConfig) -> Result<ShapeGeometry, String> {
    let width = require_positive(shape_config, "width")?;
    let height = require_positive(shape_config, "height")?;

    Ok(ShapeGeometry {
        shape_type: "rectangle".to_string(),
        points: vec![
            Point::new(0.0, 0.0),
            Point::new(width, 0.0),
            Point::new(width, height),
            Point::new(0.0, height),
        ],
        circle: None,
        holes: vec![],
        corner_labels: vec![],
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