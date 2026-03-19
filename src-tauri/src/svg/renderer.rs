use crate::geometry::bounds::calculate_bounds;
use crate::models::shape_geometry::ShapeGeometry;
use crate::svg::paths::polygon_points;
use crate::svg::style::{FILL_COLOR, STROKE_COLOR, STROKE_WIDTH};

pub fn render_svg(geometry: &ShapeGeometry) -> String {
    let bounds = calculate_bounds(geometry);
    let width = bounds.width() + 80.0;
    let height = bounds.height() + 80.0;
    let view_box = format!("0 0 {} {}", width, height);

    if let Some(circle) = &geometry.circle {
        return format!(
            r#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}">
  <circle cx="{}" cy="{}" r="{}" fill="{FILL_COLOR}" stroke="{STROKE_COLOR}" stroke-width="{STROKE_WIDTH}" />
</svg>"#,
            circle.center.x, circle.center.y, circle.radius
        );
    }

    let path_data = build_polygon_with_holes_path(geometry);

    format!(
        r#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}">
  <path d="{path_data}" fill="{FILL_COLOR}" stroke="{STROKE_COLOR}" stroke-width="{STROKE_WIDTH}" fill-rule="evenodd" />
</svg>"#
    )
}

fn build_polygon_with_holes_path(geometry: &ShapeGeometry) -> String {
    let mut path = String::new();

    if !geometry.points.is_empty() {
        let first = &geometry.points[0];
        path.push_str(&format!("M {} {} ", first.x, first.y));

        for point in geometry.points.iter().skip(1) {
            path.push_str(&format!("L {} {} ", point.x, point.y));
        }

        path.push_str("Z ");
    }

    for hole in &geometry.holes {
        path.push_str(&circle_path(hole.center.x, hole.center.y, hole.radius));
        path.push(' ');
    }

    path.trim().to_string()
}

fn circle_path(cx: f64, cy: f64, r: f64) -> String {
    format!(
        "M {} {} \
         a {} {} 0 1 0 {} 0 \
         a {} {} 0 1 0 {} 0 Z",
        cx - r,
        cy,
        r,
        r,
        2.0 * r,
        r,
        r,
        -2.0 * r
    )
}