pub mod circle_dims;
pub mod common;
pub mod lshape_dims;
pub mod rectangle_dims;
pub mod trapezoid_dims;
pub mod triangle_dims;

use crate::models::dimension_data::DimensionData;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::ShapeGeometry;

pub fn build_dimensions(
    geometry: &ShapeGeometry,
    shape_config: &ShapeConfig,
) -> Result<Vec<DimensionData>, String> {
    match geometry.shape_type.as_str() {
        "rectangle" => rectangle_dims::build(geometry, shape_config),
        "circle" => circle_dims::build(geometry, shape_config),
        "triangle" => triangle_dims::build(geometry, shape_config),
        "lshape" => lshape_dims::build(geometry, shape_config),
        "trapezoid" => trapezoid_dims::build(geometry, shape_config),
        other => Err(format!("Unsupported dimension shape type: {other}")),
    }
}