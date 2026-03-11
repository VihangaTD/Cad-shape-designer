use crate::geometry::bounds::calculate_bounds;
use crate::models::point::Point;
use crate::models::shape_config::ShapeConfig;
use crate::models::shape_geometry::{CircleData, ShapeGeometry};

pub fn apply_transforms(geometry: &ShapeGeometry, shape_config: &ShapeConfig) -> ShapeGeometry {
    let bounds = calculate_bounds(geometry);
    let cx = (bounds.min_x + bounds.max_x) / 2.0;
    let cy = (bounds.min_y + bounds.max_y) / 2.0;

    let transformed_points = geometry
        .points
        .iter()
        .map(|point| {
            let rotated = rotate_point(point, cx, cy, shape_config.rotation);
            flip_point(&rotated, cx, cy, shape_config.flip_x, shape_config.flip_y)
        })
        .collect::<Vec<_>>();

    let transformed_circle = geometry.circle.as_ref().map(|circle| {
        let rotated_center = rotate_point(&circle.center, cx, cy, shape_config.rotation);
        let flipped_center = flip_point(
            &rotated_center,
            cx,
            cy,
            shape_config.flip_x,
            shape_config.flip_y,
        );

        CircleData {
            center: flipped_center,
            radius: circle.radius,
        }
    });

    ShapeGeometry {
        shape_type: geometry.shape_type.clone(),
        points: transformed_points,
        circle: transformed_circle,
    }
}

fn rotate_point(point: &Point, cx: f64, cy: f64, rotation: i32) -> Point {
    let dx = point.x - cx;
    let dy = point.y - cy;

    match rotation {
        0 => Point::new(point.x, point.y),
        90 => Point::new(cx - dy, cy + dx),
        180 => Point::new(cx - dx, cy - dy),
        270 => Point::new(cx + dy, cy - dx),
        _ => Point::new(point.x, point.y),
    }
}

fn flip_point(point: &Point, cx: f64, cy: f64, flip_x: bool, flip_y: bool) -> Point {
    let mut x = point.x;
    let mut y = point.y;

    if flip_x {
        x = 2.0 * cx - x;
    }

    if flip_y {
        y = 2.0 * cy - y;
    }

    Point::new(x, y)
}