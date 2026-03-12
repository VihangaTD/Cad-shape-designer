use crate::dxf::layers::LAYER_OUTLINE;
use crate::dxf::writer::DxfWriter;
use crate::models::shape_geometry::ShapeGeometry;

pub fn write_outline(writer: &mut DxfWriter, geometry: &ShapeGeometry) {
    if let Some(circle) = &geometry.circle {
        writer.add_circle(LAYER_OUTLINE, &circle.center, circle.radius);
        return;
    }

    if geometry.points.len() < 2 {
        return;
    }

    for index in 0..geometry.points.len() {
        let start = &geometry.points[index];
        let end = &geometry.points[(index + 1) % geometry.points.len()];
        writer.add_line(LAYER_OUTLINE, start, end);
    }
}