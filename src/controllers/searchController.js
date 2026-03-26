import { fetchShoppingResults } from "../services/serpService.js";

/**
 * Validates query, calls service layer, returns normalized results.
 * Controller: request/response handling and validation only.
 *
 * Future extensions:
 * - product history: log or store search results for history view
 */
export async function searchProducts(req, res) {
  try {
    const query = (req.query.q || "").trim();
    if (!query) {
      return res.status(400).json({
        error: "Missing or empty query",
        message: "Provide a search term via query parameter: ?q=product name",
      });
    }

    const apiKey = process.env.SERP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Server configuration error",
        message: "SERP_API_KEY is not set in environment",
      });
    }

    const results = await fetchShoppingResults(query, apiKey);

    return res.json({
      query,
      results,
      count: results.length,
    });
  } catch (err) {
    if (err.response?.status === 401) {
      return res.status(502).json({
        error: "External API error",
        message: "Invalid or missing SerpAPI key",
      });
    }
    if (err.code === "ECONNABORTED" || err.response?.status >= 500) {
      return res.status(502).json({
        error: "External API error",
        message: "SerpAPI is temporarily unavailable. Try again later.",
      });
    }
    console.error("Search error:", err.message);
    return res.status(500).json({
      error: "Search failed",
      message: err.message || "An unexpected error occurred",
    });
  }
}
