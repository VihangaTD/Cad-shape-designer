use crate::models::bounds::Bounds;
use crate::models::dimension_data::DimensionData;
use crate::models::point::Point;
use crate::models::shape_geometry::{CircleData, CornerLabel, ShapeGeometry};

pub fn normalize_geometry_for_dxf(
    geometry: &ShapeGeometry,
    margin: f64,
) -> (ShapeGeometry, Bounds) {
    let bounds = calculate_geometry_bounds(geometry);

    let points = geometry
        .points
        .iter()
        .map(|p| Point::new(
            p.x - bounds.min_x + margin,
            bounds.max_y - p.y + margin,
        ))
        .collect::<Vec<_>>();

    let circle = geometry.circle.as_ref().map(|c| CircleData {
        center: Point::new(
            c.center.x - bounds.min_x + margin,
            bounds.max_y - c.center.y + margin,
        ),
        radius: c.radius,
    });

    let holes = geometry
        .holes
        .iter()
        .map(|c| CircleData {
            center: Point::new(
                c.center.x - bounds.min_x + margin,
                bounds.max_y - c.center.y + margin,
            ),
            radius: c.radius,
        })
        .collect::<Vec<_>>();

    let corner_labels = geometry
        .corner_labels
        .iter()
        .map(|label| CornerLabel {
            id: label.id.clone(),
            point: Point::new(
                label.point.x - bounds.min_x + margin,
                bounds.max_y - label.point.y + margin,
            ),
        })
        .collect::<Vec<_>>();

    let normalized = ShapeGeometry {
        shape_type: geometry.shape_type.clone(),
        points,
        circle,
        holes,
        corner_labels,
    };

    let normalized_bounds = calculate_geometry_bounds(&normalized);

    (normalized, normalized_bounds)
}

pub fn normalize_dimensions_for_dxf(
    dimensions: &[DimensionData],
    original_bounds: &Bounds,
    margin: f64,
) -> Vec<DimensionData> {
    dimensions
        .iter()
        .map(|d| DimensionData {
            key: d.key.clone(),
            label: d.label.clone(),
            line_start: shift_and_flip_point(&d.line_start, original_bounds, margin),
            line_end: shift_and_flip_point(&d.line_end, original_bounds, margin),
            ext1_start: shift_and_flip_point(&d.ext1_start, original_bounds, margin),
            ext1_end: shift_and_flip_point(&d.ext1_end, original_bounds, margin),
            ext2_start: shift_and_flip_point(&d.ext2_start, original_bounds, margin),
            ext2_end: shift_and_flip_point(&d.ext2_end, original_bounds, margin),
            text_position: shift_and_flip_point(&d.text_position, original_bounds, margin),
        })
        .collect()
}

fn shift_and_flip_point(point: &Point, bounds: &Bounds, margin: f64) -> Point {
    Point::new(
        point.x - bounds.min_x + margin,
        bounds.max_y - point.y + margin,
    )
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