import axios from "axios";
import { normalizeShoppingResults } from "../utils/normalizeResults.js";

const SERP_BASE = "https://serpapi.com/search.json";

/**
 * Fetches product prices from SerpAPI Google Shopping.
 * Service layer: only responsible for calling the external API.
 *
 * Future extensions:
 * - price tracking: persist results and compare over time
 * - price alerts: check against user-defined target price
 */
export async function fetchShoppingResults(query, apiKey) {
  const { data } = await axios.get(SERP_BASE, {
    params: {
      engine: "google_shopping",
      q: query,
      api_key: apiKey,
    },
    timeout: 15000,
  });

  return normalizeShoppingResults(data);
}
