import { Monograph, MonographSchema } from '../../schemas/Monograph';

const DAILYMED_API_BASE = 'https://dailymed.nlm.nih.gov/dailymed/services/v2';

/**
 * Fetches drug information from the DailyMed API.
 *
 * @param drugName The generic name of the drug to search for.
 * @returns A promise that resolves to the raw JSON data from the DailyMed API, or null if not found.
 */
export async function fetchDailyMedData(drugName: string): Promise<any | null> {
  try {
    // Step 1: Search for the drug to get its SETID
    const searchUrl = `${DAILYMED_API_BASE}/spls.json?drug_name=${encodeURIComponent(drugName)}`;
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      console.error(`Error fetching drug list from DailyMed: ${searchResponse.statusText}`);
      return null;
    }

    const searchResult = await searchResponse.json();

    if (!searchResult.data || searchResult.data.length === 0) {
      console.warn(`No results found for drug: ${drugName}`);
      return null;
    }

    // For simplicity, use the first result
    const setid = searchResult.data[0].setid;

    // Step 2: Fetch the full SPL document using the SETID
    const splUrl = `${DAILYMED_API_BASE}/spls/${setid}.json`;
    const splResponse = await fetch(splUrl);

    if (!splResponse.ok) {
      console.error(`Error fetching SPL document for SETID ${setid}: ${splResponse.statusText}`);
      return null;
    }

    const splData = await splResponse.json();
    return splData;

  } catch (error) {
    console.error(`An error occurred while fetching data from DailyMed for ${drugName}:`, error);
    return null;
  }
}

/**
 * Parses the raw SPL data from DailyMed and maps it to the Monograph schema.
 *
 * @param splData The raw JSON data from the DailyMed API for a specific SPL.
 * @returns A monograph object that conforms to the MonographSchema, or null if parsing fails.
 */
export function parseDailyMedData(splData: any): Partial<Monograph> | null {
  if (!splData) {
    return null;
  }

  // This is a placeholder for the parsing logic.
  // The structure of the SPL JSON is complex and will require careful mapping.
  // For now, we will return a simplified object.

  const monograph: Partial<Monograph> = {
    genericName: splData.spl?.set?.generic_name || 'Unknown',
    indications: splData.spl?.indications_and_usage || [],
    dosing: splData.spl?.dosage_and_administration || '',
    contraindications: splData.spl?.contraindications || [],
    adverseEvents: splData.spl?.adverse_reactions || [],
    citations: [`DailyMed SETID: ${splData.spl?.set?.id}`],
  };

  return monograph;
}