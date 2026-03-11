use crate::models::point::Point;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ShapeGeometry {
    pub points: Vec<Point>,
}