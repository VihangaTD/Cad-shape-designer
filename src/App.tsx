import { useRef } from "react";
import { usePreview } from "./hooks/usePreview";
import AppShell from "./components/layout/AppShell";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import ShapeEditor from "./components/shapeEditor/ShapeEditor";
import CircleCutEditor from "./components/shapeEditor/CircleCutEditor";
import PreviewStage from "./components/preview/PreviewStage";
import ExportPanel from "./components/exportPanel/ExportPanel";

export default function App() {
  usePreview();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <AppShell
      header={<Header />}
      sidebar={
        <Sidebar>
          <ShapeLibrary />
          <ShapeEditor />
          <CircleCutEditor />
        </Sidebar>
      }
      preview={<PreviewStage canvasRef={canvasRef} />}
      footer={<ExportPanel canvasRef={canvasRef} />}
    />
  );
}