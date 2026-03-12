use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SavePngRequest {
    pub file_name: String,
    pub bytes: Vec<u8>,
}