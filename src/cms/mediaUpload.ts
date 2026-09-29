/** Media upload helpers for Admin */
export const REPO = "abhishek-bhardwaj01/portfolio";
export const IMAGES_DIR = "public/images";

export async function uploadImageToGitHub(
  token: string,
  file: File
): Promise<{ path: string; error?: string }> {
  if (!file.type.startsWith("image/")) return { path: "", error: "Only image files allowed" };
  if (file.size > 4 * 1024 * 1024) return { path: "", error: "Max 4MB. Compress image first." };
  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safe = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const filename = `${safe || "image"}-${Date.now()}.${ext || "png"}`;
  const repoPath = `${IMAGES_DIR}/${filename}`;
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Read failed"));
    reader.readAsDataURL(file);
  });
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
}
