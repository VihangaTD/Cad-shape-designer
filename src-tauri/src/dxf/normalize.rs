use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_geometry::{CircleData, ShapeGeometry};

pub fn normalize_geometry_for_dxf(
    geometry: &ShapeGeometry,
    margin: f64,
) -> (ShapeGeometry, Bounds) {
    let bounds = calculate_geometry_bounds(geometry);

    let dx = margin - bounds.min_x;
    let dy = margin - bounds.min_y;

    let points = geometry
        .points
        .iter()
        .map(|p| Point::new(p.x + dx, p.y + dy))
        .collect::<Vec<_>>();

    let circle = geometry.circle.as_ref().map(|c| CircleData {
        center: Point::new(c.center.x + dx, c.center.y + dy),
        radius: c.radius,
    });

    let normalized = ShapeGeometry {
        shape_type: geometry.shape_type.clone(),
        points,
        circle,
    };

    let normalized_bounds = calculate_geometry_bounds(&normalized);

    (normalized, normalized_bounds)
}

pub fn normalize_dimensions_for_dxf(
    dimensions: &[DimensionData],
    original_bounds: &Bounds,
    margin: f64,
) -> Vec<DimensionData> {
    let dx = margin - original_bounds.min_x;
    let dy = margin - original_bounds.min_y;

    dimensions
        .iter()
        .map(|d| DimensionData {
            key: d.key.clone(),
            label: d.label.clone(),
            line_start: shift_point(&d.line_start, dx, dy),
            line_end: shift_point(&d.line_end, dx, dy),
            ext1_start: shift_point(&d.ext1_start, dx, dy),
            ext1_end: shift_point(&d.ext1_end, dx, dy),
            ext2_start: shift_point(&d.ext2_start, dx, dy),
            ext2_end: shift_point(&d.ext2_end, dx, dy),
            text_position: shift_point(&d.text_position, dx, dy),
        })
        .collect()
}

fn shift_point(point: &Point, dx: f64, dy: f64) -> Point {
    Point::new(point.x + dx, point.y + dy)
}

fn calculate_geometry_bounds(geometry: &ShapeGeometry) -> Bounds {
    if let Some(circle) = &geometry.circle {
        return Bounds {
            min_x: circle.center.x - circle.radius,
            min_y: circle.center.y - circle.radius,
            max_x: circle.center.x + circle.radius,
            max_y: circle.center.y + circle.radius,
        };
    }

    let min_x = geometry
        .points
        .iter()
        .map(|p| p.x)
        .fold(f64::INFINITY, f64::min);
    let min_y = geometry
        .points
        .iter()
        .map(|p| p.y)
        .fold(f64::INFINITY, f64::min);
    let max_x = geometry
        .points
        .iter()
        .map(|p| p.x)
        .fold(f64::NEG_INFINITY, f64::max);
    let max_y = geometry
        .points
        .iter()
        .map(|p| p.y)
        .fold(f64::NEG_INFINITY, f64::max);

    Bounds {
        min_x,
        min_y,
        max_x,
        max_y,
    }
}