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

    let points = polygon_points(&geometry.points);

    format!(
        r#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}">
  <polygon points="{points}" fill="{FILL_COLOR}" stroke="{STROKE_COLOR}" stroke-width="{STROKE_WIDTH}" />
</svg>"#
    )
}