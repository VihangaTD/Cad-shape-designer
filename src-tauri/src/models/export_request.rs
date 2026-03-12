use crate::models::shape_config::ShapeConfig;
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SavePngRequest {
    pub file_name: String,
    pub bytes: Vec<u8>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SaveDxfRequest {
    pub file_name: String,
    pub shape_config: ShapeConfig,
    pub detailed: bool,
}