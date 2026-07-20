// Homepage imagery delivered under src/public/homepage and served at "/homepage".
// The delivered folder/file names contain spaces, so paths run through encodeURI.
const B = '/homepage';
const u = (p: string) => encodeURI(p);

export const homeAssets = {
  /** Pink radial glow (transparent PNG) behind the hero. */
  heroGlow: u(`${B}/Website_Background.png`),
  /** トクパック circular logo — Creator Sourcing Day badge. */
  csdBadge: u(`${B}/01_Creator Sourcing Day/Untitled (3040 x 1000 px) (18).png`),
  /** "トク(得) / パック(Pack)" annotated logo graphic for About. */
  aboutLogo: u(`${B}/02_About The Event/Tokupaku.png`),
  /** B&W editorial portrait (woman with a TokuPack bag). */
  creatorPhoto: u(`${B}/02_About The Event/Woman.png`),
  /** Wide lab/serum banner for the booking section. */
  bookingBanner: u(`${B}/04_Booking/Survey.png`),
  /** Access map to the venue. */
  locationMap: u(`${B}/05_Location/Untitled (3040 x 1000 px) (1).png`),
  /** Venue interior photo. */
  venuePhoto: u(`${B}/03_Participating Brands_Asset/Venue.png`),
  /** LINE QR code. */
  lineQr: u(`${B}/06_LINE/M_888llqop_GW.png`),
};

/** Brand intro/animation videos. In production, set VITE_VIDEO_BASE_URL to the cloud bucket
 *  public URL (e.g. https://pub-xxx.r2.dev/vids). Falls back to /vids for local dev. */
const V = (import.meta.env.VITE_VIDEO_BASE_URL ?? '/vids').replace(/\/$/, '');
export const brandVideos: Record<string, string> = {
  torhop: u(`${V}/Torhop Brand Animation_3456-1920_jp (2).mp4`),
  'purito-seoul': u(`${V}/Purito_0317_오트3종.mov`),
  'vt-cosmetics': u(`${V}/VT Cosmetics_웹사이트용 브랜드 소개 영상.mp4`),
  beplain: u(`${V}/Beplain_260714_일본 틱톡샵 _브랜드 소개 영상.mp4`),
  lubylab: u(`${V}/LubyLab.mp4`),
  dailyweekly: u(`${V}/Daily Weekly 최종본.mp4`),
  babaco: u(`${V}/Babaco_브랜드 광고 홍보영상(1280x840).mp4`),
};

/** Brand product shots keyed by the API brand slug. */
export const brandImages: Record<string, string> = {
  'purito-seoul': u(`${B}/03_Participating Brands_Asset/Purito.png`),
  'vt-cosmetics': u(`${B}/03_Participating Brands_Asset/VT.png`),
  beplain: u(`${B}/03_Participating Brands_Asset/Beplain.png`),
  'dr-deep': u(`${B}/03_Participating Brands_Asset/Dr.Deep.png`),
  lubylab: u(`${B}/03_Participating Brands_Asset/LUBYLAB.png`),
  dailyweekly: u(`${B}/03_Participating Brands_Asset/DW.png`),
  torhop: u(`${B}/03_Participating Brands_Asset/Torhop.png`),
  babaco: u(`${B}/03_Participating Brands_Asset/Babaco.png`),
  quadthera: u(`${B}/03_Participating Brands_Asset/Quadthera.png`),
  atike: u(`${B}/03_Participating Brands_Asset/atike.png`),
  zipiel: u(`${B}/03_Participating Brands_Asset/zipiel.png`),
};
