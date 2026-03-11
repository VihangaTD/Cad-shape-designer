use crate::models::bounds::Bounds;
use crate::models::shape_geometry::ShapeGeometry;

pub fn calculate_bounds(geometry: &ShapeGeometry) -> Bounds {
    if let Some(circle) = &geometry.circle {
        return Bounds {
            min_x: circle.center.x - circle.radius,
            min_y: circle.center.y - circle.radius,
            max_x: circle.center.x + circle.radius,
            max_y: circle.center.y + circle.radius,
        };
    }

    let min_x = geometry.points.iter().map(|p| p.x).fold(f64::INFINITY, f64::min);
    let min_y = geometry.points.iter().map(|p| p.y).fold(f64::INFINITY, f64::min);
    let max_x = geometry.points.iter().map(|p| p.x).fold(f64::NEG_INFINITY, f64::max);
    let max_y = geometry.points.iter().map(|p| p.y).fold(f64::NEG_INFINITY, f64::max);

    Bounds {
        min_x,
        min_y,
        max_x,
        max_y,
    }
}