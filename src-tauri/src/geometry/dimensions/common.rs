use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;

pub fn midpoint(a: &Point, b: &Point) -> Point {
    Point::new((a.x + b.x) / 2.0, (a.y + b.y) / 2.0)
}

pub fn horizontal_dimension(
    key: &str,
    label: String,
    left: f64,
    right: f64,
    base_y: f64,
    offset: f64,
) -> DimensionData {
    let dim_y = base_y + offset;

    DimensionData {
        key: key.to_string(),
        label,
        line_start: Point::new(left, dim_y),
        line_end: Point::new(right, dim_y),
        ext1_start: Point::new(left, base_y),
        ext1_end: Point::new(left, dim_y),
        ext2_start: Point::new(right, base_y),
        ext2_end: Point::new(right, dim_y),
        text_position: Point::new((left + right) / 2.0, dim_y - 10.0),
    }
}

pub fn vertical_dimension(
    key: &str,
    label: String,
    top: f64,
    bottom: f64,
    base_x: f64,
    offset: f64,
) -> DimensionData {
    let dim_x = base_x + offset;

    DimensionData {
        key: key.to_string(),
        label,
        line_start: Point::new(dim_x, top),
        line_end: Point::new(dim_x, bottom),
        ext1_start: Point::new(base_x, top),
        ext1_end: Point::new(dim_x, top),
        ext2_start: Point::new(base_x, bottom),
        ext2_end: Point::new(dim_x, bottom),
        text_position: Point::new(dim_x + 12.0, (top + bottom) / 2.0),
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