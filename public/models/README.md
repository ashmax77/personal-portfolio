# 3D World Models (`public/models/`)

Place your exported Blender scene here:

1. Export from Blender as **glTF 2.0 (`.glb`)** to `public/models/world.glb`.
2. Name the six interactive building collections/objects in Blender using these exact identifiers so click and hover bindings attach automatically:
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

When `public/models/world.optimized.glb` is present, `WorldCanvas` automatically renders it. Until then, the procedural low-poly campus is used as a fallback.
