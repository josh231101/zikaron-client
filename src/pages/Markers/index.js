import React, { useEffect, useState } from "react";
import apiClient from "../../services/axios";

const getResourceType = (url) => {
  const extension = url.split(".").pop();
  if (extension === "gif") {
    return "gif";
  }
  return "image";
};

const Markers = () => {
  const [data, setData] = useState({
    pattUrl: null,
    markerUrl: null,
  });
  const fetchMarkerData = async () => {
    try {
      const qrUrl = window.location.pathname.split("/")[1];
      const response = await apiClient.get(`markers/${qrUrl}`);
      console.log(response);
      setData({
        resourceUrl: response.data.resourceUrl,
        markerUrl: response.data.markerUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMarkerData();
  }, []);

  return (
    <>
      {data.markerUrl && (
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
              url={data.markerUrl}
              raycaster="objects: .clickable"
              emitevents="true"
              cursor="fuse: false; rayOrigin: mouse;"
              registerevents
            >
              {data.resourceUrl &&
              getResourceType(data.resourceUrl) === "gif" ? (
                <a-entity
                  scale="2 2 2"
                  position="0 0 0"
                  rotation="-90 0 0"
                  geometry="primitive:plane"
                  material={`shader:gif;src:url(${data.resourceUrl}); alphaTest:1;`}
                />
              ) : (
                <a-image
                  src={data.resourceUrl}
                  scale="2 2 2"
                  position="1 -1 -1"
                  class="clickable"
                  rotation="-90 0 0"
                  gesture-handler
                />
              )}
            </a-marker>
            <a-entity camera />
          </a-scene>
        </>
      )}
    </>
  );
};

export default Markers;
