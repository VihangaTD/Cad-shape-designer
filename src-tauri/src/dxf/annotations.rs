use crate::dxf::layers::{LAYER_CENTERLINES, LAYER_DIMENSIONS};
use crate::dxf::writer::DxfWriter;
use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_geometry::ShapeGeometry;

const DEFAULT_TEXT_HEIGHT: f64 = 22.0;
const MIN_TEXT_HEIGHT: f64 = 12.0;
const MAX_TEXT_HEIGHT: f64 = 28.0;

const TEXT_GAP: f64 = 16.0;
const ARROW_LENGTH: f64 = 10.0;
const ARROW_WIDTH: f64 = 4.5;
const CENTERLINE_EXTEND: f64 = 20.0;
const APPROX_TEXT_WIDTH_FACTOR: f64 = 0.62;

pub fn write_dimensions(writer: &mut DxfWriter, dimensions: &[DimensionData]) {
    for dimension in dimensions {
        writer.add_line(
            LAYER_DIMENSIONS,
            &dimension.ext1_start,
            &dimension.ext1_end,
        );
        writer.add_line(
            LAYER_DIMENSIONS,
            &dimension.ext2_start,
            &dimension.ext2_end,
        );

        let line_dx = dimension.line_end.x - dimension.line_start.x;
        let line_dy = dimension.line_end.y - dimension.line_start.y;
        let line_length = (line_dx * line_dx + line_dy * line_dy).sqrt().max(1.0);

        let ux = line_dx / line_length;
        let uy = line_dy / line_length;

        let nx = -uy;
        let ny = ux;

        let text_height = compute_text_height(line_length);
        let text_position = improved_text_position(
            &dimension.line_start,
            &dimension.line_end,
            &dimension.text_position,
            nx,
            ny,
        );

        let approx_text_width =
            (dimension.label.chars().count() as f64) * text_height * APPROX_TEXT_WIDTH_FACTOR;
        let gap_half = approx_text_width / 2.0 + 8.0;

        let mid_x = (dimension.line_start.x + dimension.line_end.x) / 2.0;
        let mid_y = (dimension.line_start.y + dimension.line_end.y) / 2.0;

        let gap_start = Point::new(mid_x - ux * gap_half, mid_y - uy * gap_half);
        let gap_end = Point::new(mid_x + ux * gap_half, mid_y + uy * gap_half);

        writer.add_line(LAYER_DIMENSIONS, &dimension.line_start, &gap_start);
        writer.add_line(LAYER_DIMENSIONS, &gap_end, &dimension.line_end);

        write_arrowhead(writer, &dimension.line_start, &dimension.line_end);
        write_arrowhead(writer, &dimension.line_end, &dimension.line_start);

        writer.add_text(
            LAYER_DIMENSIONS,
            &text_position,
            text_height,
            &dimension.label,
            0.0,
        );
    }
}

pub fn write_centerlines(writer: &mut DxfWriter, geometry: &ShapeGeometry, bounds: &Bounds) {
    if let Some(circle) = &geometry.circle {
        let horizontal_left = Point::new(bounds.min_x - CENTERLINE_EXTEND, circle.center.y);
        let horizontal_right = Point::new(bounds.max_x + CENTERLINE_EXTEND, circle.center.y);
        let vertical_top = Point::new(circle.center.x, bounds.min_y - CENTERLINE_EXTEND);
        let vertical_bottom = Point::new(circle.center.x, bounds.max_y + CENTERLINE_EXTEND);

        writer.add_line(LAYER_CENTERLINES, &horizontal_left, &horizontal_right);
        writer.add_line(LAYER_CENTERLINES, &vertical_top, &vertical_bottom);
        return;
    }

    let cx = (bounds.min_x + bounds.max_x) / 2.0;
    let cy = (bounds.min_y + bounds.max_y) / 2.0;

    let horizontal_left = Point::new(bounds.min_x - CENTERLINE_EXTEND, cy);
    let horizontal_right = Point::new(bounds.max_x + CENTERLINE_EXTEND, cy);
    let vertical_top = Point::new(cx, bounds.min_y - CENTERLINE_EXTEND);
    let vertical_bottom = Point::new(cx, bounds.max_y + CENTERLINE_EXTEND);

    writer.add_line(LAYER_CENTERLINES, &horizontal_left, &horizontal_right);
    writer.add_line(LAYER_CENTERLINES, &vertical_top, &vertical_bottom);
}

fn write_arrowhead(writer: &mut DxfWriter, tip: &Point, reference: &Point) {
    let dx = reference.x - tip.x;
    let dy = reference.y - tip.y;
    let length = (dx * dx + dy * dy).sqrt().max(1.0);

    let ux = dx / length;
    let uy = dy / length;

    let nx = -uy;
    let ny = ux;

    let base_x = tip.x + ux * ARROW_LENGTH;
    let base_y = tip.y + uy * ARROW_LENGTH;

    let left = Point::new(base_x + nx * ARROW_WIDTH, base_y + ny * ARROW_WIDTH);
    let right = Point::new(base_x - nx * ARROW_WIDTH, base_y - ny * ARROW_WIDTH);

    writer.add_line(LAYER_DIMENSIONS, tip, &left);
    writer.add_line(LAYER_DIMENSIONS, tip, &right);
}

fn compute_text_height(line_length: f64) -> f64 {
    let scaled = line_length * 0.045;
    scaled.clamp(MIN_TEXT_HEIGHT, MAX_TEXT_HEIGHT).max(DEFAULT_TEXT_HEIGHT.min(MAX_TEXT_HEIGHT))
}

fn improved_text_position(
    line_start: &Point,
    line_end: &Point,
    fallback: &Point,
    nx: f64,
    ny: f64,
) -> Point {
    let dx = line_end.x - line_start.x;
    let dy = line_end.y - line_start.y;
    let length = (dx * dx + dy * dy).sqrt();

    if length < 1.0 {
        return fallback.clone();
    }

    let mx = (line_start.x + line_end.x) / 2.0;
    let my = (line_start.y + line_end.y) / 2.0;

    Point::new(mx + nx * TEXT_GAP, my + ny * TEXT_GAP)
}