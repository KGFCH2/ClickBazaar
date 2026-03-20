const parseJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export async function getProductDescription(productName: string, category: string): Promise<string> {
  try {
    const res = await fetch('/api/genai/description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName, category }),
    });

    if (!res.ok) {
      return "";
    }

    const data = (await parseJson(res)) as { description?: string } | null;
    return data?.description || "";
  } catch {
    return "";
  }
}

export async function getSmartRecommendations(cartItems: string[]): Promise<string[]> {
  if (cartItems.length === 0) return [];

  try {
    const res = await fetch('/api/genai/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    });

    if (!res.ok) {
      return [];
    }

    const data = (await parseJson(res)) as { recommendations?: string[] } | null;
    return data?.recommendations || [];
  } catch {
    return [];
  }
}
