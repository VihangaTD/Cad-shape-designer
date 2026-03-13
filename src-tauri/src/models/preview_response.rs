use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::shape_geometry::ShapeGeometry;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PreviewResponse {
    pub svg: String,
    pub view_box: String,
    pub bounds: Bounds,
    pub dimensions: Vec<DimensionData>,
    pub geometry: ShapeGeometry,
}