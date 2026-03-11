pub mod circle;
pub mod lshape;
pub mod rectangle;
pub mod trapezoid;
pub mod triangle;

use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build_shape_geometry(shape_config: &ShapeConfig) -> Result<ShapeGeometry, String> {
    match shape_config.shape_type.as_str() {
        "rectangle" => rectangle::build(shape_config),
        "circle" => circle::build(shape_config),
        "triangle" => triangle::build(shape_config),
        "lshape" => lshape::build(shape_config),
        "trapezoid" => trapezoid::build(shape_config),
        other => Err(format!("Unsupported shape type: {other}")),
    }
}