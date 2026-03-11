use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(shape_config: &ShapeConfig) -> Result<ShapeGeometry, String> {
    let top_width = require_positive(shape_config, "topWidth")?;
    let bottom_width = require_positive(shape_config, "bottomWidth")?;
    let height = require_positive(shape_config, "height")?;

    if top_width > bottom_width {
        return Err("topWidth must be less than or equal to bottomWidth".to_string());
    }

    let offset = (bottom_width - top_width) / 2.0;

    Ok(ShapeGeometry {
        shape_type: "trapezoid".to_string(),
        points: vec![
            Point::new(offset, 0.0),
            Point::new(offset + top_width, 0.0),
            Point::new(bottom_width, height),
            Point::new(0.0, height),
        ],
        circle: None,
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