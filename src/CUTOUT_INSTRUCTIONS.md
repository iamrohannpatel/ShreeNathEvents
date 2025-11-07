Generate a high-quality background-free cutout for `Shivam.jpg`

Recommended (local, free) approach using `rembg` (Python):

1) Install Python (if you don't have it) and create a venv (optional):

   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

2) Install rembg and pillow:

   pip install rembg pillow

3) Run rembg to remove the background and write a transparent PNG:

   rembg i path\to\Shivam.jpg path\to\Shivam-cutout.png

   Example (assuming project root and `Shivam.jpg` in public/):

   rembg i public\Shivam.jpg public\Shivam-cutout.png

4) Verify the generated `public\Shivam-cutout.png` has transparency (open in image viewer). Then run the app — it will automatically pick up `/Shivam-cutout.png` if present.

Notes:
- `rembg` is fast and usually gives excellent results, but for the highest fidelity you can touch up edges in an editor (Photoshop, GIMP, Photopea).
- The app also supports uploading a PNG in-browser via the ‘Upload transparent PNG’ control while previewing locally.
- If the cutout filename is missing or invalid the app falls back to `/Shivam.jpg` automatically.