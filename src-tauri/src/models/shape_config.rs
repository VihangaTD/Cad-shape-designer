use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CircleCutConfig {
    pub enabled: bool,
    pub corner_id: String,
    pub offset_x: f64,
    pub offset_y: f64,
    pub radius: f64,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ShapeConfig {
    #[serde(rename = "type")]
    pub shape_type: String,
    pub parameters: HashMap<String, f64>,
    pub rotation: i32,
    pub flip_x: bool,
    pub flip_y: bool,
    pub circle_cut: Option<CircleCutConfig>,
}