/**
 * Normalizes SerpAPI Google Shopping response to a consistent shape.
 * Only returns essential fields for the MVP.
 *
 * Future extensions:
 * - retailer filters: filter by store name before returning
 */
export function normalizeShoppingResults(serpResponse) {
  if (!serpResponse?.shopping_results) {
    return [];
  }

  return serpResponse.shopping_results.map((item) => ({
    store: item.source || "Unknown",
    price: item.extracted_price != null ? `$${item.extracted_price}` : item.price?.raw ?? "N/A",
    title: item.title || "",
    link: item.link || item.product_link || "#",
  }));
}
