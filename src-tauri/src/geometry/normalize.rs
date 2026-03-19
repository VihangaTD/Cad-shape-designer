use crate::geometry::bounds::calculate_bounds;
use crate::models::point::Point;
use crate::models::shape_geometry::{CircleData, CornerLabel, ShapeGeometry};

pub fn normalize_geometry(geometry: &ShapeGeometry, padding: f64) -> ShapeGeometry {
    let bounds = calculate_bounds(geometry);
    let dx = padding - bounds.min_x;
    let dy = padding - bounds.min_y;

    let points = geometry
        .points
        .iter()
        .map(|p| Point::new(p.x + dx, p.y + dy))
        .collect::<Vec<_>>();

    let circle = geometry.circle.as_ref().map(|c| CircleData {
        center: Point::new(c.center.x + dx, c.center.y + dy),
        radius: c.radius,
    });

    let holes = geometry
        .holes
        .iter()
        .map(|c| CircleData {
            center: Point::new(c.center.x + dx, c.center.y + dy),
            radius: c.radius,
        })
        .collect::<Vec<_>>();

    let corner_labels = geometry
        .corner_labels
        .iter()
        .map(|label| CornerLabel {
            id: label.id.clone(),
            point: Point::new(label.point.x + dx, label.point.y + dy),
        })
        .collect::<Vec<_>>();

    ShapeGeometry {
        shape_type: geometry.shape_type.clone(),
        points,
        circle,
        holes,
        corner_labels,
    }
}