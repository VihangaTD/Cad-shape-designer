use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build(shape_config: &ShapeConfig) -> Result<ShapeGeometry, String> {
    let outer_width = require_positive(shape_config, "outerWidth")?;
    let outer_height = require_positive(shape_config, "outerHeight")?;
    let cutout_width = require_positive(shape_config, "cutoutWidth")?;
    let cutout_height = require_positive(shape_config, "cutoutHeight")?;

    if cutout_width >= outer_width {
        return Err("cutoutWidth must be smaller than outerWidth".to_string());
    }

    if cutout_height >= outer_height {
        return Err("cutoutHeight must be smaller than outerHeight".to_string());
    }

    Ok(ShapeGeometry {
        shape_type: "lshape".to_string(),
        points: vec![
            Point::new(0.0, 0.0),
            Point::new(outer_width, 0.0),
            Point::new(outer_width, outer_height - cutout_height),
            Point::new(outer_width - cutout_width, outer_height - cutout_height),
            Point::new(outer_width - cutout_width, outer_height),
            Point::new(0.0, outer_height),
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