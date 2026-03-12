use crate::models::point::Point;

pub struct DxfWriter {
    content: String,
}

impl DxfWriter {
    pub fn new() -> Self {
        let mut writer = Self {
            content: String::new(),
        };

        writer.write_header();
        writer.write_tables();
        writer.start_entities_section();

        writer
    }

    fn pair<T: ToString>(&mut self, code: i32, value: T) {
        self.content
            .push_str(&format!("{code}\n{}\n", value.to_string()));
    }

    fn write_header(&mut self) {
        self.pair(0, "SECTION");
        self.pair(2, "HEADER");

        self.pair(9, "$ACADVER");
        self.pair(1, "AC1009");

        self.pair(9, "$INSUNITS");
        self.pair(70, 4); // millimeters

        self.pair(0, "ENDSEC");
    }

    fn write_tables(&mut self) {
        self.pair(0, "SECTION");
        self.pair(2, "TABLES");

        self.write_ltype_table();
        self.write_layer_table();

        self.pair(0, "ENDSEC");
    }

    fn write_ltype_table(&mut self) {
        self.pair(0, "TABLE");
        self.pair(2, "LTYPE");
        self.pair(70, 2);

        self.pair(0, "LTYPE");
        self.pair(2, "CONTINUOUS");
        self.pair(70, 0);
        self.pair(3, "Solid line");
        self.pair(72, 65);
        self.pair(73, 0);
        self.pair(40, 0.0);

        self.pair(0, "LTYPE");
        self.pair(2, "CENTER");
        self.pair(70, 0);
        self.pair(3, "Center ____ _ ____ _ ____");
        self.pair(72, 65);
        self.pair(73, 4);
        self.pair(40, 2.0);
        self.pair(49, 1.25);
        self.pair(49, -0.25);
        self.pair(49, 0.25);
        self.pair(49, -0.25);

        self.pair(0, "ENDTAB");
    }

    fn write_layer_table(&mut self) {
        self.pair(0, "TABLE");
        self.pair(2, "LAYER");
        self.pair(70, 3);

        self.write_layer("OUTLINE", 7, "CONTINUOUS");
        self.write_layer("DIMENSIONS", 1, "CONTINUOUS");
        self.write_layer("CENTERLINES", 5, "CENTER");

        self.pair(0, "ENDTAB");
    }

    fn write_layer(&mut self, name: &str, color: i32, ltype: &str) {
        self.pair(0, "LAYER");
        self.pair(2, name);
        self.pair(70, 0);
        self.pair(62, color);
        self.pair(6, ltype);
    }

    fn start_entities_section(&mut self) {
        self.pair(0, "SECTION");
        self.pair(2, "ENTITIES");
    }

    pub fn add_line(&mut self, layer: &str, start: &Point, end: &Point) {
        self.pair(0, "LINE");
        self.pair(8, layer);
        self.pair(10, start.x);
        self.pair(20, start.y);
        self.pair(30, 0.0);
        self.pair(11, end.x);
        self.pair(21, end.y);
        self.pair(31, 0.0);
    }

    pub fn add_circle(&mut self, layer: &str, center: &Point, radius: f64) {
        self.pair(0, "CIRCLE");
        self.pair(8, layer);
        self.pair(10, center.x);
        self.pair(20, center.y);
        self.pair(30, 0.0);
        self.pair(40, radius);
    }

    pub fn add_text(&mut self, layer: &str, position: &Point, height: f64, text: &str) {
        self.pair(0, "TEXT");
        self.pair(8, layer);
        self.pair(10, position.x);
        self.pair(20, position.y);
        self.pair(30, 0.0);
        self.pair(40, height);
        self.pair(1, text);
        self.pair(7, "STANDARD");
    }

    pub fn finish(mut self) -> String {
        self.pair(0, "ENDSEC");
        self.pair(0, "EOF");
        self.content
    }
}