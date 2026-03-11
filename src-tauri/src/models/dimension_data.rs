use crate::models::point::Point;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DimensionData {
    pub key: String,
    pub label: String,
    pub line_start: Point,
    pub line_end: Point,
    pub ext1_start: Point,
    pub ext1_end: Point,
    pub ext2_start: Point,
    pub ext2_end: Point,
    pub text_position: Point,
}