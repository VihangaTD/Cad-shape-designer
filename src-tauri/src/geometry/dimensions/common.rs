use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;

pub fn edge_dimension(
    key: &str,
    label: String,
    start: Point,
    end: Point,
    offset: f64,
) -> DimensionData {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let length = (dx * dx + dy * dy).sqrt().max(1.0);

    let ux = dx / length;
    let uy = dy / length;

    // perpendicular
    let nx = -uy;
    let ny = ux;

    let line_start = Point::new(start.x + nx * offset, start.y + ny * offset);
    let line_end = Point::new(end.x + nx * offset, end.y + ny * offset);

    let text_position = Point::new(
        (line_start.x + line_end.x) / 2.0,
        (line_start.y + line_end.y) / 2.0 - 12.0,
    );

    DimensionData {
        key: key.to_string(),
        label,
        line_start: line_start.clone(),
        line_end: line_end.clone(),
        ext1_start: start,
        ext1_end: line_start,
        ext2_start: end,
        ext2_end: line_end,
        text_position,
    }
}

pub fn point_label_dimension(
    key: &str,
    label: String,
    start: Point,
    end: Point,
    text_position: Point,
) -> DimensionData {
    DimensionData {
        key: key.to_string(),
        label,
        line_start: start.clone(),
        line_end: end.clone(),
        ext1_start: start.clone(),
        ext1_end: start,
        ext2_start: end.clone(),
        ext2_end: end,
        text_position,
    }
}