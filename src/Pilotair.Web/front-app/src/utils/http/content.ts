export function bodyStringify(contentType: string, body: unknown) {
  if (!body) return undefined;

  switch (contentType) {
    case "application/x-www-form-urlencoded": {
      const formData = new FormData();
      if (typeof body == "object") {
        for (const key in body) {
          formData.append(key, body[key as keyof typeof body]);
        }
      }
      return formData;
    }

    default:
      return JSON.stringify(body);
  }
}

export async function bodyParse(response: Response) {
  const responseType = response.headers.get("Content-Type");

  if (responseType?.includes("application/json")) {
    return await response.json();
  }
  // other todo
  return Promise.resolve();
}
