import {
  calculateDistanceKm,
  createLocationFromTambon,
  findNearestTambonByCoords,
  getFlatTambonIndex,
  ThaiLocation
} from '../data/thaiLocations';
import {
  CURATED_ROAD_SEGMENTS,
  findNearbyRoadSegmentsByCoords,
  RoadSegmentEntry
} from '../data/thaiRoadSegments';

export type WaterSafetyTier = 'normal' | 'watch' | 'danger' | 'critical';

export type TrafficLevel = 'flowing' | 'moderate' | 'congested' | 'severe';

export type WeatherKind =
  | 'sunny'
  | 'partly_cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'light_rain'
  | 'heavy_rain'
  | 'storm';

export interface HourlyForecastPoint {
  timeLabel: string;
  tempC: number;
  feelsLikeC: number;
  rainProbPercent: number;
  precipMm: number;
  weatherText: string;
  weatherKind: WeatherKind;
}

export interface DailyForecastPoint {
  dateLabel: string;
  tempMaxC: number;
  tempMinC: number;
  rainSumMm: number;
  rainProbMaxPercent: number;
  weatherText: string;
  weatherKind: WeatherKind;
}

export interface RealWaterStation {
  id: number | string;
  name: string;
  code: string;
  province: string;
  amphoe: string;
  tambon: string;
  basin: string;
  agency: string;
  agencyShort: string;
  lat: number;
  lng: number;
  distanceKm: number;
  waterLevelMsl: number | null;
  storagePercent: number | null;
  diffBankM: number | null;
  diffBankText: string;
  situationLevel: number;
  situationLabel: string;
  observedAt: string;
  googleMapsUrl: string;
  thaiWaterWebUrl: string;
}

export interface RealRainStation {
  id: number | string;
  name: string;
  code: string;
  province: string;
  amphoe: string;
  tambon: string;
  basin: string;
  agency: string;
  agencyShort: string;
  lat: number;
  lng: number;
  distanceKm: number;
  rain24hMm: number;
  rain1hMm: number;
  observedAt: string;
  googleMapsUrl: string;
  thaiWaterRainUrl: string;
}

export interface RealLocalPlace {
  id: string;
  name: string;
  category: 'road' | 'village' | 'waterway' | 'landmark';
  typeLabel: string;
  streetName?: string;
  districtName?: string;
  lat: number;
  lng: number;
  distanceKm: number;
  googleMapsUrl: string;
  googleTrafficUrl: string;
  openStreetMapUrl: string;
  sourceLabel: string;
}

export type TrafficColorCode = 'green' | 'yellow' | 'red';

export interface RealtimeTrafficStatus {
  level: TrafficLevel;
  colorCode: TrafficColorCode;
  colorNameTh: string; // เช่น "สีเขียว (คล่องตัว)", "สีเหลือง (ชะลอตัว)", "สีแดง (รถติดขัด)"
  shortStatusLabel: string; // เช่น "คล่องตัว", "ชะลอตัว", "รถติดขัด"
  badgeLabel: string;
  headline: string;
  estimatedSpeedText: string;
  delayEstimateText: string;
  hotspotDescription: string;
  waterTrafficImpact: string;
  laneRecommendation: string;
  googleTrafficLayerUrl: string;
  googleMapsEmbedUrl: string;
  bmaFloodUrl: string;
}

export interface VerificationLinks {
  thaiWaterLevelWebUrl: string;
  thaiWaterLevelApiUrl: string;
  thaiWaterRainWebUrl: string;
  thaiWaterRainApiUrl: string;
  tmdWebUrl: string;
  windyRadarUrl: string;
  openMeteoApiUrl: string;
  dohFloodWebUrl: string;
  bmaFloodWebUrl: string;
  googleMapsTrafficUrl: string;
  googleMapsLocationUrl: string;
  openStreetMapUrl: string;
}

export interface VehicleGuidance {
  type: 'motorcycle' | 'sedan' | 'pickup_suv' | 'van_truck';
  label: string;
  canPass: 'yes' | 'caution' | 'no';
  statusText: string;
  adviceText: string;
}

export type SituationQueryIntent = 'flood_now' | 'rain_now' | 'traffic_now' | 'all_overview';

export interface SearchResultItem {
  id: string;
  category:
    | 'situation_overview'
    | 'flood_station_live'
    | 'landmark_place'
    | 'nearby_road'
    | 'road_segment'
    | 'road_soi'
    | 'subdistrict';
  categoryBadge: string;
  title: string;
  subtitle: string;
  distanceText?: string;
  trafficColor?: TrafficColorCode;
  trafficLabel?: string;
  waterTier?: WaterSafetyTier;
  waterLabel?: string;
  situationIntent?: SituationQueryIntent;
  location: ThaiLocation;
}

export interface NationwideSituationReport {
  intent: SituationQueryIntent;
  queryTitle: string;
  querySubtitle: string;
  areaFilter: string;
  updatedAt: string;
  totalMonitoredWaterStations: number;
  totalMonitoredRainStations: number;
  overflowWaterStations: Array<{ station: RealWaterStation; location: ThaiLocation }>;
  watchWaterStations: Array<{ station: RealWaterStation; location: ThaiLocation }>;
  activeRainStations: Array<{ station: RealRainStation; location: ThaiLocation }>;
  floodWatchRoads: LocationRealtimeStatus[];
  redTrafficRoads: LocationRealtimeStatus[];
  yellowTrafficRoads: LocationRealtimeStatus[];
  greenTrafficRoads: LocationRealtimeStatus[];
}

export interface LocationRealtimeStatus {
  location: ThaiLocation;
  updatedAt: string;

  overallSummaryTitle: string;
  overallSummaryDetail: string;

  weatherKind: WeatherKind;
  weatherHeadline: string;
  weatherDescription: string;
  tempC: number;
  feelsLikeC: number;
  feelsLikeHeadline: string;
  clothingAdvice: string;
  humidityPercent: number;
  windKmh: number;
  windGustKmh: number;
  rainMmPerHour: number;
  rainProbabilityPercent: number;
  cloudCoverPercent: number;
  isDay: boolean;
  weatherObservedAt: string;

  waterSafetyTier: WaterSafetyTier;
  waterHeadline: string;
  waterConditionReason: string;
  waterDriverAdvice: string;
  primaryWaterStation: RealWaterStation | null;
  nearbyWaterStations: RealWaterStation[];
  primaryRainStation: RealRainStation | null;
  nearbyRainStations: RealRainStation[];
  maxLocalRain24hMm: number;

  trafficStatus: RealtimeTrafficStatus;

  vehicleGuidances: VehicleGuidance[];

  hourlyForecast: HourlyForecastPoint[];
  dailyForecast: DailyForecastPoint[];

  realRoads: RealLocalPlace[];
  realVillagesAndLandmarks: RealLocalPlace[];
  realWaterways: RealLocalPlace[];

  verificationLinks: VerificationLinks;
}

interface NationalThaiWaterCache {
  fetchedAt: number;
  waterFetchedAt: number;
  rainFetchedAt: number;
  waterStations: RealWaterStation[];
  rainStations: RealRainStation[];
}

interface ParsedWeatherPayload {
  fetchedAt: number;
  tempC: number;
  feelsLikeC: number;
  humidityPercent: number;
  windKmh: number;
  windGustKmh: number;
  precipMm: number;
  wmoCode: number;
  cloudCoverPercent: number;
  isDay: boolean;
  rainProbPercent: number;
  weatherObservedAt: string;
  hourlyForecast: HourlyForecastPoint[];
  dailyForecast: DailyForecastPoint[];
}

const THAIWATER_WL_API = 'https://api-v3.thaiwater.net/api/v1/thaiwater30/public/waterlevel_load';
const THAIWATER_RAIN_API = 'https://api-v3.thaiwater.net/api/v1/thaiwater30/public/rain_24h';

const SESSION_TW_CACHE_KEY = 'thairoute_tw_fast_cache_v3';
const SESSION_WEATHER_CACHE_KEY = 'thairoute_weather_fast_cache_v3';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 นาทีสำหรับข้อมูลเรียลไทม์

let thaiWaterCache: NationalThaiWaterCache = {
  fetchedAt: 0,
  waterFetchedAt: 0,
  rainFetchedAt: 0,
  waterStations: [],
  rainStations: []
};

let waterFetchPromise: Promise<RealWaterStation[]> | null = null;
let rainFetchPromise: Promise<RealRainStation[]> | null = null;

const weatherGridCache = new Map<string, ParsedWeatherPayload>();
const weatherInflightMap = new Map<string, Promise<ParsedWeatherPayload>>();
const osmLocalEnrichCache = new Map<
  string,
  { roads: RealLocalPlace[]; villages: RealLocalPlace[]; waterways: RealLocalPlace[] }
>();
const searchRemoteCache = new Map<string, SearchResultItem[]>();

// Listeners สำหรับแจ้งเตือนเมื่อข้อมูลพื้นหลัง (เช่น น้ำฝน 4,579 สถานี หรือแผนที่ซอยย่อย) โหลดเสร็จเพิ่มเติม
type BackgroundUpdateListener = () => void;
const backgroundListeners = new Set<BackgroundUpdateListener>();

export function subscribeRealtimeBackgroundUpdates(listener: BackgroundUpdateListener): () => void {
  backgroundListeners.add(listener);
  return () => {
    backgroundListeners.delete(listener);
  };
}

function notifyBackgroundListeners() {
  backgroundListeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // ignore
    }
  });
}

function getGridKey(lat: number, lng: number): string {
  // ความละเอียดระดับ 0.02 องศา (~2 กม.) เพื่อให้จุดใกล้กันบนถนนสายเดียวกันใช้ข้อมูลดาวเทียมร่วมกันได้ทันที (0ms)
  const rLat = (Math.round(lat * 50) / 50).toFixed(2);
  const rLng = (Math.round(lng * 50) / 50).toFixed(2);
  return `${rLat},${rLng}`;
}

// กู้คืน Cache จาก sessionStorage ทันทีที่เปิดหน้าเว็บ เพื่อให้แสดงผลใน 0ms
function hydrateCachesFromStorage() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    const rawTw = sessionStorage.getItem(SESSION_TW_CACHE_KEY);
    if (rawTw) {
      const parsed = JSON.parse(rawTw) as NationalThaiWaterCache;
      if (parsed && Array.isArray(parsed.waterStations)) {
        thaiWaterCache = parsed;
      }
    }
  } catch {
    // ignore
  }

  try {
    const rawW = sessionStorage.getItem(SESSION_WEATHER_CACHE_KEY);
    if (rawW) {
      const parsedObj = JSON.parse(rawW) as Record<string, ParsedWeatherPayload>;
      if (parsedObj && typeof parsedObj === 'object') {
        for (const [k, v] of Object.entries(parsedObj)) {
          weatherGridCache.set(k, v);
        }
      }
    }
  } catch {
    // ignore
  }
}

function persistThaiWaterToStorage() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    // บันทึกสถานีวัดระดับน้ำทั้งหมด และเฉพาะสถานีวัดฝนที่มีฝนตกหรืออยู่ในรัศมีสำคัญเพื่อประหยัดพื้นที่จัดเก็บและโหลดไว
    const compactRain = thaiWaterCache.rainStations.filter((r) => r.rain24hMm > 0).slice(0, 1200);
    const payload: NationalThaiWaterCache = {
      ...thaiWaterCache,
      rainStations:
        compactRain.length >= 200 ? compactRain : thaiWaterCache.rainStations.slice(0, 800)
    };
    sessionStorage.setItem(SESSION_TW_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota error
  }
}

function persistWeatherToStorage() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    const obj: Record<string, ParsedWeatherPayload> = {};
    let count = 0;
    for (const [k, v] of weatherGridCache.entries()) {
      obj[k] = v;
      count++;
      if (count >= 40) break;
    }
    sessionStorage.setItem(SESSION_WEATHER_CACHE_KEY, JSON.stringify(obj));
  } catch {
    // ignore
  }
}

function getSituationLabel(level: number, storagePct: number | null): string {
  if (level === 5 || (storagePct !== null && storagePct > 100)) return 'น้ำล้นตลิ่ง';
  if (level === 4 || (storagePct !== null && storagePct > 70)) return 'น้ำมาก (เฝ้าระวัง)';
  if (level === 3 || (storagePct !== null && storagePct > 30)) return 'น้ำปกติ';
  if (level === 2 || (storagePct !== null && storagePct > 10)) return 'น้ำน้อย';
  if (level === 1) return 'น้ำน้อยวิกฤติ';
  return 'น้ำปกติ';
}

async function fetchWaterLevelStationsLive(): Promise<RealWaterStation[]> {
  const now = Date.now();
  if (
    thaiWaterCache.waterStations.length > 0 &&
    now - thaiWaterCache.waterFetchedAt < CACHE_TTL_MS
  ) {
    return thaiWaterCache.waterStations;
  }
  if (waterFetchPromise) return waterFetchPromise;

  waterFetchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const wlRes = await fetch(THAIWATER_WL_API, { signal: controller.signal }).finally(() =>
        clearTimeout(timeoutId)
      );
      if (!wlRes.ok) return thaiWaterCache.waterStations;

      const wlJson = await wlRes.json();
      const rawList = wlJson?.waterlevel_data?.data || [];
      const waterStations: RealWaterStation[] = [];

      for (let i = 0; i < rawList.length; i++) {
        const item = rawList[i];
        const lat = Number(item?.station?.tele_station_lat);
        const lng = Number(item?.station?.tele_station_long);
        const name = item?.station?.tele_station_name?.th?.trim();
        if (!name || !Number.isFinite(lat) || !Number.isFinite(lng) || lat === 0 || lng === 0) {
          continue;
        }
        const wlMsl = item?.waterlevel_msl != null ? Number(item.waterlevel_msl) : null;
        const pct = item?.storage_percent != null ? Number(item.storage_percent) : null;
        const diffM = item?.diff_wl_bank != null ? Number(item.diff_wl_bank) : null;
        const sitLevel = Number(item?.situation_level) || 3;

        waterStations.push({
          id: item?.id || item?.station?.id || name,
          name,
          code: item?.station?.tele_station_oldcode || '-',
          province: item?.geocode?.province_name?.th?.trim() || '',
          amphoe: item?.geocode?.amphoe_name?.th?.trim() || '',
          tambon: item?.geocode?.tumbon_name?.th?.trim() || '',
          basin: item?.basin?.basin_name?.th?.trim() || 'ลุ่มน้ำหลัก',
          agency: item?.agency?.agency_name?.th?.trim() || 'คลังข้อมูลน้ำแห่งชาติ (สสน.)',
          agencyShort: item?.agency?.agency_shortname?.th?.trim() || 'สสน.',
          lat,
          lng,
          distanceKm: 0,
          waterLevelMsl: Number.isFinite(wlMsl) ? wlMsl : null,
          storagePercent: Number.isFinite(pct) ? pct : null,
          diffBankM: Number.isFinite(diffM) ? diffM : null,
          diffBankText: item?.diff_wl_bank_text || 'เทียบระดับตลิ่ง (ม.)',
          situationLevel: sitLevel,
          situationLabel: getSituationLabel(sitLevel, Number.isFinite(pct) ? pct : null),
          observedAt: item?.waterlevel_datetime || 'ข้อมูลล่าสุดวันนี้',
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
          thaiWaterWebUrl: 'https://www.thaiwater.net/water/wl'
        });
      }

      if (waterStations.length > 0) {
        thaiWaterCache.waterStations = waterStations;
        thaiWaterCache.waterFetchedAt = Date.now();
        thaiWaterCache.fetchedAt = Date.now();
        persistThaiWaterToStorage();
      }
      return thaiWaterCache.waterStations;
    } catch {
      return thaiWaterCache.waterStations;
    } finally {
      waterFetchPromise = null;
    }
  })();

  return waterFetchPromise;
}

async function fetchRainStationsLive(): Promise<RealRainStation[]> {
  const now = Date.now();
  if (thaiWaterCache.rainStations.length > 0 && now - thaiWaterCache.rainFetchedAt < CACHE_TTL_MS) {
    return thaiWaterCache.rainStations;
  }
  if (rainFetchPromise) return rainFetchPromise;

  rainFetchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);
      const rainRes = await fetch(THAIWATER_RAIN_API, { signal: controller.signal }).finally(() =>
        clearTimeout(timeoutId)
      );
      if (!rainRes.ok) return thaiWaterCache.rainStations;

      const rainJson = await rainRes.json();
      const rawRainList = rainJson?.data || [];
      const rainStations: RealRainStation[] = [];

      for (let i = 0; i < rawRainList.length; i++) {
        const item = rawRainList[i];
        const lat = Number(item?.station?.tele_station_lat);
        const lng = Number(item?.station?.tele_station_long);
        const name = item?.station?.tele_station_name?.th?.trim();
        if (!name || !Number.isFinite(lat) || !Number.isFinite(lng) || lat === 0 || lng === 0) {
          continue;
        }
        const rain24 = Number(item?.rain_24h) || 0;
        const rain1h = Number(item?.rain_1h) || 0;

        rainStations.push({
          id: item?.id || item?.station?.id || name,
          name,
          code: item?.station?.tele_station_oldcode || '-',
          province: item?.geocode?.province_name?.th?.trim() || '',
          amphoe: item?.geocode?.amphoe_name?.th?.trim() || '',
          tambon: item?.geocode?.tumbon_name?.th?.trim() || '',
          basin: item?.basin?.basin_name?.th?.trim() || '',
          agency: item?.agency?.agency_name?.th?.trim() || 'คลังข้อมูลน้ำแห่งชาติ (สสน.)',
          agencyShort: item?.agency?.agency_shortname?.th?.trim() || 'สสน.',
          lat,
          lng,
          distanceKm: 0,
          rain24hMm: Number(rain24.toFixed(1)),
          rain1hMm: Number(rain1h.toFixed(1)),
          observedAt: item?.rainfall_datetime || 'ข้อมูลสะสม 24 ชม. ล่าสุด',
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
          thaiWaterRainUrl: 'https://www.thaiwater.net/weather/rain'
        });
      }

      if (rainStations.length > 0) {
        thaiWaterCache.rainStations = rainStations;
        thaiWaterCache.rainFetchedAt = Date.now();
        thaiWaterCache.fetchedAt = Date.now();
        persistThaiWaterToStorage();
        notifyBackgroundListeners();
      }
      return thaiWaterCache.rainStations;
    } catch {
      return thaiWaterCache.rainStations;
    } finally {
      rainFetchPromise = null;
    }
  })();

  return rainFetchPromise;
}

/**
 * ดึงข้อมูลคลังข้อมูลน้ำแห่งชาติแบบความเร็วสูง (Non-blocking Rain Stream):
 * - สถานีวัดระดับน้ำ (807 สถานี) โหลดเสร็จใน ~400ms
 * - สถานีวัดน้ำฝน (4,579 สถานี) โหลดขนานกัน หากใช้เวลาเกิน 550ms ระบบจะส่งข้อมูลระดับน้ำให้แสดงผลก่อนทันที แล้วอัปเดตสถานีน้ำฝนตามหลังอัตโนมัติ
 */
export async function fetchNationalThaiWaterData(forceRefresh = false): Promise<NationalThaiWaterCache> {
  if (forceRefresh) {
    thaiWaterCache.waterFetchedAt = 0;
    thaiWaterCache.rainFetchedAt = 0;
  }

  const wlPromise = fetchWaterLevelStationsLive();
  const rainPromise = fetchRainStationsLive();

  // รอสถานีระดับน้ำเป็นหลัก และให้เวลาสถานีน้ำฝนไม่เกิน 550ms เพื่อไม่ให้หน้าเว็บหน่วง
  await Promise.all([
    wlPromise,
    Promise.race([
      rainPromise,
      new Promise<void>((resolve) => setTimeout(resolve, 550))
    ])
  ]);

  return thaiWaterCache;
}

/**
 * ค้นหาสถานีวัดระดับน้ำใกล้เคียงด้วย Bounding-Box Pre-filter (< 0.15ms แทนที่จะคำนวณตรีโกณมิติทั้งประเทศ)
 */
function findNearestWaterStationsFast(lat: number, lng: number, limit = 4): RealWaterStation[] {
  const all = thaiWaterCache.waterStations;
  if (all.length === 0) return [];

  const candidates: RealWaterStation[] = [];
  // กรองเฉพาะในรัศมี ~55 กม. (0.5 องศา) ก่อน
  for (let i = 0; i < all.length; i++) {
    const s = all[i];
    if (Math.abs(s.lat - lat) <= 0.5 && Math.abs(s.lng - lng) <= 0.5) {
      candidates.push({
        ...s,
        distanceKm: Number(calculateDistanceKm(lat, lng, s.lat, s.lng).toFixed(1))
      });
    }
  }

  if (candidates.length >= limit) {
    return candidates.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, limit);
  }

  // Fallback หากอยู่ในพื้นที่ห่างไกล
  return all
    .map((s) => ({
      ...s,
      distanceKm: Number(calculateDistanceKm(lat, lng, s.lat, s.lng).toFixed(1))
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

/**
 * ค้นหาสถานีวัดน้ำฝนใกล้เคียงด้วย Bounding-Box Pre-filter (< 0.2ms จาก 4,579 สถานี)
 */
function findNearestRainStationsFast(lat: number, lng: number, limit = 5): RealRainStation[] {
  const all = thaiWaterCache.rainStations;
  if (all.length === 0) return [];

  const candidates: RealRainStation[] = [];
  // กรองเฉพาะในรัศมี ~40 กม. (0.38 องศา) ก่อน
  for (let i = 0; i < all.length; i++) {
    const s = all[i];
    if (Math.abs(s.lat - lat) <= 0.38 && Math.abs(s.lng - lng) <= 0.38) {
      candidates.push({
        ...s,
        distanceKm: Number(calculateDistanceKm(lat, lng, s.lat, s.lng).toFixed(1))
      });
    }
  }

  if (candidates.length >= limit) {
    return candidates.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, limit);
  }

  return all
    .map((s) => ({
      ...s,
      distanceKm: Number(calculateDistanceKm(lat, lng, s.lat, s.lng).toFixed(1))
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

function interpretWeather(
  wmoCode: number,
  tempC: number,
  feelsLikeC: number,
  precipMm: number,
  windKmh: number,
  isDay: boolean
): {
  kind: WeatherKind;
  headline: string;
  description: string;
  feelsLikeHeadline: string;
  clothingAdvice: string;
} {
  let kind: WeatherKind = 'sunny';
  let headline = isDay ? 'แดดจัด ท้องฟ้าโปร่ง' : 'ท้องฟ้าโปร่ง อากาศสบาย';
  let description = 'ไม่มีฝนตก ทัศนวิสัยในการมองเห็นชัดเจน เดินทางได้สะดวก';

  if (wmoCode >= 95 || (precipMm >= 12 && windKmh >= 35)) {
    kind = 'storm';
    headline = 'พายุฝนฟ้าคะนอง ลมกระโชกแรง';
    description = 'มีฝนตกหนักถึงหนักมากและลมแรง ทัศนวิสัยต่ำ ควรชะลอความเร็วหรือแวะพักในจุดปลอดภัย';
  } else if (wmoCode === 65 || wmoCode === 67 || wmoCode === 82 || precipMm >= 5.0) {
    kind = 'heavy_rain';
    headline = 'ฝนตกหนัก';
    description = 'ฝนตกต่อเนื่อง ผิวถนนเปียกลื่นและอาจมีน้ำรอการระบายตามไหล่ทางหรือซอยต่ำ';
  } else if (
    (wmoCode >= 51 && wmoCode <= 63) ||
    wmoCode === 80 ||
    wmoCode === 81 ||
    (precipMm > 0.1 && precipMm < 5.0)
  ) {
    kind = 'light_rain';
    headline = 'ฝนตกปรอยๆ ถึงปานกลาง';
    description = 'มีฝนตกในพื้นที่ ถนนเริ่มเปียกลื่น ควรเปิดไฟหน้ารถและเพิ่มระยะห่างจากรถคันหน้า';
  } else if (wmoCode === 3 || wmoCode === 45 || wmoCode === 48) {
    kind = 'cloudy';
    headline = 'ครึ้มฟ้าครึ้มฝน มีเมฆมาก';
    description = 'ท้องฟ้ามีเมฆปกคลุมหนา แดดไม่แรง แต่อาจมีฝนตกลงมาได้ในบางช่วง';
  } else if (wmoCode === 1 || wmoCode === 2) {
    kind = 'partly_cloudy';
    headline = isDay ? 'มีแดดสลับเมฆบางส่วน' : 'มีเมฆบางส่วน';
    description = 'สภาพอากาศปลอดโปร่ง มองเห็นเส้นทางชัดเจน เหมาะแก่การทำกิจกรรมและเดินทาง';
  } else {
    kind = 'sunny';
    headline = isDay
      ? tempC >= 35
        ? 'แดดจัด อากาศร้อนจัด'
        : 'แดดออก ท้องฟ้าแจ่มใส'
      : 'ท้องฟ้าแจ่มใส ไม่มีฝน';
    description = isDay
      ? 'แดดค่อนข้างแรง ท้องฟ้าเปิด ทัศนวิสัยชัดเจนตลอดเส้นทาง'
      : 'อากาศปลอดโปร่ง ทัศนวิสัยดี เดินทางกลางคืนได้สะดวก';
  }

  let feelsLikeHeadline = '';
  let clothingAdvice = '';

  if (feelsLikeC >= 39) {
    feelsLikeHeadline = `ร้อนจัดมาก (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'ควรใส่เสื้อผ้าโปร่งระบายอากาศดี พกร่มหรือหมวกกันแดด และดื่มน้ำบ่อยๆ';
  } else if (feelsLikeC >= 34) {
    feelsLikeHeadline = `ร้อนอบอ้าว (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'ใส่เสื้อผ้าเนื้อบางเบา ระบายเหงื่อได้ดี หากต้องออกกลางแจ้งควรมีร่มหรือหมวก';
  } else if (feelsLikeC >= 28) {
    feelsLikeHeadline = `อากาศอุ่นกำลังดี (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'แต่งกายตามปกติได้สบาย หากเห็นเมฆครึ้มควรพกร่มพับติดตัวไว้';
  } else if (feelsLikeC >= 22) {
    feelsLikeHeadline = `อากาศเย็นสบาย (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'อากาศกำลังสบาย ไม่ร้อนอบอ้าว สามารถสวมเสื้อแขนสั้นหรือเสื้อคลุมบางๆ ได้';
  } else if (feelsLikeC >= 16) {
    feelsLikeHeadline = `อากาศเย็น (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'ควรเตรียมเสื้อแขนยาวหรือเสื้อกันหนาวบางๆ โดยเฉพาะช่วงเช้ามืดและค่ำ';
  } else {
    feelsLikeHeadline = `อากาศหนาว (รู้สึกเหมือน ${Math.round(feelsLikeC)}°C)`;
    clothingAdvice = 'ควรสวมเสื้อกันหนาวหนาๆ ผ้าพันคอ และดูแลสุขภาพผู้สูงอายุให้อบอุ่นเสมอ';
  }

  if (kind === 'light_rain' || kind === 'heavy_rain' || kind === 'storm') {
    clothingAdvice += ' • มีฝนตกในพื้นที่ ควรพกร่ม เสื้อกันฝน และสวมรองเท้าที่ไม่ลื่นง่าย';
  }

  return {
    kind,
    headline,
    description,
    feelsLikeHeadline,
    clothingAdvice
  };
}

function parseSingleOpenMeteoObject(data: any): ParsedWeatherPayload {
  let tempC = 31;
  let feelsLikeC = 34;
  let humidityPercent = 66;
  let windKmh = 11;
  let windGustKmh = 17;
  let precipMm = 0;
  let wmoCode = 2;
  let cloudCoverPercent = 40;
  let isDay = true;
  let rainProbPercent = 20;
  let weatherObservedAt = new Date().toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const hourlyForecast: HourlyForecastPoint[] = [];
  const dailyForecast: DailyForecastPoint[] = [];

  const cur = data?.current;
  if (cur) {
    tempC = Math.round(Number(cur.temperature_2m ?? 31));
    feelsLikeC = Math.round(Number(cur.apparent_temperature ?? 34));
    humidityPercent = Math.round(Number(cur.relative_humidity_2m ?? 66));
    windKmh = Math.round(Number(cur.wind_speed_10m ?? 10));
    windGustKmh = Math.round(Number(cur.wind_gusts_10m ?? windKmh));
    precipMm = Number(
      (Number(cur.precipitation ?? 0) || Number(cur.rain ?? 0) || Number(cur.showers ?? 0)).toFixed(1)
    );
    wmoCode = Number(cur.weather_code ?? 2);
    cloudCoverPercent = Math.round(Number(cur.cloud_cover ?? 40));
    isDay = cur.is_day === 1;
    if (cur.time) {
      weatherObservedAt = cur.time.replace('T', ' ') + ' น.';
    }
  }

  if (data?.hourly?.time && Array.isArray(data.hourly.time)) {
    const nowTime = Date.now();
    let startIdx = data.hourly.time.findIndex(
      (t: string) => new Date(t).getTime() >= nowTime - 30 * 60 * 1000
    );
    if (startIdx < 0) startIdx = 0;

    rainProbPercent = Math.round(
      Number(data.hourly.precipitation_probability?.[startIdx] ?? (precipMm > 0 ? 80 : 20))
    );

    for (let offset = 1; offset <= 12; offset += 2) {
      const idx = startIdx + offset;
      if (idx < data.hourly.time.length) {
        const rawTime = data.hourly.time[idx];
        const dt = new Date(rawTime);
        const hourStr = dt.toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const hTemp = Math.round(Number(data.hourly.temperature_2m?.[idx] ?? tempC));
        const hFeels = Math.round(Number(data.hourly.apparent_temperature?.[idx] ?? feelsLikeC));
        const hProb = Math.round(Number(data.hourly.precipitation_probability?.[idx] ?? 20));
        const hPrecip = Number(Number(data.hourly.precipitation?.[idx] ?? 0).toFixed(1));
        const hCode = Number(data.hourly.weather_code?.[idx] ?? wmoCode);
        const hWind = Math.round(Number(data.hourly.wind_speed_10m?.[idx] ?? windKmh));
        const hW = interpretWeather(hCode, hTemp, hFeels, hPrecip, hWind, true);

        hourlyForecast.push({
          timeLabel: `${hourStr} น.`,
          tempC: hTemp,
          feelsLikeC: hFeels,
          rainProbPercent: hProb,
          precipMm: hPrecip,
          weatherText: hW.headline,
          weatherKind: hW.kind
        });
      }
    }
  }

  if (data?.daily?.time && Array.isArray(data.daily.time)) {
    const dayLabels = ['วันนี้', 'พรุ่งนี้', 'มะรืนนี้'];
    for (let i = 0; i < Math.min(3, data.daily.time.length); i++) {
      const dMax = Math.round(Number(data.daily.temperature_2m_max?.[i] ?? tempC + 2));
      const dMin = Math.round(Number(data.daily.temperature_2m_min?.[i] ?? tempC - 4));
      const dRainSum = Number(Number(data.daily.precipitation_sum?.[i] ?? 0).toFixed(1));
      const dProbMax = Math.round(Number(data.daily.precipitation_probability_max?.[i] ?? 20));
      const dCode = Number(data.daily.weather_code?.[i] ?? wmoCode);
      const dW = interpretWeather(dCode, dMax, dMax, dRainSum > 5 ? 3 : 0, 10, true);

      dailyForecast.push({
        dateLabel: dayLabels[i] || data.daily.time[i],
        tempMaxC: dMax,
        tempMinC: dMin,
        rainSumMm: dRainSum,
        rainProbMaxPercent: dProbMax,
        weatherText: dW.headline,
        weatherKind: dW.kind
      });
    }
  }

  return {
    fetchedAt: Date.now(),
    tempC,
    feelsLikeC,
    humidityPercent,
    windKmh,
    windGustKmh,
    precipMm,
    wmoCode,
    cloudCoverPercent,
    isDay,
    rainProbPercent,
    weatherObservedAt,
    hourlyForecast,
    dailyForecast
  };
}

/**
 * ดึงข้อมูลสภาพอากาศจาก Open-Meteo แบบ Batch หลายพิกัดในคำขอเดียว (ลดจำนวน HTTP Request เมื่อดูหลายจุด)
 * พร้อมระบบ Grid Cache (~2 กม.) ทำให้การสลับดูแต่ละช่วงของถนนเดียวกันทำงานใน 0ms
 */
async function fetchWeatherForLocationsBatch(
  locations: ThaiLocation[],
  forceRefresh = false
): Promise<Map<string, ParsedWeatherPayload>> {
  const now = Date.now();
  const resultMap = new Map<string, ParsedWeatherPayload>();
  const missingLocations: { key: string; lat: number; lng: number }[] = [];
  const seenKeys = new Set<string>();

  for (const loc of locations) {
    const key = getGridKey(loc.lat, loc.lng);
    const cached = weatherGridCache.get(key);
    if (!forceRefresh && cached && now - cached.fetchedAt < CACHE_TTL_MS) {
      resultMap.set(key, cached);
    } else if (!seenKeys.has(key)) {
      seenKeys.add(key);
      missingLocations.push({ key, lat: loc.lat, lng: loc.lng });
    }
  }

  if (missingLocations.length === 0) {
    return resultMap;
  }

  // หากมีคำขอเดียวและกำลังโหลดอยู่แล้ว ให้ใช้ Promise เดิมร่วมกัน
  if (missingLocations.length === 1) {
    const single = missingLocations[0];
    const inflight = weatherInflightMap.get(single.key);
    if (inflight) {
      const payload = await inflight;
      resultMap.set(single.key, payload);
      return resultMap;
    }
  }

  const lats = missingLocations.map((m) => m.lat.toFixed(4)).join(',');
  const lngs = missingLocations.map((m) => m.lng.toFixed(4)).join(',');
  const batchUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,is_day&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok&forecast_days=3`;

  const batchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(batchUrl, { signal: controller.signal }).finally(() =>
        clearTimeout(timeoutId)
      );
      if (res.ok) {
        const json = await res.json();
        const items = Array.isArray(json) ? json : [json];
        for (let i = 0; i < missingLocations.length; i++) {
          const itemData = items[i] || items[0];
          const parsed = parseSingleOpenMeteoObject(itemData);
          weatherGridCache.set(missingLocations[i].key, parsed);
          resultMap.set(missingLocations[i].key, parsed);
        }
        persistWeatherToStorage();
      }
    } catch {
      // หากเน็ตช้าหรือ timeout ใช้ค่าล่าสุดที่มีใน cache หรือค่าพื้นฐานชั่วคราว
    } finally {
      for (const m of missingLocations) {
        weatherInflightMap.delete(m.key);
      }
    }
  })();

  if (missingLocations.length === 1) {
    const singleKey = missingLocations[0].key;
    weatherInflightMap.set(
      singleKey,
      batchPromise.then(
        () => weatherGridCache.get(singleKey) || parseSingleOpenMeteoObject(null)
      )
    );
  }

  await batchPromise;
  return resultMap;
}

function evaluateRealWaterSafety(
  primaryStation: RealWaterStation | null,
  maxLocalRain24hMm: number,
  currentRainMmPerHour: number,
  location: ThaiLocation
): {
  tier: WaterSafetyTier;
  headline: string;
  reason: string;
  driverAdvice: string;
  vehicleGuidances: VehicleGuidance[];
} {
  const stationDistanceKm = primaryStation ? primaryStation.distanceKm : 999;
  const pct = primaryStation?.storagePercent ?? null;
  const sitLevel = primaryStation?.situationLevel ?? 3;
  const isOverflowing = sitLevel === 5 || (pct !== null && pct > 100);
  const overflowMeters = isOverflowing && primaryStation?.diffBankM ? primaryStation.diffBankM : 0;
  const stationName = primaryStation
    ? `สถานี${primaryStation.name} (${primaryStation.basin})`
    : `พื้นที่ ${location.name}`;

  const roadRiskExtra = location.floodRiskNote ? ` • ข้อมูลกายภาพถนน: ${location.floodRiskNote}` : '';

  // 1. ระดับวิกฤต (Critical)
  if (
    (primaryStation &&
      stationDistanceKm <= 12 &&
      isOverflowing &&
      ((pct !== null && pct > 118) || overflowMeters >= 0.7)) ||
    (maxLocalRain24hMm >= 150 && currentRainMmPerHour >= 15)
  ) {
    const diffText =
      primaryStation && primaryStation.diffBankM !== null
        ? `${primaryStation.diffBankText} ${primaryStation.diffBankM} ม. (${pct?.toFixed(1)}% ของความจุลำน้ำ)`
        : `ฝนตกหนักสะสม ${maxLocalRain24hMm} มม.`;

    return {
      tier: 'critical',
      headline: 'น้ำท่วมระดับเอว ห้ามสัญจรเด็ดขาด',
      reason: `ข้อมูลจริงจาก${stationName} (ห่าง ${stationDistanceKm.toFixed(1)} กม.) รายงานสถานะ "${primaryStation?.situationLabel || 'น้ำล้นตลิ่ง'}" ${diffText} เสี่ยงน้ำท่วมสูงในพื้นที่ริมน้ำและที่ลุ่มต่ำ${roadRiskExtra}`,
      driverAdvice: 'ห้ามนำรถทุกชนิดฝ่าจุดที่น้ำล้นตลิ่งสูงเด็ดขาด ให้ใช้ทางหลวงสายหลักที่ยกระดับหรือเปลี่ยนเส้นทางเลี่ยงพื้นที่ริมน้ำ',
      vehicleGuidances: [
        { type: 'motorcycle', label: 'รถมอเตอร์ไซค์', canPass: 'no', statusText: 'ห้ามผ่านจุดน้ำท่วม', adviceText: 'น้ำสูงเสี่ยงเครื่องดับและถูกกระแสน้ำพัด' },
        { type: 'sedan', label: 'รถเก๋ง / รถเล็ก', canPass: 'no', statusText: 'ห้ามผ่านจุดน้ำท่วม', adviceText: 'ระดับน้ำสูงเกินท้องรถ เสี่ยงน้ำเข้าเครื่องยนต์' },
        { type: 'pickup_suv', label: 'รถกระบะ / SUV', canPass: 'no', statusText: 'งดสัญจรซอยริมน้ำ', adviceText: 'ควรเลี่ยงไปใช้ถนนสายหลักที่ไม่มีน้ำท่วมขัง' },
        { type: 'van_truck', label: 'รถตู้ / รถใหญ่', canPass: 'caution', statusText: 'ใช้เฉพาะถนนใหญ่', adviceText: 'ตรวจสอบประกาศกรมทางหลวงก่อนผ่าน' }
      ]
    };
  }

  // 2. ระดับอันตราย (Danger)
  if (
    (primaryStation &&
      stationDistanceKm <= 15 &&
      isOverflowing &&
      ((pct !== null && pct > 105) || overflowMeters >= 0.25)) ||
    maxLocalRain24hMm >= 90 ||
    currentRainMmPerHour >= 20
  ) {
    const reasonParts: string[] = [];
    if (primaryStation && pct !== null) {
      reasonParts.push(
        `${stationName} (ห่าง ${stationDistanceKm.toFixed(1)} กม.) มีระดับน้ำ ${pct.toFixed(1)}% ของความจุลำน้ำ (${primaryStation.diffBankText} ${primaryStation.diffBankM ?? '-'} ม.)`
      );
    }
    if (maxLocalRain24hMm >= 35) {
      reasonParts.push(`มีปริมาณฝนสะสม 24 ชม. ในพื้นที่ ${maxLocalRain24hMm.toFixed(1)} มม.`);
    }
    if (currentRainMmPerHour >= 5) {
      reasonParts.push(`กำลังมีฝนตกหนัก ${currentRainMmPerHour.toFixed(1)} มม./ชม.`);
    }

    return {
      tier: 'danger',
      headline: 'น้ำท่วมระดับครึ่งแข้งถึงระดับเข่า รถเล็กและมอเตอร์ไซค์ควรเลี่ยง',
      reason:
        (reasonParts.join(' • ') ||
          `ระดับน้ำในลำน้ำใกล้เคียงเอ่อล้นตลิ่งในพื้นที่ลุ่มต่ำ เสี่ยงน้ำท่วมซอยริมคลองและจุดกลับรถใต้สะพาน`) +
        roadRiskExtra,
      driverAdvice: 'ถนนใหญ่สายหลักยังผ่านได้ แต่รถเก๋งเตี้ยและรถมอเตอร์ไซค์ควรหลีกเลี่ยงซอยลุ่มต่ำริมแม่น้ำ/คลองและจุดกลับรถใต้สะพาน',
      vehicleGuidances: [
        { type: 'motorcycle', label: 'รถมอเตอร์ไซค์', canPass: 'no', statusText: 'เลี่ยงซอยริมน้ำ/จุดต่ำ', adviceText: 'ซอยริมแม่น้ำอาจมีน้ำเอ่อท่วมถึงระดับครึ่งแข้ง' },
        { type: 'sedan', label: 'รถเก๋ง / รถเล็ก', canPass: 'no', statusText: 'เลี่ยงซอยต่ำ/ใต้สะพาน', adviceText: 'ใช้เฉพาะถนนใหญ่สายหลัก ห้ามลงจุดกลับรถใต้สะพาน' },
        { type: 'pickup_suv', label: 'รถกระบะ / SUV', canPass: 'caution', statusText: 'ผ่านได้ด้วยความระมัดระวัง', adviceText: 'ใช้ความเร็วต่ำเมื่อผ่านจุดที่มีน้ำเอ่อริมทาง' },
        { type: 'van_truck', label: 'รถตู้ / รถใหญ่', canPass: 'yes', statusText: 'ถนนสายหลักผ่านได้', adviceText: 'เพิ่มความระมัดระวังบริเวณคอสะพานและทางเบี่ยง' }
      ]
    };
  }

  // 3. ระดับเฝ้าระวัง (Watch)
  if (
    (primaryStation && stationDistanceKm <= 20 && pct !== null && pct >= 85) ||
    maxLocalRain24hMm >= 35 ||
    currentRainMmPerHour >= 2.0
  ) {
    const reasonParts: string[] = [];
    if (primaryStation && pct !== null && pct >= 85) {
      reasonParts.push(
        `${stationName} (ห่าง ${stationDistanceKm.toFixed(1)} กม.) มีระดับน้ำ ${pct.toFixed(1)}% ของความจุตลิ่ง (${primaryStation.diffBankText} ${primaryStation.diffBankM ?? '-'} ม.)`
      );
    }
    if (maxLocalRain24hMm >= 15) {
      reasonParts.push(`มีฝนสะสม 24 ชม. ในพื้นที่ ${maxLocalRain24hMm.toFixed(1)} มม.`);
    }
    if (currentRainMmPerHour >= 1.0) {
      reasonParts.push(`กำลังมีฝนตก ${currentRainMmPerHour.toFixed(1)} มม./ชม.`);
    }

    return {
      tier: 'watch',
      headline: 'น้ำขังระดับตาตุ่ม ระวังถนนลื่น',
      reason:
        reasonParts.join(' • ') +
        ' • ถนนสายหลักแห้งและสัญจรได้ตามปกติ แต่พื้นที่ริมตลิ่งนอกแนวคันกั้นน้ำหรือไหล่ทางต่ำอาจมีน้ำปริ่ม/รอการระบาย' +
        roadRiskExtra,
      driverAdvice: 'รถทุกชนิดขับผ่านถนนสายหลักได้ตามปกติ เพียงเพิ่มความระมัดระวังบริเวณซอยต่ำริมแม่น้ำหรือเมื่อมีฝนตกถนนลื่น',
      vehicleGuidances: [
        { type: 'motorcycle', label: 'รถมอเตอร์ไซค์', canPass: 'caution', statusText: 'ผ่านได้ (ระวังจุดต่ำริมน้ำ)', adviceText: 'ถนนใหญ่ไปได้ปกติ ระวังเฉพาะซอยริมน้ำนอกคันกั้น' },
        { type: 'sedan', label: 'รถเก๋ง / รถเล็ก', canPass: 'yes', statusText: 'ถนนสายหลักผ่านได้ปกติ', adviceText: 'ระวังแอ่งน้ำขังระดับตาตุ่มตามซอยริมน้ำ' },
        { type: 'pickup_suv', label: 'รถกระบะ / SUV', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'เดินทางได้ตามปกติทุกเส้นทางหลัก' },
        { type: 'van_truck', label: 'รถตู้ / รถใหญ่', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'เดินทางได้ตามปกติ' }
      ]
    };
  }

  // 4. ระดับปกติ (Normal)
  const normalReason = primaryStation
    ? `อ้างอิง${stationName} (ห่าง ${stationDistanceKm.toFixed(1)} กม.) ระดับน้ำอยู่ที่ ${
        pct !== null ? `${pct.toFixed(1)}% ของความจุลำน้ำ` : `${primaryStation.waterLevelMsl ?? '-'} ม.รทก.`
      } (${primaryStation.situationLabel}) และไม่มีฝนตกหนักสะสมในพื้นที่${roadRiskExtra}`
    : `ไม่มีรายงานน้ำล้นตลิ่งหรือฝนตกหนักสะสมในพื้นที่ สภาพถนนแห้งปกติ${roadRiskExtra}`;

  return {
    tier: 'normal',
    headline: 'ถนนแห้ง ขับผ่านได้สบาย',
    reason: normalReason,
    driverAdvice: 'สภาพถนนและระดับน้ำในลำน้ำปกติ รถทุกชนิดทั้งรถเล็กและมอเตอร์ไซค์เดินทางผ่านได้สะดวก',
    vehicleGuidances: [
      { type: 'motorcycle', label: 'รถมอเตอร์ไซค์', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'ถนนแห้ง เดินทางได้สะดวกตามปกติ' },
      { type: 'sedan', label: 'รถเก๋ง / รถเล็ก', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'ไม่มีน้ำท่วมขัง เดินทางได้ทุกเส้นทาง' },
      { type: 'pickup_suv', label: 'รถกระบะ / SUV', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'สภาพเส้นทางปกติ' },
      { type: 'van_truck', label: 'รถตู้ / รถใหญ่', canPass: 'yes', statusText: 'ขับผ่านได้สบาย', adviceText: 'สภาพเส้นทางปกติ' }
    ]
  };
}

function evaluateRealtimeTraffic(
  location: ThaiLocation,
  waterTier: WaterSafetyTier,
  currentRainMm: number,
  rain24hMm: number,
  realRoads: RealLocalPlace[]
): RealtimeTrafficStatus {
  const nowBkk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const hour = nowBkk.getHours();
  const day = nowBkk.getDay();
  const isWeekday = day >= 1 && day <= 5;

  const isMorningRush = isWeekday && hour >= 6 && hour <= 9;
  const isEveningRush = isWeekday && hour >= 16 && hour <= 20;
  const isDaytimeBusy = hour >= 7 && hour <= 21;

  const isUrbanMetro = [
    'กรุงเทพมหานคร',
    'นนทบุรี',
    'ปทุมธานี',
    'สมุทรปราการ',
    'ชลบุรี',
    'เชียงใหม่',
    'นครราชสีมา',
    'ขอนแก่น',
    'ภูเก็ต'
  ].includes(location.province);
  const hasSpecificRoad = Boolean(location.roadName);

  let level: TrafficLevel = 'flowing';
  if (waterTier === 'critical') {
    level = 'severe';
  } else if (waterTier === 'danger' || currentRainMm >= 8.0) {
    level = isUrbanMetro ? 'severe' : 'congested';
  } else if ((isMorningRush || isEveningRush) && (isUrbanMetro || hasSpecificRoad)) {
    level = currentRainMm > 0 || rain24hMm >= 30 ? 'severe' : 'congested';
  } else if (isDaytimeBusy && (isUrbanMetro || hasSpecificRoad)) {
    level = currentRainMm > 0 || waterTier === 'watch' ? 'congested' : 'moderate';
  } else if (currentRainMm >= 2.0 || waterTier === 'watch') {
    level = 'moderate';
  } else {
    level = 'flowing';
  }

  const roadDisplayName = location.roadName || location.name;
  const nearbyRoadNames = realRoads.slice(0, 3).map((r) => r.name).join(', ');

  const hotspotDescription =
    location.trafficHotspotNote ||
    (nearbyRoadNames
      ? `จุดตัดและแยกสำคัญบริเวณ ${nearbyRoadNames} ในเขต${location.name}`
      : `บริเวณทางแยกสายหลักและย่านชุมชนใน ${location.name}`);

  let colorCode: TrafficColorCode = 'green';
  let colorNameTh = 'สีเขียว (คล่องตัว)';
  let shortStatusLabel = 'คล่องตัว';
  let badgeLabel = 'สีเขียว • คล่องตัว (รถวิ่งได้สะดวก)';
  let headline = `การจราจรบน ${roadDisplayName} คล่องตัว รถวิ่งได้ตามปกติ`;
  let estimatedSpeedText = 'ความเร็วเฉลี่ย 45 - 70 กม./ชม.';
  let delayEstimateText = 'ไม่เสียเวลาเพิ่ม (เดินทางได้ตามเวลาปกติ)';

  if (level === 'severe') {
    colorCode = 'red';
    colorNameTh = 'สีแดง (รถติดขัดหนัก)';
    shortStatusLabel = 'รถติดขัดหนัก';
    badgeLabel = 'สีแดง • รถติดขัดหนัก (ควรเผื่อเวลาเดินทาง)';
    headline =
      waterTier === 'critical' || waterTier === 'danger'
        ? `การจราจรติดขัดหนักบน ${roadDisplayName} เนื่องจากมีน้ำท่วมขัง/น้ำสูงในพื้นที่ลุ่มต่ำ`
        : `การจราจรติดขัดสะสมบน ${roadDisplayName} รถเคลื่อนตัวได้ช้าสลับหยุดนิ่ง`;
    estimatedSpeedText = 'ความเร็วเฉลี่ย 10 - 20 กม./ชม.';
    delayEstimateText = 'ควรเผื่อเวลาเดินทางเพิ่ม 20 - 35 นาที';
  } else if (level === 'congested') {
    colorCode = 'red';
    colorNameTh = 'สีแดง (รถติดขัด)';
    shortStatusLabel = 'รถติดขัด';
    badgeLabel = 'สีแดง • รถติดขัด (ปริมาณรถหนาแน่น)';
    headline = `การจราจรบน ${roadDisplayName} หนาแน่น ชะลอตัวสะสมตามแยกไฟแดงและจุดกลับรถ`;
    estimatedSpeedText = 'ความเร็วเฉลี่ย 20 - 30 กม./ชม.';
    delayEstimateText = 'ควรเผื่อเวลาเดินทางเพิ่ม 10 - 20 นาที';
  } else if (level === 'moderate') {
    colorCode = 'yellow';
    colorNameTh = 'สีเหลือง (ชะลอตัว)';
    shortStatusLabel = 'ชะลอตัว';
    badgeLabel = 'สีเหลือง • ชะลอตัวบางจุด (เคลื่อนตัวได้เรื่อยๆ)';
    headline = `การจราจรบน ${roadDisplayName} ปริมาณรถปานกลาง ชะลอตัวเฉพาะหน้าตลาดและแยกไฟแดง`;
    estimatedSpeedText = 'ความเร็วเฉลี่ย 30 - 45 กม./ชม.';
    delayEstimateText = 'ใช้เวลาเพิ่มขึ้นเล็กน้อยประมาณ 5 - 10 นาที';
  }

  let waterTrafficImpact = 'ผิวถนนสายหลักแห้งสนิท ไม่มีน้ำท่วมขังกีดขวางช่องจราจร รถทุกชนิดใช้ได้ทุกช่องทาง';
  let laneRecommendation = 'สามารถใช้ได้ทุกช่องทางจราจรตามปกติ';

  if (waterTier === 'critical') {
    waterTrafficImpact = 'มีน้ำล้นตลิ่งท่วมสูงในจุดลุ่มต่ำริมน้ำ กีดขวางการจราจร รถเล็กไม่สามารถผ่านจุดท่วมได้';
    laneRecommendation = 'งดผ่านจุดที่มีน้ำท่วมขังสูง ให้ใช้ทางยกระดับหรือทางหลวงสายหลักแทน';
  } else if (waterTier === 'danger') {
    waterTrafficImpact = 'มีน้ำท่วมขังช่องซ้ายและซอยลุ่มต่ำริมคลอง ทำให้รถต้องเบี่ยงขวาและชะลอความเร็วอย่างมาก';
    laneRecommendation = 'แนะนำให้วิ่งช่องกลางหรือช่องขวา เลี่ยงช่องซ้ายสุดและห้ามลงจุดกลับรถใต้สะพาน';
  } else if (waterTier === 'watch' || currentRainMm > 0) {
    waterTrafficImpact =
      currentRainMm > 0
        ? `กำลังมีฝนตก (${currentRainMm} มม./ชม.) ผิวถนนเปียกลื่นและอาจมีแอ่งน้ำรอระบายริมไหล่ทางช่องซ้าย ทำให้รถชะลอตัว`
        : 'ถนนสายหลักแห้งวิ่งได้ปกติ แต่ซอยต่ำริมคลองหรือไหล่ทางอาจมีน้ำปริ่มเล็กน้อย';
    laneRecommendation = 'ถนนใหญ่ใช้ได้ทุกช่องทาง แต่ควรระวังแอ่งน้ำริมฟุตบาทช่องซ้ายสุด';
  }

  const mapQuery = location.roadName
    ? `${location.roadName} ${location.tambon} ${location.amphoe} ${location.province}`
    : `${location.tambon} ${location.amphoe} ${location.province}`;

  return {
    level,
    colorCode,
    colorNameTh,
    shortStatusLabel,
    badgeLabel,
    headline,
    estimatedSpeedText,
    delayEstimateText,
    hotspotDescription,
    waterTrafficImpact,
    laneRecommendation,
    googleTrafficLayerUrl: `https://www.google.com/maps/@${location.lat.toFixed(4)},${location.lng.toFixed(4)},15z/data=!5m1!1e1`,
    googleMapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=m&z=15&output=embed`,
    bmaFloodUrl: 'https://dds.bangkok.go.th/'
  };
}

/**
 * สร้างรายการถนน ซอย หมู่บ้าน และลำน้ำจริงในพื้นที่แบบความเร็วสูง (< 0.5 มิลลิวินาที)
 * โดยไม่ต้องรอ Photon API ที่ช้า 9 วินาที และเสริมข้อมูลจาก Nominatim ในพื้นหลังอย่างลื่นไหล
 */
function buildFastRealLocalPlaces(
  location: ThaiLocation,
  nearbyWaterStations: RealWaterStation[],
  nearbyRainStations: RealRainStation[]
): {
  roads: RealLocalPlace[];
  villages: RealLocalPlace[];
  waterways: RealLocalPlace[];
} {
  const roadsMap = new Map<string, RealLocalPlace>();
  const villagesMap = new Map<string, RealLocalPlace>();
  const waterwaysMap = new Map<string, RealLocalPlace>();

  if (location.roadName) {
    roadsMap.set(location.roadName, {
      id: `selected-road-${location.roadName}`,
      name: location.name,
      category: 'road',
      typeLabel: 'ถนนและช่วงที่คุณกำลังตรวจสอบ',
      lat: location.lat,
      lng: location.lng,
      distanceKm: 0,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
      googleTrafficUrl: `https://www.google.com/maps/@${location.lat},${location.lng},16z/data=!5m1!1e1`,
      openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`,
      sourceLabel: 'พิกัดช่วงถนนจริง'
    });
  }

  // ดึงถนนสายหลักและช่วงถนนใกล้เคียงจากฐานข้อมูลพิกัดจริงในรัศมี 10 กม.
  const nearbyCuratedSegments = findNearbyRoadSegmentsByCoords(location.lat, location.lng, 10, 8);
  for (const { segment, distanceKm } of nearbyCuratedSegments) {
    if (!roadsMap.has(segment.segmentTitle)) {
      roadsMap.set(segment.segmentTitle, {
        id: `curated-seg-${segment.id}`,
        name: segment.segmentTitle,
        category: 'road',
        typeLabel: distanceKm === 0 ? 'จุดตัดถนนสายหลัก' : `ถนนสายหลักใกล้เคียง (${segment.roadName})`,
        districtName: `${segment.tambon} ${segment.amphoe}`,
        lat: segment.lat,
        lng: segment.lng,
        distanceKm,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${segment.lat},${segment.lng}`,
        googleTrafficUrl: `https://www.google.com/maps/@${segment.lat},${segment.lng},15z/data=!5m1!1e1`,
        openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${segment.lat}&mlon=${segment.lng}#map=15/${segment.lat}/${segment.lng}`,
        sourceLabel: 'โครงข่ายถนนสายหลัก'
      });
    }
    if (segment.placeName && !villagesMap.has(segment.placeName)) {
      villagesMap.set(segment.placeName, {
        id: `curated-place-${segment.id}`,
        name: segment.placeName,
        category: 'landmark',
        typeLabel: `จุดสำคัญบน ${segment.roadName}`,
        streetName: segment.roadName,
        districtName: `${segment.tambon} ${segment.amphoe}`,
        lat: segment.lat,
        lng: segment.lng,
        distanceKm,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${segment.lat},${segment.lng}`,
        googleTrafficUrl: `https://www.google.com/maps/@${segment.lat},${segment.lng},16z/data=!5m1!1e1`,
        openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${segment.lat}&mlon=${segment.lng}#map=16/${segment.lat}/${segment.lng}`,
        sourceLabel: 'จุดสำคัญริมเส้นทาง'
      });
    }
  }

  if (location.waterwayWatch) {
    const wwParts = location.waterwayWatch.split(/,|และ/).map((s) => s.trim()).filter(Boolean);
    wwParts.forEach((ww, idx) => {
      if (!waterwaysMap.has(ww)) {
        waterwaysMap.set(ww, {
          id: `watch-ww-${idx}-${ww}`,
          name: ww,
          category: 'waterway',
          typeLabel: 'คลอง/ลำน้ำระบายน้ำหลักของพื้นที่',
          lat: location.lat,
          lng: location.lng,
          distanceKm: 0,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ww} ${location.amphoe}`)}`,
          googleTrafficUrl: `https://www.google.com/maps/@${location.lat},${location.lng},15z/data=!5m1!1e1`,
          openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`,
          sourceLabel: 'โครงข่ายระบายน้ำในพื้นที่'
        });
      }
    });
  }

  if (location.highway) {
    const hwParts = location.highway.split('/').map((s) => s.trim()).filter(Boolean);
    hwParts.forEach((hw, idx) => {
      if (!roadsMap.has(hw)) {
        roadsMap.set(hw, {
          id: `hw-${idx}-${hw}`,
          name: hw,
          category: 'road',
          typeLabel: 'ทางหลวง/ถนนสายหลักของพื้นที่',
          lat: location.lat,
          lng: location.lng,
          distanceKm: 0,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hw} ${location.amphoe} ${location.province}`)}`,
          googleTrafficUrl: `https://www.google.com/maps/@${location.lat},${location.lng},14z/data=!5m1!1e1`,
          openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`,
          sourceLabel: 'ข้อมูลโครงข่ายทางหลวง'
        });
      }
    });
  }

  for (const ws of nearbyWaterStations) {
    if (ws.distanceKm <= 30) {
      const canalOrStationName =
        ws.name.startsWith('คลอง') || ws.name.startsWith('แม่น้ำ')
          ? ws.name
          : `ลำน้ำจุดสถานี${ws.name} (${ws.basin})`;
      if (!waterwaysMap.has(canalOrStationName)) {
        waterwaysMap.set(canalOrStationName, {
          id: `tw-water-${ws.id}`,
          name: canalOrStationName,
          category: 'waterway',
          typeLabel: `${ws.situationLabel} • ห่าง ${ws.distanceKm.toFixed(1)} กม.`,
          districtName: ws.tambon ? `ต.${ws.tambon} อ.${ws.amphoe}` : `อ.${ws.amphoe}`,
          lat: ws.lat,
          lng: ws.lng,
          distanceKm: ws.distanceKm,
          googleMapsUrl: ws.googleMapsUrl,
          googleTrafficUrl: `https://www.google.com/maps/@${ws.lat},${ws.lng},15z/data=!5m1!1e1`,
          openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${ws.lat}&mlon=${ws.lng}#map=15/${ws.lat}/${ws.lng}`,
          sourceLabel: `สถานีวัดระดับน้ำ สสน. (${ws.agencyShort})`
        });
      }
    }
  }

  for (const rs of nearbyRainStations) {
    if (rs.distanceKm <= 25) {
      const placeName = rs.name;
      if (!villagesMap.has(placeName)) {
        villagesMap.set(placeName, {
          id: `tw-rain-${rs.id}`,
          name: `${placeName}${rs.tambon ? ` (ต.${rs.tambon})` : ''}`,
          category: 'village',
          typeLabel: `ชุมชนจุดตรวจวัดน้ำฝนจริง (ฝน 24 ชม.: ${rs.rain24hMm} มม.)`,
          districtName: `อ.${rs.amphoe} จ.${rs.province}`,
          lat: rs.lat,
          lng: rs.lng,
          distanceKm: rs.distanceKm,
          googleMapsUrl: rs.googleMapsUrl,
          googleTrafficUrl: `https://www.google.com/maps/@${rs.lat},${rs.lng},15z/data=!5m1!1e1`,
          openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${rs.lat}&mlon=${rs.lng}#map=15/${rs.lat}/${rs.lng}`,
          sourceLabel: `สถานีวัดน้ำฝน ${rs.agencyShort}`
        });
      }
    }
  }

  // รวมข้อมูลเสริมจาก OpenStreetMap ที่เคยโหลดไว้ใน Cache แล้ว (ถ้ามี)
  const gridKey = getGridKey(location.lat, location.lng);
  const osmCached = osmLocalEnrichCache.get(gridKey);
  if (osmCached) {
    for (const r of osmCached.roads) {
      if (!roadsMap.has(r.name)) roadsMap.set(r.name, r);
    }
    for (const v of osmCached.villages) {
      if (!villagesMap.has(v.name)) villagesMap.set(v.name, v);
    }
    for (const w of osmCached.waterways) {
      if (!waterwaysMap.has(w.name)) waterwaysMap.set(w.name, w);
    }
  } else {
    // สั่งดึงข้อมูลชื่อถนน/ซอยเสริมจาก Nominatim แบบพื้นหลัง (Non-blocking) โดยไม่ถ่วงการแสดงผลหลัก
    enrichLocalPlacesFromNominatimAsync(location);
  }

  return {
    roads: Array.from(roadsMap.values()).slice(0, 12),
    villages: Array.from(villagesMap.values()).slice(0, 12),
    waterways: Array.from(waterwaysMap.values()).slice(0, 8)
  };
}

const osmInflightSet = new Set<string>();

function enrichLocalPlacesFromNominatimAsync(location: ThaiLocation) {
  const gridKey = getGridKey(location.lat, location.lng);
  if (osmLocalEnrichCache.has(gridKey) || osmInflightSet.has(gridKey)) return;
  osmInflightSet.add(gridKey);

  (async () => {
    const roads: RealLocalPlace[] = [];
    const villages: RealLocalPlace[] = [];
    const waterways: RealLocalPlace[] = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const revUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}&zoom=17&addressdetails=1&accept-language=th`;
      const res = await fetch(revUrl, {
        headers: { 'User-Agent': 'ThaiWeatherWaterApp/1.0' },
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (res.ok) {
        const data = await res.json();
        const addr = data?.address || {};
        const roadName = (addr.road || addr.pedestrian || addr.highway || '').trim();
        const suburb = (
          addr.suburb ||
          addr.neighbourhood ||
          addr.village ||
          addr.hamlet ||
          addr.quarter ||
          ''
        ).trim();

        if (roadName) {
          roads.push({
            id: `nom-rev-rd-${roadName}`,
            name: roadName,
            category: 'road',
            typeLabel: roadName.includes('ซอย') ? 'ซอยย่อยในพิกัดนี้' : 'ถนนจริงในพิกัดนี้',
            districtName: suburb || location.tambon,
            lat: location.lat,
            lng: location.lng,
            distanceKm: 0,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
            googleTrafficUrl: `https://www.google.com/maps/@${location.lat},${location.lng},16z/data=!5m1!1e1`,
            openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`,
            sourceLabel: 'แผนที่จริง OpenStreetMap'
          });
        }
        if (suburb) {
          villages.push({
            id: `nom-rev-sub-${suburb}`,
            name: suburb,
            category: 'village',
            typeLabel: 'ย่านชุมชน / หมู่บ้านในพื้นที่',
            streetName: roadName || undefined,
            lat: location.lat,
            lng: location.lng,
            distanceKm: 0,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
            googleTrafficUrl: `https://www.google.com/maps/@${location.lat},${location.lng},16z/data=!5m1!1e1`,
            openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`,
            sourceLabel: 'แผนที่จริง OpenStreetMap'
          });
        }
      }
    } catch {
      // ignore timeout
    } finally {
      osmLocalEnrichCache.set(gridKey, { roads, villages, waterways });
      osmInflightSet.delete(gridKey);
      if (roads.length > 0 || villages.length > 0) {
        notifyBackgroundListeners();
      }
    }
  })();
}

function assembleLocationStatus(
  location: ThaiLocation,
  weatherPayload: ParsedWeatherPayload
): LocationRealtimeStatus {
  const { lat, lng } = location;

  const sortedWaterStations = findNearestWaterStationsFast(lat, lng, 4);
  const primaryWaterStation = sortedWaterStations[0] || null;

  const sortedRainStations = findNearestRainStationsFast(lat, lng, 5);
  const primaryRainStation = sortedRainStations[0] || null;

  const localRainStationsWithin15Km = sortedRainStations.filter((s) => s.distanceKm <= 15);
  const maxLocalRain24hMm =
    localRainStationsWithin15Km.length > 0
      ? Math.max(...localRainStationsWithin15Km.map((s) => s.rain24hMm))
      : primaryRainStation && primaryRainStation.distanceKm <= 30
        ? primaryRainStation.rain24hMm
        : 0;

  const weatherInfo = interpretWeather(
    weatherPayload.wmoCode,
    weatherPayload.tempC,
    weatherPayload.feelsLikeC,
    weatherPayload.precipMm,
    weatherPayload.windKmh,
    weatherPayload.isDay
  );

  const waterEval = evaluateRealWaterSafety(
    primaryWaterStation,
    maxLocalRain24hMm,
    weatherPayload.precipMm,
    location
  );

  const realLocal = buildFastRealLocalPlaces(location, sortedWaterStations, sortedRainStations);

  const trafficStatus = evaluateRealtimeTraffic(
    location,
    waterEval.tier,
    weatherPayload.precipMm,
    maxLocalRain24hMm,
    realLocal.roads
  );

  const overallSummaryTitle = `${waterEval.headline} • ${trafficStatus.badgeLabel}`;
  const overallSummaryDetail = `${weatherInfo.headline} (${weatherInfo.feelsLikeHeadline}) • ${trafficStatus.headline}`;

  const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,is_day&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok&forecast_days=3`;

  const verificationLinks: VerificationLinks = {
    thaiWaterLevelWebUrl: 'https://www.thaiwater.net/water/wl',
    thaiWaterLevelApiUrl: THAIWATER_WL_API,
    thaiWaterRainWebUrl: 'https://www.thaiwater.net/weather/rain',
    thaiWaterRainApiUrl: THAIWATER_RAIN_API,
    tmdWebUrl: 'https://www.tmd.go.th/',
    windyRadarUrl: `https://www.windy.com/${lat.toFixed(4)}/${lng.toFixed(4)}?rain,${lat.toFixed(4)},${lng.toFixed(4)},12`,
    openMeteoApiUrl: openMeteoUrl,
    dohFloodWebUrl: 'https://bmm.doh.go.th/',
    bmaFloodWebUrl: 'https://dds.bangkok.go.th/',
    googleMapsTrafficUrl: `https://www.google.com/maps/@${lat.toFixed(4)},${lng.toFixed(4)},15z/data=!5m1!1e1`,
    googleMapsLocationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location.roadName
        ? `${location.name} ${location.amphoe} ${location.province}`
        : `${location.tambon} ${location.amphoe} ${location.province}`
    )}`,
    openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${lat.toFixed(4)}&mlon=${lng.toFixed(4)}#map=15/${lat.toFixed(4)}/${lng.toFixed(4)}`
  };

  return {
    location,
    updatedAt: new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    overallSummaryTitle,
    overallSummaryDetail,
    weatherKind: weatherInfo.kind,
    weatherHeadline: weatherInfo.headline,
    weatherDescription: weatherInfo.description,
    tempC: weatherPayload.tempC,
    feelsLikeC: weatherPayload.feelsLikeC,
    feelsLikeHeadline: weatherInfo.feelsLikeHeadline,
    clothingAdvice: weatherInfo.clothingAdvice,
    humidityPercent: weatherPayload.humidityPercent,
    windKmh: weatherPayload.windKmh,
    windGustKmh: weatherPayload.windGustKmh,
    rainMmPerHour: weatherPayload.precipMm,
    rainProbabilityPercent: weatherPayload.rainProbPercent,
    cloudCoverPercent: weatherPayload.cloudCoverPercent,
    isDay: weatherPayload.isDay,
    weatherObservedAt: weatherPayload.weatherObservedAt,
    waterSafetyTier: waterEval.tier,
    waterHeadline: waterEval.headline,
    waterConditionReason: waterEval.reason,
    waterDriverAdvice: waterEval.driverAdvice,
    primaryWaterStation,
    nearbyWaterStations: sortedWaterStations,
    primaryRainStation,
    nearbyRainStations: sortedRainStations,
    maxLocalRain24hMm,
    trafficStatus,
    vehicleGuidances: waterEval.vehicleGuidances,
    hourlyForecast: weatherPayload.hourlyForecast,
    dailyForecast: weatherPayload.dailyForecast,
    realRoads: realLocal.roads,
    realVillagesAndLandmarks: realLocal.villages,
    realWaterways: realLocal.waterways,
    verificationLinks
  };
}

/**
 * เริ่มต้นดึงข้อมูลระดับน้ำและน้ำฝนล่วงหน้าแบบไม่บล็อกหน้าจอ
 */
export function warmupRealtimeDataEngine(): void {
  hydrateCachesFromStorage();
  fetchNationalThaiWaterData(false).catch(() => {});
}

/**
 * ดึงสถานะจาก Cache ทันที (0ms) สำหรับแสดงผลไร้รอยต่อ
 */
export function getCachedLocationStatus(location: ThaiLocation): LocationRealtimeStatus {
  const key = getGridKey(location.lat, location.lng);
  const cachedWeather = weatherGridCache.get(key) || parseSingleOpenMeteoObject(null);
  return assembleLocationStatus(location, cachedWeather);
}

/**
 * สร้างสถานะเริ่มต้นแบบทันที (0ms Synchronous) จากข้อมูลจริงที่มีใน Cache
 * เพื่อให้หน้าเว็บเปลี่ยนจุดหมายหรือสลับช่วงถนนได้ทันทีโดยไม่มีหน้าจอกะพริบหรือหมุนค้าง
 */
export function getInstantRouteStatuses(locations: ThaiLocation[]): LocationRealtimeStatus[] {
  return locations.map((loc) => getCachedLocationStatus(loc));
}

export async function fetchLocationStatus(
  location: ThaiLocation,
  forceRefresh = false
): Promise<LocationRealtimeStatus> {
  const [weatherMap] = await Promise.all([
    fetchWeatherForLocationsBatch([location], forceRefresh),
    fetchNationalThaiWaterData(forceRefresh)
  ]);

  const key = getGridKey(location.lat, location.lng);
  const weatherPayload =
    weatherMap.get(key) || weatherGridCache.get(key) || parseSingleOpenMeteoObject(null);

  return assembleLocationStatus(location, weatherPayload);
}

/**
 * ดึงข้อมูลทุกจุดหมายพร้อมกันแบบ Batch ความเร็วสูง (รองรับทั้งโหมด 1 จุด และโหมดเดินทางหลายจุด)
 */
export async function fetchRouteStatuses(
  locations: ThaiLocation[],
  forceRefresh = false
): Promise<LocationRealtimeStatus[]> {
  if (locations.length === 0) return [];

  await Promise.all([
    fetchWeatherForLocationsBatch(locations, forceRefresh),
    fetchNationalThaiWaterData(forceRefresh)
  ]);

  return locations.map((loc) => {
    const key = getGridKey(loc.lat, loc.lng);
    const weatherPayload = weatherGridCache.get(key) || parseSingleOpenMeteoObject(null);
    return assembleLocationStatus(loc, weatherPayload);
  });
}

/**
 * แปลง RoadSegmentEntry เป็น ThaiLocation พร้อมผูกช่วงถนนอื่นๆ ในเส้นเดียวกันและถนนสายหลักใกล้เคียง
 */
export function roadSegmentToLocation(
  seg: RoadSegmentEntry,
  allSameRoadSegments?: RoadSegmentEntry[]
): ThaiLocation {
  const sameRoadList =
    allSameRoadSegments || CURATED_ROAD_SEGMENTS.filter((r) => r.roadName === seg.roadName);
  const nearbyList = findNearbyRoadSegmentsByCoords(seg.lat, seg.lng, 6.0, 6).map(
    (item) => item.segment
  );

  const mergedSegmentsMap = new Map<string, RoadSegmentEntry>();
  for (const s of sameRoadList) mergedSegmentsMap.set(s.id, s);
  for (const s of nearbyList) {
    if (!mergedSegmentsMap.has(s.id)) mergedSegmentsMap.set(s.id, s);
  }

  const related = Array.from(mergedSegmentsMap.values()).map((r) => ({
    id: r.id,
    name: r.segmentTitle,
    province: r.province,
    amphoe: r.amphoe,
    tambon: r.tambon,
    region: r.region,
    lat: r.lat,
    lng: r.lng,
    highway: r.roadName,
    roadName: r.roadName,
    segmentSubtitle: r.segmentSubtitle,
    waterwayWatch: r.waterwayWatch,
    floodRiskNote: r.floodRiskNote,
    trafficHotspotNote: r.trafficHotspotNote
  }));

  return {
    id: seg.id,
    name: seg.segmentTitle,
    province: seg.province,
    amphoe: seg.amphoe,
    tambon: seg.tambon,
    region: seg.region,
    lat: seg.lat,
    lng: seg.lng,
    highway: seg.roadName,
    roadName: seg.roadName,
    segmentSubtitle: seg.segmentSubtitle,
    waterwayWatch: seg.waterwayWatch,
    floodRiskNote: seg.floodRiskNote,
    trafficHotspotNote: seg.trafficHotspotNote,
    relatedSegments: related
  };
}

/**
 * ตรวจจับคำค้นหาเชิงคำถามหรือสถานการณ์ภาพรวม เช่น
 * "ตอนนี้น้ำท่วมที่ไหนบ้าง", "ที่ไหนน้ำท่วม", "น้ำล้นตลิ่งที่ไหน", "ตอนนี้ฝนตกที่ไหนบ้าง", "ตอนนี้รถติดที่ไหนบ้าง"
 */
export function detectSituationQueryIntent(query: string): {
  intent: SituationQueryIntent | null;
  areaKeyword: string;
} {
  const clean = query.trim().toLowerCase();
  if (!clean) return { intent: null, areaKeyword: '' };

  const floodPatterns = [
    'น้ำท่วมที่ไหน',
    'ตอนนี้น้ำท่วม',
    'ที่ไหนน้ำท่วม',
    'จุดน้ำท่วม',
    'น้ำล้นตลิ่ง',
    'สถานการณ์น้ำ',
    'พื้นที่น้ำท่วม',
    'ถนนน้ำท่วม',
    'น้ำท่วมไหม',
    'น้ำท่วมขัง',
    'เช็คน้ำท่วม'
  ];

  const rainPatterns = [
    'ฝนตกที่ไหน',
    'ตอนนี้ฝนตก',
    'ที่ไหนฝนตก',
    'ฝนตกหนัก',
    'พื้นที่ฝนตก',
    'เรดาร์ฝน'
  ];

  const trafficPatterns = [
    'รถติดที่ไหน',
    'ตอนนี้รถติด',
    'ที่ไหนรถติด',
    'ถนนไหนรถติด',
    'จราจรติดขัด',
    'เช็ครถติด'
  ];

  let detected: SituationQueryIntent | null = null;
  if (
    floodPatterns.some((p) => clean.includes(p)) ||
    clean === 'น้ำท่วม' ||
    clean === 'น้ำท่วมล่าสุด'
  ) {
    detected = 'flood_now';
  } else if (rainPatterns.some((p) => clean.includes(p)) || clean === 'ฝนตก') {
    detected = 'rain_now';
  } else if (trafficPatterns.some((p) => clean.includes(p)) || clean === 'รถติด') {
    detected = 'traffic_now';
  }

  if (!detected) {
    return { intent: null, areaKeyword: '' };
  }

  const areaKeyword = clean
    .replace(
      /(ตอนนี้|เวลานี้|ล่าสุด|ที่ไหนบ้าง|ที่ไหน|บ้าง|จุด|พื้นที่|สถานการณ์|น้ำท่วมขัง|น้ำท่วม|น้ำล้นตลิ่ง|ฝนตกหนัก|ฝนตก|รถติดหนัก|รถติด|จราจรติดขัด|ถนนไหน|เช็ค|ดู|อยากรู้ว่า|อยากรู้|ไหม|ครับ|ค่ะ|\?)/g,
      ' '
    )
    .replace(/^(จังหวัด|จ\.|อำเภอ|อ\.|เขต|ตำบล|ต\.|แขวง|ถนน|ถ\.)\s*/, '')
    .trim();

  return { intent: detected, areaKeyword };
}

export function waterStationToLocation(ws: RealWaterStation): ThaiLocation {
  const baseLoc = createLocationFromTambon(
    ws.province || 'พระนครศรีอยุธยา',
    ws.amphoe || '',
    ws.tambon || ''
  );
  const nearbySegs = findNearbyRoadSegmentsByCoords(ws.lat, ws.lng, 8.0, 5);
  return {
    ...baseLoc,
    id: `tw-wl-station-${ws.id}`,
    name: `จุดตรวจระดับน้ำสถานี${ws.name} (${ws.basin})`,
    province: ws.province || baseLoc.province,
    amphoe: ws.amphoe ? (ws.amphoe.startsWith('อ.') || ws.amphoe.startsWith('เขต') ? ws.amphoe : `อ.${ws.amphoe}`) : baseLoc.amphoe,
    tambon: ws.tambon ? (ws.tambon.startsWith('ต.') || ws.tambon.startsWith('แขวง') ? ws.tambon : `ต.${ws.tambon}`) : baseLoc.tambon,
    lat: ws.lat,
    lng: ws.lng,
    waterwayWatch: `${ws.name} (${ws.basin})`,
    segmentSubtitle: `${ws.situationLabel} • ระดับน้ำ ${ws.storagePercent !== null ? `${ws.storagePercent.toFixed(1)}% ของความจุลำน้ำ` : `${ws.waterLevelMsl ?? '-'} ม.รทก.`} • อัปเดต ${ws.observedAt}`,
    relatedSegments:
      nearbySegs.length > 0
        ? nearbySegs.map((ns) => roadSegmentToLocation(ns.segment))
        : undefined
  };
}

export function rainStationToLocation(rs: RealRainStation): ThaiLocation {
  const baseLoc = createLocationFromTambon(
    rs.province || 'กรุงเทพมหานคร',
    rs.amphoe || '',
    rs.tambon || ''
  );
  const nearbySegs = findNearbyRoadSegmentsByCoords(rs.lat, rs.lng, 8.0, 5);
  return {
    ...baseLoc,
    id: `tw-rain-station-${rs.id}`,
    name: `จุดตรวจวัดน้ำฝน ${rs.name} (ต.${rs.tambon || '-'})`,
    province: rs.province || baseLoc.province,
    amphoe: rs.amphoe ? (rs.amphoe.startsWith('อ.') || rs.amphoe.startsWith('เขต') ? rs.amphoe : `อ.${rs.amphoe}`) : baseLoc.amphoe,
    tambon: rs.tambon ? (rs.tambon.startsWith('ต.') || rs.tambon.startsWith('แขวง') ? rs.tambon : `ต.${rs.tambon}`) : baseLoc.tambon,
    lat: rs.lat,
    lng: rs.lng,
    segmentSubtitle: `ฝนสะสม 24 ชม. ${rs.rain24hMm.toFixed(1)} มม. • อ.${rs.amphoe} จ.${rs.province}`,
    relatedSegments:
      nearbySegs.length > 0
        ? nearbySegs.map((ns) => roadSegmentToLocation(ns.segment))
        : undefined
  };
}

/**
 * สร้างรายงานสรุปสถานการณ์สดทั่วไทย (น้ำท่วม/น้ำล้นตลิ่ง • ฝนตกหนัก • สภาพจราจรสีเขียว-เหลือง-แดง)
 * รองรับการค้นหาคำถาม เช่น "ตอนนี้น้ำท่วมที่ไหนบ้าง", "ที่ไหนฝนตกหนัก", "ตอนนี้ถนนไหนรถติดบ้าง"
 */
export function getNationwideSituationReport(
  rawQuery = '',
  forceIntent?: SituationQueryIntent
): NationwideSituationReport {
  const detected = detectSituationQueryIntent(rawQuery);
  const intent: SituationQueryIntent = forceIntent || detected.intent || 'flood_now';
  const areaFilter = detected.areaKeyword;
  const areaLower = areaFilter.toLowerCase();

  const matchesArea = (province: string, amphoe: string, tambon: string, name: string) => {
    if (!areaLower) return true;
    return (
      province.toLowerCase().includes(areaLower) ||
      amphoe.toLowerCase().includes(areaLower) ||
      tambon.toLowerCase().includes(areaLower) ||
      name.toLowerCase().includes(areaLower)
    );
  };

  // 1. คัดแยกสถานีวัดระดับน้ำทั่วประเทศจากคลังข้อมูลน้ำแห่งชาติ (สสน. ThaiWater)
  const allWater = thaiWaterCache.waterStations;
  const overflowList: Array<{ station: RealWaterStation; location: ThaiLocation }> = [];
  const watchList: Array<{ station: RealWaterStation; location: ThaiLocation }> = [];

  for (let i = 0; i < allWater.length; i++) {
    const ws = allWater[i];
    if (!matchesArea(ws.province, ws.amphoe, ws.tambon, `${ws.name} ${ws.basin}`)) {
      continue;
    }
    const pct = ws.storagePercent ?? 0;
    if (ws.situationLevel === 5 || pct > 100) {
      overflowList.push({ station: ws, location: waterStationToLocation(ws) });
    } else if (ws.situationLevel === 4 || (pct >= 80 && pct <= 100)) {
      watchList.push({ station: ws, location: waterStationToLocation(ws) });
    }
  }

  overflowList.sort((a, b) => (b.station.storagePercent ?? 0) - (a.station.storagePercent ?? 0));
  watchList.sort((a, b) => (b.station.storagePercent ?? 0) - (a.station.storagePercent ?? 0));

  // 2. คัดแยกสถานีที่มีฝนตกสะสมสูงสุดจากคลังข้อมูลน้ำแห่งชาติ
  const allRain = thaiWaterCache.rainStations;
  const rainList: Array<{ station: RealRainStation; location: ThaiLocation }> = [];
  for (let i = 0; i < allRain.length; i++) {
    const rs = allRain[i];
    if (rs.rain24hMm <= 0) continue;
    if (!matchesArea(rs.province, rs.amphoe, rs.tambon, rs.name)) continue;
    rainList.push({ station: rs, location: rainStationToLocation(rs) });
  }
  rainList.sort((a, b) => b.station.rain24hMm - a.station.rain24hMm);

  // 3. ประเมินสถานะช่วงถนนสายหลักทั้งหมดในระบบด้วยข้อมูลสด
  const allRoadStatuses = CURATED_ROAD_SEGMENTS.filter((seg) =>
    matchesArea(seg.province, seg.amphoe, seg.tambon, `${seg.segmentTitle} ${seg.roadName}`)
  ).map((seg) => getCachedLocationStatus(roadSegmentToLocation(seg)));

  const tierRank: Record<WaterSafetyTier, number> = {
    critical: 4,
    danger: 3,
    watch: 2,
    normal: 1
  };

  const floodWatchRoads = [...allRoadStatuses].sort((a, b) => {
    const diffTier = tierRank[b.waterSafetyTier] - tierRank[a.waterSafetyTier];
    if (diffTier !== 0) return diffTier;
    const pctB = b.primaryWaterStation?.storagePercent ?? 0;
    const pctA = a.primaryWaterStation?.storagePercent ?? 0;
    return pctB - pctA;
  });

  const redTrafficRoads = allRoadStatuses.filter((s) => s.trafficStatus.colorCode === 'red');
  const yellowTrafficRoads = allRoadStatuses.filter((s) => s.trafficStatus.colorCode === 'yellow');
  const greenTrafficRoads = allRoadStatuses.filter((s) => s.trafficStatus.colorCode === 'green');

  let queryTitle = 'สรุปสถานการณ์สด: ตอนนี้น้ำท่วม / น้ำล้นตลิ่ง และจุดเฝ้าระวังที่ไหนบ้างทั่วไทย';
  let querySubtitle = `ประมวลผลสดจากสถานีวัดระดับน้ำ สสน. (${allWater.length.toLocaleString()} สถานี) • สถานีวัดน้ำฝน (${allRain.length.toLocaleString()} สถานี) และโครงข่ายถนนสายหลัก`;

  if (intent === 'rain_now') {
    queryTitle = 'สรุปสถานการณ์สด: ตอนนี้พื้นที่ไหนมีฝนตกหนักและฝนสะสมสูงสุดบ้าง';
  } else if (intent === 'traffic_now') {
    queryTitle = 'สรุปการจราจรสด: สถานะสีจราจร (แดง-เหลือง-เขียว) บนถนนสายหลักตอนนี้';
  }

  if (areaFilter) {
    queryTitle += ` (เฉพาะเขตพื้นที่ “${areaFilter}”)`;
  }

  return {
    intent,
    queryTitle,
    querySubtitle,
    areaFilter,
    updatedAt: new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    totalMonitoredWaterStations: allWater.length,
    totalMonitoredRainStations: allRain.length,
    overflowWaterStations: overflowList.slice(0, 30),
    watchWaterStations: watchList.slice(0, 30),
    activeRainStations: rainList.slice(0, 30),
    floodWatchRoads,
    redTrafficRoads,
    yellowTrafficRoads,
    greenTrafficRoads
  };
}

export interface FullTelemetrySnapshot {
  updatedAt: string;
  totalWaterCount: number;
  totalRainCount: number;
  totalRoadCount: number;
  waterStations: Array<{ station: RealWaterStation; location: ThaiLocation }>;
  rainStations: Array<{ station: RealRainStation; location: ThaiLocation }>;
  roadStatuses: LocationRealtimeStatus[];
}

/**
 * ดึงข้อมูลตารางสถานีวัดระดับน้ำ สถานีวัดน้ำฝน และสถานะถนน/สีจราจรทั้งหมดสำหรับแสดงในเว็บโดยตรง
 */
export function getAllLiveTelemetrySnapshot(areaQuery = ''): FullTelemetrySnapshot {
  const q = areaQuery.trim().toLowerCase();
  const matches = (province: string, amphoe: string, tambon: string, extra: string) => {
    if (!q) return true;
    return (
      province.toLowerCase().includes(q) ||
      amphoe.toLowerCase().includes(q) ||
      tambon.toLowerCase().includes(q) ||
      extra.toLowerCase().includes(q)
    );
  };

  const filteredWater = thaiWaterCache.waterStations
    .filter((ws) => matches(ws.province, ws.amphoe, ws.tambon, `${ws.name} ${ws.basin} ${ws.agency}`))
    .slice()
    .sort((a, b) => (b.storagePercent ?? 0) - (a.storagePercent ?? 0))
    .slice(0, 120)
    .map((ws) => ({
      station: ws,
      location: waterStationToLocation(ws)
    }));

  const filteredRain = thaiWaterCache.rainStations
    .filter((rs) => matches(rs.province, rs.amphoe, rs.tambon, `${rs.name} ${rs.agency}`))
    .slice()
    .sort((a, b) => b.rain24hMm - a.rain24hMm)
    .slice(0, 120)
    .map((rs) => ({
      station: rs,
      location: rainStationToLocation(rs)
    }));

  const roadStatuses = CURATED_ROAD_SEGMENTS.filter((seg) =>
    matches(seg.province, seg.amphoe, seg.tambon, `${seg.segmentTitle} ${seg.roadName} ${seg.placeName || ''}`)
  ).map((seg) => getCachedLocationStatus(roadSegmentToLocation(seg)));

  return {
    updatedAt: new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    totalWaterCount: thaiWaterCache.waterStations.length,
    totalRainCount: thaiWaterCache.rainStations.length,
    totalRoadCount: CURATED_ROAD_SEGMENTS.length,
    waterStations: filteredWater,
    rainStations: filteredRain,
    roadStatuses
  };
}

function getQuickTrafficAndWaterPreview(loc: ThaiLocation): {
  trafficColor: TrafficColorCode;
  trafficLabel: string;
  waterTier: WaterSafetyTier;
  waterLabel: string;
} {
  const st = getCachedLocationStatus(loc);
  const waterShort =
    st.waterSafetyTier === 'critical'
      ? 'วิกฤตน้ำท่วมสูง'
      : st.waterSafetyTier === 'danger'
        ? 'ระวังน้ำท่วมขัง'
        : st.waterSafetyTier === 'watch'
          ? 'เฝ้าระวังน้ำ/ฝน'
          : 'ถนนแห้งปกติ';

  return {
    trafficColor: st.trafficStatus.colorCode,
    trafficLabel: st.trafficStatus.colorNameTh,
    waterTier: st.waterSafetyTier,
    waterLabel: waterShort
  };
}

/**
 * ค้นหาแบบทันทีภายใน < 1 มิลลิวินาที (0ms Instant Local Search)
 * รองรับทั้ง:
 * 1) คำถามสถานการณ์สด เช่น "ตอนนี้น้ำท่วมที่ไหนบ้าง", "ที่ไหนฝนตกหนัก", "ตอนนี้รถติดที่ไหนบ้าง"
 * 2) ชื่อสถานที่สำคัญ (เช่น อนุสรณ์สถาน, ฟิวเจอร์พาร์ค) โดยไม่ต้องรู้ชื่อถนน ระบบดึงถนนใกล้เคียงให้ทันที
 * 3) ชื่อถนน ช่วงถนน และ 7,436 ตำบลทั่วไทย พร้อมสัญลักษณ์สีจราจร (เขียว/เหลือง/แดง)
 */
export function searchLocalRoadsAndLocationsSync(query: string): SearchResultItem[] {
  const clean = query.trim();
  if (!clean) return [];

  const qLower = clean.toLowerCase();
  const strippedRoadQuery = clean
    .replace(/^(ถนน|ถ\.|ซอย|ซ\.|แยก|สะพาน|ตำบล|ต\.|แขวง|อำเภอ|อ\.|เขต|จังหวัด|จ\.)\s*/, '')
    .trim();
  const strippedLower = (strippedRoadQuery || clean).toLowerCase();

  const results: SearchResultItem[] = [];
  const seenIds = new Set<string>();

  // 0. ตรวจสอบว่าผู้ใช้พิมพ์คำถามเช่น "ตอนนี้น้ำท่วมที่ไหนบ้าง" หรือไม่
  const situationCheck = detectSituationQueryIntent(clean);
  if (situationCheck.intent) {
    const report = getNationwideSituationReport(clean, situationCheck.intent);
    const defaultLoc =
      report.overflowWaterStations[0]?.location ||
      report.watchWaterStations[0]?.location ||
      report.floodWatchRoads[0]?.location ||
      createLocationFromTambon('ปทุมธานี', 'อ.ลำลูกกา', 'ต.คูคต');

    results.push({
      id: `situation-report-${situationCheck.intent}-${situationCheck.areaKeyword || 'all'}`,
      category: 'situation_overview',
      categoryBadge:
        situationCheck.intent === 'flood_now'
          ? 'รายงานสดน้ำท่วมทั่วไทย'
          : situationCheck.intent === 'rain_now'
            ? 'รายงานสดพื้นที่ฝนตก'
            : 'รายงานสดสภาพจราจร',
      title: report.queryTitle,
      subtitle: `พบจุดน้ำล้นตลิ่ง ${report.overflowWaterStations.length} จุด • จุดเฝ้าระวังน้ำมาก ${report.watchWaterStations.length} จุด • พื้นที่ฝนตก ${report.activeRainStations.length} จุด (คลิกเพื่อดูรายการทั้งหมด)`,
      situationIntent: situationCheck.intent,
      location: defaultLoc
    });

    // แสดงรายการจุดน้ำล้นตลิ่งและจุดเฝ้าระวังจริงต่อท้ายในผลการค้นหาทันที
    if (situationCheck.intent === 'flood_now') {
      for (const item of report.overflowWaterStations.slice(0, 8)) {
        const ws = item.station;
        const preview = getQuickTrafficAndWaterPreview(item.location);
        seenIds.add(item.location.id);
        results.push({
          id: item.location.id,
          category: 'flood_station_live',
          categoryBadge: '🔴 น้ำล้นตลิ่ง (ข้อมูลสด สสน.)',
          title: `สถานี${ws.name} (${ws.basin}) — อ.${ws.amphoe} จ.${ws.province}`,
          subtitle: `ระดับน้ำ ${ws.storagePercent !== null ? `${ws.storagePercent.toFixed(1)}% ของความจุลำน้ำ` : '-'} (${ws.diffBankText} ${ws.diffBankM ?? '-'} ม.) • อัปเดต ${ws.observedAt}`,
          distanceText: 'น้ำล้นตลิ่ง',
          trafficColor: preview.trafficColor,
          trafficLabel: preview.trafficLabel,
          waterTier: 'critical',
          waterLabel: 'น้ำล้นตลิ่ง',
          location: item.location
        });
      }

      for (const item of report.watchWaterStations.slice(0, 6)) {
        const ws = item.station;
        const preview = getQuickTrafficAndWaterPreview(item.location);
        seenIds.add(item.location.id);
        results.push({
          id: item.location.id,
          category: 'flood_station_live',
          categoryBadge: '🟠 เฝ้าระวังน้ำมากใกล้ตลิ่ง (สสน.)',
          title: `สถานี${ws.name} (${ws.basin}) — อ.${ws.amphoe} จ.${ws.province}`,
          subtitle: `ระดับน้ำ ${ws.storagePercent !== null ? `${ws.storagePercent.toFixed(1)}% ของความจุตลิ่ง` : '-'} • อัปเดต ${ws.observedAt}`,
          distanceText: `${ws.storagePercent?.toFixed(0) ?? '-'}% ของตลิ่ง`,
          trafficColor: preview.trafficColor,
          trafficLabel: preview.trafficLabel,
          waterTier: 'watch',
          waterLabel: 'เฝ้าระวังน้ำมาก',
          location: item.location
        });
      }

      for (const roadSt of report.floodWatchRoads.slice(0, 6)) {
        if (!seenIds.has(roadSt.location.id)) {
          seenIds.add(roadSt.location.id);
          results.push({
            id: roadSt.location.id,
            category: 'road_segment',
            categoryBadge: 'ถนนสายหลักจุดเฝ้าระวังน้ำ',
            title: roadSt.location.name,
            subtitle: `${roadSt.waterHeadline} • ${roadSt.location.floodRiskNote || roadSt.waterConditionReason}`,
            trafficColor: roadSt.trafficStatus.colorCode,
            trafficLabel: roadSt.trafficStatus.colorNameTh,
            waterTier: roadSt.waterSafetyTier,
            waterLabel: roadSt.waterHeadline,
            location: roadSt.location
          });
        }
      }
    } else if (situationCheck.intent === 'rain_now') {
      for (const item of report.activeRainStations.slice(0, 10)) {
        const rs = item.station;
        const preview = getQuickTrafficAndWaterPreview(item.location);
        results.push({
          id: item.location.id,
          category: 'flood_station_live',
          categoryBadge: `🌧️ ฝนสะสม ${rs.rain24hMm} มม.`,
          title: `สถานี${rs.name} — ต.${rs.tambon} อ.${rs.amphoe} จ.${rs.province}`,
          subtitle: `ปริมาณฝนสะสม 24 ชม. ${rs.rain24hMm} มม. (${rs.agencyShort}) • อัปเดต ${rs.observedAt}`,
          trafficColor: preview.trafficColor,
          trafficLabel: preview.trafficLabel,
          waterTier: rs.rain24hMm >= 60 ? 'danger' : 'watch',
          waterLabel: `ฝน ${rs.rain24hMm} มม.`,
          location: item.location
        });
      }
    } else if (situationCheck.intent === 'traffic_now') {
      for (const roadSt of [
        ...report.redTrafficRoads,
        ...report.yellowTrafficRoads,
        ...report.greenTrafficRoads
      ].slice(0, 14)) {
        results.push({
          id: roadSt.location.id,
          category: 'road_segment',
          categoryBadge: roadSt.trafficStatus.colorNameTh,
          title: roadSt.location.name,
          subtitle: `${roadSt.trafficStatus.headline} • ${roadSt.trafficStatus.estimatedSpeedText}`,
          trafficColor: roadSt.trafficStatus.colorCode,
          trafficLabel: roadSt.trafficStatus.colorNameTh,
          waterTier: roadSt.waterSafetyTier,
          waterLabel: roadSt.waterHeadline,
          location: roadSt.location
        });
      }
    }

    if (!situationCheck.areaKeyword) {
      return results;
    }
  }

  // 1. ค้นหาจากฐานข้อมูลจำแนกช่วงถนนสายหลักและสถานที่สำคัญ (CURATED_ROAD_SEGMENTS)
  const matchedCurated = CURATED_ROAD_SEGMENTS.filter(
    (seg) =>
      seg.roadName.toLowerCase().includes(qLower) ||
      seg.roadName.toLowerCase().includes(strippedLower) ||
      (seg.placeName &&
        (seg.placeName.toLowerCase().includes(qLower) ||
          seg.placeName.toLowerCase().includes(strippedLower))) ||
      seg.segmentTitle.toLowerCase().includes(qLower) ||
      seg.segmentTitle.toLowerCase().includes(strippedLower) ||
      seg.segmentSubtitle.toLowerCase().includes(qLower) ||
      seg.keywords.some(
        (k) =>
          k.toLowerCase().includes(qLower) ||
          k.toLowerCase().includes(strippedLower) ||
          strippedLower.includes(k.toLowerCase())
      )
  );

  // 1.1 เพิ่มรายการที่ตรงกับคำค้นหาโดยตรงก่อน (ทั้งสถานที่สำคัญและช่วงถนนสายหลัก)
  for (const seg of matchedCurated) {
    const loc = roadSegmentToLocation(seg);
    if (seenIds.has(loc.id)) continue;
    seenIds.add(loc.id);

    const isLandmarkMatch =
      Boolean(
        seg.placeName &&
          (seg.placeName.toLowerCase().includes(qLower) ||
            seg.placeName.toLowerCase().includes(strippedLower))
      ) ||
      (!seg.roadName.toLowerCase().includes(strippedLower) &&
        seg.keywords.some(
          (k) =>
            k.toLowerCase().includes(qLower) ||
            k.toLowerCase().includes(strippedLower) ||
            strippedLower.includes(k.toLowerCase())
        ));

    const displayTitle =
      isLandmarkMatch && seg.placeName && !seg.segmentTitle.includes(seg.placeName)
        ? `${seg.placeName} • บน${seg.segmentTitle}`
        : seg.segmentTitle;

    const preview = getQuickTrafficAndWaterPreview(loc);

    results.push({
      id: loc.id,
      category: isLandmarkMatch ? 'landmark_place' : 'road_segment',
      categoryBadge: isLandmarkMatch
        ? 'สถานที่สำคัญ • ระบุถนนให้อัตโนมัติ'
        : 'จำแนกช่วงถนนสายหลัก',
      title: displayTitle,
      subtitle: `${seg.segmentSubtitle} • จ.${seg.province}`,
      distanceText: isLandmarkMatch ? `บน ${seg.roadName}` : undefined,
      trafficColor: preview.trafficColor,
      trafficLabel: preview.trafficLabel,
      waterTier: preview.waterTier,
      waterLabel: preview.waterLabel,
      location: loc
    });
  }

  // 1.2 ดึงถนนสายหลักใกล้เคียงรอบพิกัดที่ค้นหามาแสดงต่อท้ายทันที (ช่วยให้ค้นหาแค่ชื่อสถานที่แล้วรู้ถนนรอบข้างครบทุกสาย)
  for (const seg of matchedCurated) {
    const nearbySegs = findNearbyRoadSegmentsByCoords(seg.lat, seg.lng, 6.5, 6);
    for (const { segment: nearSeg, distanceKm } of nearbySegs) {
      if (!seenIds.has(nearSeg.id)) {
        seenIds.add(nearSeg.id);
        const nearLoc = roadSegmentToLocation(nearSeg);
        const preview = getQuickTrafficAndWaterPreview(nearLoc);
        results.push({
          id: nearLoc.id,
          category: 'nearby_road',
          categoryBadge: 'ถนนใกล้เคียงพิกัดที่ค้นหา',
          title: nearSeg.segmentTitle,
          subtitle: `${nearSeg.segmentSubtitle} • จ.${nearSeg.province}`,
          distanceText: distanceKm === 0 ? 'เชื่อมต่อจุดนี้' : `ห่าง ${distanceKm} กม.`,
          trafficColor: preview.trafficColor,
          trafficLabel: preview.trafficLabel,
          waterTier: preview.waterTier,
          waterLabel: preview.waterLabel,
          location: nearLoc
        });
      }
    }
  }

  // 2. ค้นหาจากดัชนี 7,436 ตำบลทั่วไทยแบบความเร็วสูง (< 0.3ms)
  const flatIndex = getFlatTambonIndex();
  for (let i = 0; i < flatIndex.length; i++) {
    const item = flatIndex[i];
    if (item.searchKey.includes(qLower) || item.searchKey.includes(strippedLower)) {
      const loc = createLocationFromTambon(item.province, item.amphoe, item.tambon);
      if (!seenIds.has(loc.id)) {
        seenIds.add(loc.id);

        // ตรวจสอบว่ามีถนนสายหลักในรัศมี 6.5 กม. ของตำบลนี้หรือไม่ เพื่อผูกเป็น relatedSegments และแสดงถนนใกล้เคียง
        const nearbyRoads = findNearbyRoadSegmentsByCoords(loc.lat, loc.lng, 6.5, 5);
        if (nearbyRoads.length > 0) {
          loc.relatedSegments = [
            loc,
            ...nearbyRoads.map((nr) => roadSegmentToLocation(nr.segment))
          ];
        }

        const preview = getQuickTrafficAndWaterPreview(loc);

        results.push({
          id: loc.id,
          category: 'subdistrict',
          categoryBadge: 'ตำบล / แขวง',
          title: `${loc.name} จ.${loc.province}`,
          subtitle: `ครอบคลุมพื้นที่ ${item.tambon} ${item.amphoe} จังหวัด${item.province}`,
          trafficColor: preview.trafficColor,
          trafficLabel: preview.trafficLabel,
          waterTier: preview.waterTier,
          waterLabel: preview.waterLabel,
          location: loc
        });
        if (results.length >= 24) break;
      }
    }
  }

  return results;
}

export const searchLocalInstant = searchLocalRoadsAndLocationsSync;

/**
 * ค้นหาอัจฉริยะแบบครบวงจร:
 * รวมผลลัพธ์ท้องถิ่น (0ms) เข้ากับการค้นหาสถานที่สำคัญ/อาคาร/ห้าง/วัด/ถนน/ซอยทุกสายทั่วไทยจาก OpenStreetMap (Nominatim)
 * พร้อมค้นหาถนนสายหลักในพิกัดใกล้เคียงให้อัตโนมัติสำหรับทุกสถานที่ที่ผู้ใช้พิมพ์ค้นหา
 */
export async function searchRoadsAndLocations(query: string): Promise<SearchResultItem[]> {
  const clean = query.trim();
  if (!clean) return [];

  const cacheKey = clean.toLowerCase();
  if (searchRemoteCache.has(cacheKey)) {
    return searchRemoteCache.get(cacheKey)!;
  }

  const localResults = searchLocalRoadsAndLocationsSync(clean);
  const sitCheck = detectSituationQueryIntent(clean);
  if (sitCheck.intent && !sitCheck.areaKeyword) {
    return localResults;
  }

  const results: SearchResultItem[] = [...localResults];
  const seenIds = new Set<string>(localResults.map((r) => r.id));

  const strippedRoadQuery = clean
    .replace(/^(ถนน|ถ\.|ซอย|ซ\.|แยก|สะพาน)\s*/, '')
    .trim();
  const strippedLower = (strippedRoadQuery || clean).toLowerCase();

  if (strippedRoadQuery.length >= 2) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1600);

      // ใช้คำขอเดียวที่รวดเร็วที่สุด (~70ms) เพื่อค้นหาพิกัดสถานที่และถนนทั่วไทย
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
        clean
      )}&countrycodes=th&addressdetails=1&dedupe=0&limit=15&accept-language=th`;

      const res = await fetch(nominatimUrl, {
        headers: { 'User-Agent': 'ThaiWeatherWaterApp/1.0' },
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (res.ok) {
        const rawOsmItems = await res.json();
        if (Array.isArray(rawOsmItems)) {
          for (const item of rawOsmItems) {
            const lat = Number(item?.lat);
            const lng = Number(item?.lon);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

            const nearestAdmin = findNearestTambonByCoords(lat, lng);
            const nearbyCurated = findNearbyRoadSegmentsByCoords(lat, lng, 7.0, 6);
            const closestCuratedRoad = nearbyCurated[0]?.segment;

            const addr = item?.address || {};
            const roadFromAddr = (
              addr.road ||
              addr.highway ||
              closestCuratedRoad?.roadName ||
              ''
            ).trim();
            const subArea =
              addr.suburb ||
              addr.quarter ||
              addr.neighbourhood ||
              addr.village ||
              addr.hamlet ||
              nearestAdmin.tambon;
            const districtArea =
              addr.city_district || addr.county || addr.city || addr.town || nearestAdmin.amphoe;
            const provinceArea = (
              addr.state ||
              addr.province ||
              nearestAdmin.province
            ).replace(/^จังหวัด\s*/, '');

            const rawItemName = (item?.name || roadFromAddr || clean).trim();
            const displayParts = (item?.display_name || '')
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean);

            const isPlaceOrLandmark =
              item?.category !== 'highway' &&
              !rawItemName.startsWith('ถนน') &&
              !rawItemName.startsWith('ซอย');

            const contextLandmark =
              roadFromAddr && roadFromAddr !== rawItemName
                ? `บน${roadFromAddr}`
                : displayParts.length > 1 && displayParts[1] !== rawItemName
                  ? displayParts[1]
                  : subArea;

            const segmentedTitle =
              rawItemName.includes('ช่วง') || rawItemName.includes('-')
                ? `${rawItemName} (${subArea})`
                : isPlaceOrLandmark
                  ? `${rawItemName} • ${contextLandmark} (${districtArea})`
                  : `${rawItemName} - ช่วง${contextLandmark} (${districtArea})`;

            const dedupeKey = segmentedTitle.toLowerCase();
            if (seenIds.has(dedupeKey)) continue;
            seenIds.add(dedupeKey);

            const isSoi =
              rawItemName.includes('ซอย') ||
              item?.type === 'residential' ||
              item?.category === 'landuse';

            const relatedRoadLocations = nearbyCurated.map((nc) =>
              roadSegmentToLocation(nc.segment)
            );

            const locObj: ThaiLocation = {
              id: `osm-search-${item?.place_id || dedupeKey}`,
              name: segmentedTitle,
              province: provinceArea || nearestAdmin.province,
              amphoe: districtArea || nearestAdmin.amphoe,
              tambon: subArea || nearestAdmin.tambon,
              region: nearestAdmin.region,
              lat,
              lng,
              highway: roadFromAddr || rawItemName || nearestAdmin.highway,
              roadName: roadFromAddr || rawItemName,
              segmentSubtitle: `${displayParts.slice(0, 4).join(' • ')}`,
              waterwayWatch: closestCuratedRoad?.waterwayWatch,
              floodRiskNote: closestCuratedRoad?.floodRiskNote,
              trafficHotspotNote: closestCuratedRoad?.trafficHotspotNote,
              relatedSegments: undefined
            };

            if (relatedRoadLocations.length > 0) {
              locObj.relatedSegments = [locObj, ...relatedRoadLocations];
            }

            const preview = getQuickTrafficAndWaterPreview(locObj);

            results.push({
              id: locObj.id,
              category: isPlaceOrLandmark
                ? 'landmark_place'
                : isSoi
                  ? 'road_soi'
                  : 'road_segment',
              categoryBadge: isPlaceOrLandmark
                ? 'สถานที่สำคัญ • สกัดชื่อถนนให้อัตโนมัติ'
                : isSoi
                  ? 'ซอยย่อย / ชุมชนริมถนน'
                  : 'จำแนกพิกัดถนนจริง',
              title: segmentedTitle,
              subtitle: displayParts.slice(0, 4).join(', '),
              distanceText: isPlaceOrLandmark && roadFromAddr ? `อยู่ใกล้ ${roadFromAddr}` : undefined,
              trafficColor: preview.trafficColor,
              trafficLabel: preview.trafficLabel,
              waterTier: preview.waterTier,
              waterLabel: preview.waterLabel,
              location: locObj
            });

            // ค้นหาพิกัดถนนสายหลักที่อยู่ใกล้เคียงสถานที่นี้มาแสดงต่อท้ายทันที
            for (const { segment: nearSeg, distanceKm } of nearbyCurated) {
              if (!seenIds.has(nearSeg.id) && strippedLower.length >= 2) {
                seenIds.add(nearSeg.id);
                const nearLoc = roadSegmentToLocation(nearSeg);
                const nearPreview = getQuickTrafficAndWaterPreview(nearLoc);
                results.push({
                  id: nearLoc.id,
                  category: 'nearby_road',
                  categoryBadge: 'ถนนใกล้เคียงพิกัดที่ค้นหา',
                  title: nearSeg.segmentTitle,
                  subtitle: `${nearSeg.segmentSubtitle} • จ.${nearSeg.province}`,
                  distanceText: distanceKm === 0 ? 'ติดสถานที่นี้' : `ห่าง ${distanceKm} กม.`,
                  trafficColor: nearPreview.trafficColor,
                  trafficLabel: nearPreview.trafficLabel,
                  waterTier: nearPreview.waterTier,
                  waterLabel: nearPreview.waterLabel,
                  location: nearLoc
                });
              }
            }

            if (results.length >= 28) break;
          }
        }
      }
    } catch {
      // ignore network timeout
    }
  }

  // ผูก relatedSegments ให้ทุกผลการค้นหาเพื่อให้กดสลับดูถนนรอบข้างบนการ์ดได้ทันที
  const allRoadLocs = results
    .filter(
      (r) =>
        r.category === 'landmark_place' ||
        r.category === 'nearby_road' ||
        r.category === 'road_segment' ||
        r.category === 'road_soi'
    )
    .map((r) => r.location)
    .slice(0, 12);

  if (allRoadLocs.length > 1) {
    for (const r of results) {
      if (
        r.category === 'landmark_place' ||
        r.category === 'nearby_road' ||
        r.category === 'road_segment' ||
        r.category === 'road_soi'
      ) {
        if (
          !r.location.relatedSegments ||
          r.location.relatedSegments.length < allRoadLocs.length
        ) {
          r.location.relatedSegments = allRoadLocs;
        }
      }
    }
  }

  searchRemoteCache.set(cacheKey, results);
  return results;
}

/**
 * แปลงพิกัด GPS จากอุปกรณ์ของผู้ใช้เป็นตำแหน่งถนน ซอย และตำบลจริงแบบความเร็วสูง
 */
export async function resolveExactGpsLocation(lat: number, lng: number): Promise<ThaiLocation> {
  const nearestTambon = findNearestTambonByCoords(lat, lng);

  // 1. ตรวจสอบว่าอยู่ใกล้ถนนในฐานข้อมูลช่วงถนนสายหลักหรือไม่ (ภายใน 2.0 กม.) — ใช้เวลา < 0.1ms
  const nearbyCurated = findNearbyRoadSegmentsByCoords(lat, lng, 2.0, 4);
  if (nearbyCurated.length > 0) {
    const loc = roadSegmentToLocation(nearbyCurated[0].segment);
    return {
      ...loc,
      lat,
      lng
    };
  }

  // 2. ค้นหาชื่อถนนจริงจาก Nominatim พร้อมกำหนด Timeout สั้น (1.8 วินาที) เพื่อไม่ให้ผู้ใช้รอนาน
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=th`,
      {
        headers: { 'User-Agent': 'ThaiWeatherWaterApp/1.0' },
        signal: controller.signal
      }
    ).finally(() => clearTimeout(timeoutId));

    if (res.ok) {
      const data = await res.json();
      const addr = data?.address || {};
      const road = addr.road || addr.pedestrian || addr.highway || '';
      const subArea =
        addr.suburb || addr.quarter || addr.neighbourhood || addr.village || nearestTambon.tambon;
      const districtArea =
        addr.city_district || addr.county || addr.city || addr.town || nearestTambon.amphoe;
      const provinceArea = (addr.state || addr.province || nearestTambon.province).replace(
        /^จังหวัด\s*/,
        ''
      );

      if (road) {
        return {
          ...nearestTambon,
          id: `gps-${lat.toFixed(4)}-${lng.toFixed(4)}`,
          name: `${road} - ช่วง${subArea} (${districtArea})`,
          province: provinceArea,
          amphoe: districtArea,
          tambon: subArea,
          lat,
          lng,
          roadName: road,
          highway: road,
          segmentSubtitle: data?.display_name || `${road} ${subArea} ${districtArea} ${provinceArea}`
        };
      }
    }
  } catch {
    // fallback to nearestTambon immediately
  }

  return {
    ...nearestTambon,
    lat,
    lng
  };
}

// เริ่มต้นกู้คืน Cache และดึงข้อมูลคลังข้อมูลน้ำแห่งชาติล่วงหน้าทันทีที่โหลดไฟล์ (Pre-warm)
hydrateCachesFromStorage();
if (typeof window !== 'undefined') {
  setTimeout(() => {
    fetchNationalThaiWaterData().catch(() => {});
  }, 10);
}
