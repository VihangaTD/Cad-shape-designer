use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ShapeConfig {
    #[serde(rename = "type")]
    pub shape_type: String,
    pub parameters: HashMap<String, f64>,
    pub rotation: i32,
    pub flip_x: bool,
    pub flip_y: bool,
}