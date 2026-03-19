use crate::models::point::Point;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CircleData {
    pub center: Point,
    pub radius: f64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CornerLabel {
    pub id: String,
    pub point: Point,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ShapeGeometry {
    pub shape_type: String,
    pub points: Vec<Point>,
    pub circle: Option<CircleData>,
    pub holes: Vec<CircleData>,
    pub corner_labels: Vec<CornerLabel>,
}