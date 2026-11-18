# 3D World Models (`public/models/`)

You can swap in Blender `.glb` assets in **two ways**:

## Option A — Full Combined Island (`world.optimized.glb`)
1. Export your entire Blender scene as **glTF 2.0 (`.glb`)** to `public/models/world.glb`.
2. Name the six interactive building collections/objects in Blender using these exact identifiers:
   - `DEVELOPER_HQ`
   - `PROJECT_LAB`
   - `TECHNOLOGY_CENTER`
   - `ACADEMY`
   - `ACHIEVEMENT_HALL`
   - `CONTACT_HUB` (or `COMMUNICATION_HUB`)
3. Inspect and optimize within the 2–4 MB initial download budget:

```bash
npm run model:inspect
npm run model:optimize
```

When `public/models/world.optimized.glb` is present, `WorldCanvas` automatically renders it.

## Option B — Individual Landmark & Creature `.glb` Files
Drop individual `.glb` files into `public/models/` (for example `developer-hq.glb`, `project-lab.glb`, `bird.glb`, `drone.glb`) and set their path/scale in [`src/lib/modelManifest.ts`](../../src/lib/modelManifest.ts):

```ts
export const LANDMARK_MODELS = {
  "developer-hq": { path: "/models/developer-hq.glb", scale: 1.2 },
  ...
};
```

Embedded `.glb` animations (such as flapping birds or rotating dishes) play automatically in **Live** mode and fall back to the built-in procedural 3D models if any file is omitted.
