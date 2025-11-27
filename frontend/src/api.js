
const API_BASE_URL = "http://localhost:4000/api";

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${path} -> ${res.status}`);
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) {
    throw new Error(`DELETE ${path} -> ${res.status}`);
  }
}

export async function fetchActions(category) {
  const url =
    category && category !== "Todas"
      ? `/actions?category=${encodeURIComponent(category)}`
      : "/actions";
  return apiGet(url); // [{... , impact: {savedKwh,...}}]
}

export async function fetchSummary() {
  return apiGet("/actions/summary");
}

export async function createAction(payload) {
  return apiPost("/actions", payload);
}

export async function deleteAction(id) {
  return apiDelete(`/actions/${id}`);
}

export async function clearActions() {
  return apiDelete("/actions");
}
