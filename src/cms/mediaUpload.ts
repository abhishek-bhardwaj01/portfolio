/** Media upload helpers for Admin */
export const REPO = "abhishek-bhardwaj01/portfolio";
export const IMAGES_DIR = "public/images";
export const RESUME_DIR = "public/resume";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

function safeName(file: File): string {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${base || "file"}-${Date.now()}.${ext || "bin"}`;
}

export async function uploadImageToGitHub(
  token: string,
  file: File
): Promise<{ path: string; error?: string }> {
  if (!file.type.startsWith("image/")) return { path: "", error: "Only image files allowed" };
  if (file.size > 4 * 1024 * 1024) return { path: "", error: "Max 4MB. Compress image first." };
  const filename = safeName(file);
  const repoPath = `${IMAGES_DIR}/${filename}`;
  try {
    const base64 = await fileToBase64(file);
    let sha: string | undefined;
    const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${repoPath}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (getRes.ok) sha = (await getRes.json()).sha;
    const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${repoPath}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `CMS: upload image ${filename}`,
        content: base64,
        branch: "main",
        ...(sha ? { sha } : {}),
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return { path: "", error: err.message || `Upload failed (${putRes.status})` };
    }
    return { path: `/images/${filename}` };
  } catch (e) {
    return { path: "", error: e instanceof Error ? e.message : "Upload failed" };
  }
}

/** Upload PDF resume to public/resume/ */
export async function uploadPdfToGitHub(
  token: string,
  file: File
): Promise<{ path: string; error?: string }> {
  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return { path: "", error: "Only PDF files allowed" };
  if (file.size > 8 * 1024 * 1024) return { path: "", error: "Max 8MB for PDF" };
  const filename = safeName(file);
  const repoPath = `${RESUME_DIR}/${filename}`;
  try {
    const base64 = await fileToBase64(file);
    let sha: string | undefined;
    const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${repoPath}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (getRes.ok) sha = (await getRes.json()).sha;
    const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${repoPath}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `CMS: upload resume ${filename}`,
        content: base64,
        branch: "main",
        ...(sha ? { sha } : {}),
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return { path: "", error: err.message || `Upload failed (${putRes.status})` };
    }
    return { path: `/resume/${filename}` };
  } catch (e) {
    return { path: "", error: e instanceof Error ? e.message : "Upload failed" };
  }
}
