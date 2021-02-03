import React from "react";
import { Canvas } from "react-three-fiber";

function Box(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.1} attach="material" color={"red"} />
    </mesh>
  );
}

export default function threeDimensions() {
  return (
    <>
      <Canvas>
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
}
