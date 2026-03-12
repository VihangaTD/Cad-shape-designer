use std::fs;
use std::path::PathBuf;

pub fn write_bytes_to_file(path: PathBuf, bytes: &[u8]) -> Result<String, String> {
    fs::write(&path, bytes).map_err(|error| format!("Failed to write file: {error}"))?;

    Ok(path.to_string_lossy().to_string())
}