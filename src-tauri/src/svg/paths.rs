use crate::models::point::Point;

pub fn polygon_points(points: &[Point]) -> String {
    points
        .iter()
        .map(|p| format!("{},{}", p.x, p.y))
        .collect::<Vec<_>>()
        .join(" ")
}