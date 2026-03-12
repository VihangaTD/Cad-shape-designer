use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;

pub fn edge_dimension(
    key: &str,
    label: String,
    start: Point,
    end: Point,
    offset: f64,
    shape_center: &Point,
) -> DimensionData {
    let safe_offset = offset.abs();

    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let length = (dx * dx + dy * dy).sqrt().max(1.0);

    let ux = dx / length;
    let uy = dy / length;

    let nx1 = -uy;
    let ny1 = ux;

    let nx2 = uy;
    let ny2 = -ux;

    let mid_x = (start.x + end.x) / 2.0;
    let mid_y = (start.y + end.y) / 2.0;

    let c1_x = mid_x + nx1 * safe_offset;
    let c1_y = mid_y + ny1 * safe_offset;

    let c2_x = mid_x + nx2 * safe_offset;
    let c2_y = mid_y + ny2 * safe_offset;

    let d1 = (c1_x - shape_center.x).powi(2) + (c1_y - shape_center.y).powi(2);
    let d2 = (c2_x - shape_center.x).powi(2) + (c2_y - shape_center.y).powi(2);

    let (nx, ny) = if d1 >= d2 { (nx1, ny1) } else { (nx2, ny2) };

    let line_start = Point::new(start.x + nx * safe_offset, start.y + ny * safe_offset);
    let line_end = Point::new(end.x + nx * safe_offset, end.y + ny * safe_offset);

    let extension_overshoot = 8.0;

    let ext1_end = Point::new(
        line_start.x + nx * extension_overshoot,
        line_start.y + ny * extension_overshoot,
    );

    let ext2_end = Point::new(
        line_end.x + nx * extension_overshoot,
        line_end.y + ny * extension_overshoot,
    );

    let text_gap = 16.0;
    let text_position = Point::new(
        (line_start.x + line_end.x) / 2.0 + nx * text_gap,
        (line_start.y + line_end.y) / 2.0 + ny * text_gap,
    );

    DimensionData {
        key: key.to_string(),
        label,
        line_start: line_start.clone(),
        line_end: line_end.clone(),
        ext1_start: start,
        ext1_end,
        ext2_start: end,
        ext2_end,
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