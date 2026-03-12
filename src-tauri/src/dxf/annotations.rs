use crate::dxf::layers::{LAYER_CENTERLINES, LAYER_DIMENSIONS};
use crate::dxf::writer::DxfWriter;
use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_geometry::ShapeGeometry;

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
        writer.add_line(
            LAYER_DIMENSIONS,
            &dimension.line_start,
            &dimension.line_end,
        );

        write_end_tick(writer, &dimension.line_start, &dimension.line_end);
        write_end_tick(writer, &dimension.line_end, &dimension.line_start);

        writer.add_text(
            LAYER_DIMENSIONS,
            &dimension.text_position,
            18.0,
            &dimension.label,
        );
    }
}

pub fn write_centerlines(
    writer: &mut DxfWriter,
    geometry: &ShapeGeometry,
    bounds: &Bounds,
) {
    if let Some(circle) = &geometry.circle {
        let horizontal_left = Point::new(bounds.min_x, circle.center.y);
        let horizontal_right = Point::new(bounds.max_x, circle.center.y);
        let vertical_top = Point::new(circle.center.x, bounds.min_y);
        let vertical_bottom = Point::new(circle.center.x, bounds.max_y);

        writer.add_line(LAYER_CENTERLINES, &horizontal_left, &horizontal_right);
        writer.add_line(LAYER_CENTERLINES, &vertical_top, &vertical_bottom);
        return;
    }

    let cx = (bounds.min_x + bounds.max_x) / 2.0;
    let cy = (bounds.min_y + bounds.max_y) / 2.0;

    let horizontal_left = Point::new(bounds.min_x, cy);
    let horizontal_right = Point::new(bounds.max_x, cy);
    let vertical_top = Point::new(cx, bounds.min_y);
    let vertical_bottom = Point::new(cx, bounds.max_y);

    writer.add_line(LAYER_CENTERLINES, &horizontal_left, &horizontal_right);
    writer.add_line(LAYER_CENTERLINES, &vertical_top, &vertical_bottom);
}

fn write_end_tick(writer: &mut DxfWriter, point: &Point, reference: &Point) {
    let dx = reference.x - point.x;
    let dy = reference.y - point.y;
    let length = (dx * dx + dy * dy).sqrt().max(1.0);

    let ux = dx / length;
    let uy = dy / length;

    let px = -uy;
    let py = ux;

    let size = 6.0;

    let a = Point::new(point.x - px * size, point.y - py * size);
    let b = Point::new(point.x + px * size, point.y + py * size);

    writer.add_line(LAYER_DIMENSIONS, &a, &b);
}