import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Markers from "./pages/Markers";
import NoFound from "./components/NoFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div class="arjs-loader">
                <div>Loading, please wait...</div>
              </div>

              <a-scene
                vr-mode-ui="enabled: false;"
                renderer="logarithmicDepthBuffer: true;"
                embedded
                arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
              >
                <a-marker
                  id="animated-marker"
                  type="pattern"
                  preset="custom"
                  url="https://cdn.glitch.global/eeeb09e1-bf3f-426f-8fa9-dd8118624eba/test.patt"
                  raycaster="objects: .clickable"
                  emitevents="true"
                  cursor="fuse: false; rayOrigin: mouse;"
                >
                  <a-image
                    src="https://cdn.glitch.global/0861cd4c-c8be-4df4-806d-586cab6b9b00/1.jpg"
                    scale="2 2 2"
                    position="1 -1 -1"
                    class="clickable"
                    rotation="-90 0 0"
                    gesture-handler
                  />
                </a-marker>
                <a-entity camera />
              </a-scene>
            </>
          }
        />
        <Route path="/:qrUrl" element={<Markers />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
