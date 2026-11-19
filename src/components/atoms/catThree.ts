/**
 * Only the parts of three.js the dither cat uses, so the bundler can leave the
 * rest of the library out of the lazily loaded chunk.
 */
export {
  AmbientLight,
  AnimationMixer,
  Box3,
  Camera,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshLambertMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
export { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
