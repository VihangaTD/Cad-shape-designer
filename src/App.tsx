import ExportPanel from "./components/exportPanel/ExportPanel";
import AppShell from "./components/layout/AppShell";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PreviewStage from "./components/preview/PreviewStage";
import ShapeEditor from "./components/shapeEditor/ShapeEditor";
import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import { usePreview } from "./hooks/usePreview";

export default function App() {
  usePreview();

  return (
    <AppShell
      header={<Header />}
      sidebar={
        <Sidebar>
          <ShapeLibrary />
          <ShapeEditor />
        </Sidebar>
      }
      preview={<PreviewStage />}
      footer={<ExportPanel />}
    />
  );
}