use crate::models::point::Point;
use crate::models::shape_config::{CircleCutConfig, ShapeConfig};
use crate::models::shape_geometry::{CircleData, CornerLabel, ShapeGeometry};

pub fn attach_corner_labels_and_cut(
    geometry: &ShapeGeometry,
    shape_config: &ShapeConfig,
) -> Result<ShapeGeometry, String> {
    let mut result = geometry.clone();

    if !result.points.is_empty() {
        result.corner_labels = build_corner_labels(&result.points);
    }

    result.holes.clear();

    if let Some(circle_cut) = &shape_config.circle_cut {
        if circle_cut.enabled {
            if result.shape_type == "circle" {
                return Err("Circle cut is not supported for a base circle shape.".to_string());
            }

            if result.points.len() < 3 {
                return Err("Circle cut requires a polygon shape.".to_string());
            }

            let hole = build_circle_cut(&result.points, &result.corner_labels, circle_cut)?;
            result.holes.push(hole);
        }
    }

    Ok(result)
}

fn build_corner_labels(points: &[Point]) -> Vec<CornerLabel> {
    let center = polygon_center(points);

    let mut indexed = points
        .iter()
        .enumerate()
        .map(|(index, point)| {
            let angle = (point.y - center.y).atan2(point.x - center.x);
            (index, point.clone(), angle)
        })
        .collect::<Vec<_>>();

    indexed.sort_by(|a, b| b.2.partial_cmp(&a.2).unwrap());

    let start_index = indexed
        .iter()
        .enumerate()
        .min_by(|(_, a), (_, b)| {
            let ax = a.1.x;
            let ay = a.1.y;
            let bx = b.1.x;
            let by = b.1.y;

            ay.partial_cmp(&by)
                .unwrap()
                .reverse()
                .then_with(|| ax.partial_cmp(&bx).unwrap())
        })
        .map(|(i, _)| i)
        .unwrap_or(0);

    indexed
        .iter()
        .cycle()
        .skip(start_index)
        .take(indexed.len())
        .enumerate()
        .map(|(i, (_, point, _))| CornerLabel {
            id: format!("c{}", i + 1),
            point: point.clone(),
        })
        .collect()
}

fn build_circle_cut(
    polygon: &[Point],
    corner_labels: &[CornerLabel],
    config: &CircleCutConfig,
) -> Result<CircleData, String> {
    if config.radius <= 0.0 {
        return Err("Circle cut radius must be greater than 0.".to_string());
    }

    let anchor = corner_labels
        .iter()
        .find(|corner| corner.id == config.corner_id)
        .ok_or_else(|| format!("Invalid corner id: {}", config.corner_id))?;

    let center = Point::new(
        anchor.point.x + config.offset_x,
        anchor.point.y + config.offset_y,
    );

    if !point_in_polygon(&center, polygon) {
        return Err("Circle cut center must be inside the shape.".to_string());
    }

    let min_edge_distance = min_distance_to_polygon_edges(&center, polygon);

    if min_edge_distance < config.radius {
        return Err("Circle cut goes outside the shape. Reduce radius or change offsets.".to_string());
    }

    Ok(CircleData {
        center,
        radius: config.radius,
    })
}

fn polygon_center(points: &[Point]) -> Point {
    let x = points.iter().map(|p| p.x).sum::<f64>() / points.len() as f64;
    let y = points.iter().map(|p| p.y).sum::<f64>() / points.len() as f64;
    Point::new(x, y)
}

fn point_in_polygon(point: &Point, polygon: &[Point]) -> bool {
    let mut inside = false;
    let mut j = polygon.len() - 1;

    for i in 0..polygon.len() {
        let pi = &polygon[i];
        let pj = &polygon[j];

        let intersects = ((pi.y > point.y) != (pj.y > point.y))
            && (point.x
                < (pj.x - pi.x) * (point.y - pi.y) / ((pj.y - pi.y).abs().max(f64::EPSILON))
                    + pi.x);

        if intersects {
            inside = !inside;
        }

        j = i;
    }

    inside
}

fn min_distance_to_polygon_edges(point: &Point, polygon: &[Point]) -> f64 {
    let mut min_distance = f64::INFINITY;

    for i in 0..polygon.len() {
        let a = &polygon[i];
        let b = &polygon[(i + 1) % polygon.len()];
        let distance = distance_point_to_segment(point, a, b);

        if distance < min_distance {
            min_distance = distance;
        }
    }

    min_distance
}

fn distance_point_to_segment(point: &Point, a: &Point, b: &Point) -> f64 {
    let abx = b.x - a.x;
    let aby = b.y - a.y;
    let apx = point.x - a.x;
    let apy = point.y - a.y;

    let ab_len_sq = abx * abx + aby * aby;

    if ab_len_sq <= f64::EPSILON {
        return ((point.x - a.x).powi(2) + (point.y - a.y).powi(2)).sqrt();
    }

    let t = ((apx * abx) + (apy * aby)) / ab_len_sq;
    let t = t.clamp(0.0, 1.0);

    let closest_x = a.x + t * abx;
    let closest_y = a.y + t * aby;

    ((point.x - closest_x).powi(2) + (point.y - closest_y).powi(2)).sqrt()
}