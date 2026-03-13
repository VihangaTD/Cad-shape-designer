# CAD Shape Designer

A **desktop CAD-style shape designer** built using **React, TypeScript, TailwindCSS, and Tauri (Rust)**.
The application allows users to create parametric shapes, preview them with dimensions, and export them as **PNG images or DXF CAD files**.

The system uses **Rust for geometry computation and export generation**, while the **React frontend provides an interactive UI and vector preview rendering using Canvas**.

---

# Features

* Parametric shape creation
* Live vector preview
* Shape transformations

  * Rotation (0°, 90°, 180°, 270°)
  * Flip X
  * Flip Y
* Dimension visualization
* Shape measurements
* PNG export
* Detailed PNG export (with dimensions)
* DXF export for CAD software
* Grid rendering
* Zoom and pan controls

Supported shapes:

* Rectangle
* Triangle
* Circle
* Trapezoid
* L-Shape

---

# Technologies Used

Frontend

* React (19.1.0)
* TypeScript (5.8.3)
* Vite
* TailwindCSS (4.2.1)
* Canvas API
* Zustand (5.0.11)

Desktop Framework

* Tauri (2)

Backend

* Rust

File Export

* PNG (Canvas rendering)
* DXF (custom ASCII writer)

---

# System Architecture

The application uses a **hybrid architecture combining React UI with a Rust geometry engine**.

```
User Interaction
       ↓
React UI
       ↓
Zustand Stores
       ↓
Tauri Commands
       ↓
Rust Geometry Engine
       ↓
Preview Response
       ↓
Canvas Vector Rendering
       ↓
PNG / DXF Export
```

Frontend responsibilities:

* UI rendering
* Shape parameter editing
* Preview rendering
* Export triggers

Backend responsibilities:

* Shape geometry generation
* Transformations
* Bounds calculation
* Dimension generation
* DXF export generation
* File system operations

---

# Project Structure

## Frontend

```
src
│
├─ assets
│
├─ components
│  ├─ layout
│  │  ├─ AppShell.tsx
│  │  ├─ Header.tsx
│  │  └─ Panel.tsx
│  │
│  ├─ preview
│  │  ├─ drawDimensions.ts
│  │  ├─ drawGrid.ts
│  │  ├─ drawShapeVector.ts
│  │  ├─ fitToViewport.ts
│  │  ├─ PreviewStage.tsx
│  │  ├─ PreviewToolbar.tsx
│  │  ├─ renderPreviewToCanvas.ts
│  │  ├─ ShapePreviewCanvas.tsx
│  │  └─ worldToCanvas.ts
│  │
│  ├─ shapeEditor
│  │  ├─ FlipControl.tsx
│  │  ├─ ParameterInput.tsx
│  │  ├─ RotationControl.tsx
│  │  └─ ShapeEditor.tsx
│  │
│  ├─ shapeLibrary
│  │  └─ ShapeLibrary.tsx
│  │
│  └─ exportPanel
│     └─ ExportPanel.tsx
│
├─ export
│  ├─ filenames.ts
│  └─ png.ts
│
├─ hooks
│  └─ usePreview.ts
│
├─ shape-meta
│  ├─ rectangle.ts
│  ├─ triangle.ts
│  ├─ circle.ts
│  ├─ trapezoid.ts
│  └─ lshape.ts
│
├─ store
│  ├─ shapeStore.ts
│  ├─ previewStore.ts
│  └─ uiStore.ts
│
├─ tauri
│  ├─ commands.ts
│  └─ mappers.ts
│
├─ types
│  ├─ shape.ts
│  ├─ geometry.ts
│  ├─ dimension.ts
│  └─ preview.ts
│
├─ utils
│  ├─ canvas.ts
│  └─ snap.ts
│
├─ App.tsx
├─ main.tsx
└─ App.css
```

---

## Backend (Rust)

```
src-tauri
│
├─ commands
│  ├─ export_dxf.rs
│  ├─ export_png.rs
│  └─ file_io.rs
│
├─ shapes
│  ├─ rectangle.rs
│  ├─ triangle.rs
│  ├─ circle.rs
│  ├─ trapezoid.rs
│  └─ lshape.rs
│
├─ geometry
│  ├─ transform.rs
│  ├─ normalize.rs
│  ├─ bounds.rs
│  └─ dimensions
│     ├─ rectangle_dims.rs
│     ├─ triangle_dims.rs
│     ├─ circle_dims.rs
│     ├─ trapezoid_dims.rs
│     └─ lshape_dims.rs
│
├─ dxf
│  ├─ writer.rs
│  ├─ outline.rs
│  ├─ annotations.rs
│  └─ layers.rs
│
├─ models
│  ├─ shape_config.rs
│  ├─ preview_response.rs
│  ├─ dimension_data.rs
│  ├─ point.rs
│  └─ bounds.rs
│
├─ svg
│  ├─ renderer.rs
│  ├─ paths.rs
│  └─ style.rs
│
├─ main.rs
└─ lib.rs
```

---

# Build Instructions

## Prerequisites

Install the following tools:

Node.js (v18 or newer)

```
node -v
npm -v
```

Rust

```
rustc --version
cargo --version
```

Windows users must install:

Visual Studio Build Tools with:

* C++ build tools
* Windows SDK

---

# Installation

Clone the repository:

```
git clone <repository-url>
cd tauri-cad-shape-designer
```

Install frontend dependencies:

```
npm install
```

---

# Running the Application

Start the development environment:

```
npm run tauri dev
```

This will:

1. Start the Vite development server
2. Compile the Rust backend
3. Launch the desktop application

---

# Production Build

To build the production application:

```
npm run tauri build
```

The generated installer will be available in:

```
src-tauri/target/release/bundle
```

---

# Geometry Implementation

The geometry engine is implemented in **Rust** and serves as the **single source of truth for shape generation**.

The pipeline consists of the following steps.

### 1. Shape generation

Each shape module generates its base geometry from parameters.

Example rectangle points:

```
(0,0)
(width,0)
(width,height)
(0,height)
```

Files responsible:

```
src-tauri/src/shapes/
```

---

### 2. Transformations

Shapes support:

* rotation
* horizontal flip
* vertical flip

Transformations are implemented in:

```
geometry/transform.rs
```

All transformations are applied around the **shape center**.

---

### 3. Bounds calculation

After transformations, bounds are calculated:

```
minX
minY
maxX
maxY
```

These bounds are used for:

* viewport fitting
* normalization
* dimension placement

---

### 4. Geometry normalization

Geometry is normalized so that the shape fits inside a positive coordinate space.

This simplifies:

* preview rendering
* DXF export
* coordinate consistency

---

### 5. Dimension generation

Dimensions are generated for each shape in dedicated modules.

```
geometry/dimensions/
```

Examples:

* rectangle_dims.rs
* triangle_dims.rs
* circle_dims.rs
* trapezoid_dims.rs
* lshape_dims.rs

Dimension data includes:

* dimension line
* extension lines
* arrowheads
* label text
* label position

---

# Preview Rendering

The frontend renders shapes using the **Canvas API with vector drawing**.

Rendering pipeline:

```
clear canvas
draw grid
fit geometry to viewport
render shape vector
render dimension lines
render labels
```

Key files:

```
drawShapeVector.ts
drawDimensions.ts
fitToViewport.ts
worldToCanvas.ts
renderPreviewToCanvas.ts
```

This approach ensures:

* crisp rendering
* resolution independence
* consistent export results

---

# Export Implementation

## PNG Export

PNG export is implemented using **offscreen canvas rendering**.

Process:

1. Render preview to hidden canvas
2. Optionally include dimensions
3. Convert canvas to PNG
4. Send image data to Rust
5. Save file using system dialog

Files:

```
export/png.ts
exportPanel/ExportPanel.tsx
commands/export_png.rs
```

Two export modes are supported:

* PNG (shape only)
* Detailed PNG (shape + dimensions)

---

## DXF Export

DXF export is implemented using a **custom ASCII DXF writer in Rust**.

Steps:

1. Generate geometry
2. Apply transformations
3. Normalize coordinates
4. Generate dimensions
5. Write DXF entities

Files:

```
dxf/writer.rs
dxf/outline.rs
dxf/annotations.rs
dxf/layers.rs
commands/export_dxf.rs
```

DXF layers used:

```
OUTLINE
DIMENSIONS
```

---

# Measurements

The preview displays dynamic measurements including:

* width
* height
* shape area

These values update automatically when:

* parameters change
* rotation changes
* flips are applied
