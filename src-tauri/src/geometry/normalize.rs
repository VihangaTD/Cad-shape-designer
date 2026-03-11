use crate::geometry::bounds::calculate_bounds;
use crate::models::shape_geometry::{CircleData, ShapeGeometry};

pub fn normalize_geometry(geometry: &ShapeGeometry, padding: f64) -> ShapeGeometry {
    let bounds = calculate_bounds(geometry);
    let dx = padding - bounds.min_x;
    let dy = padding - bounds.min_y;

    let points = geometry
        .points
        .iter()
        .map(|p| crate::models::point::Point::new(p.x + dx, p.y + dy))
        .collect::<Vec<_>>();

    let circle = geometry.circle.as_ref().map(|c| CircleData {
        center: crate::models::point::Point::new(c.center.x + dx, c.center.y + dy),
        radius: c.radius,
    });

    ShapeGeometry {
        shape_type: geometry.shape_type.clone(),
        points,
        circle,
    }
}