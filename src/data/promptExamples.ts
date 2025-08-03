export interface ExampleItem {
  prompt: string;
  description: string;
}

// Styleの例
export const styleExamples: ExampleItem[] = [
  { prompt: 'realism', description: 'リアリティのある' },
  { prompt: 'ultra-realistic photograph', description: 'リアルな写真のような' },
  { prompt: 'HD quality', description: 'HD画質感' },
  { prompt: 'polaroid photograph', description: 'レトロ風' },
  { prompt: 'vintage photograph', description: 'ヴィンテージ風' },
  { prompt: 'pencil sketch', description: '鉛筆画風' },
  { prompt: 'chalk drawing', description: 'チョーク画風' },
  { prompt: 'oil painting', description: '油絵風' },
  { prompt: 'watercolor painting', description: '水彩画風' },
  { prompt: 'gothic', description: 'ゴシック風' },
  { prompt: 'pop art', description: 'ポップアート風' },
  { prompt: 'abstract', description: '抽象画風' },
  { prompt: 'ukiyo-e art', description: '浮世絵風' },
  { prompt: 'graffiti', description: '落書き風' },
  { prompt: 'anime portrait', description: 'アニメポートレート風' },
  { prompt: 'cubism', description: 'キュビズム風' },
  { prompt: 'rococo', description: 'ロココ調' },
  { prompt: 'paper art', description: 'ペーパーアート風' },
  { prompt: 'cyberpunk', description: 'サイバーパンク風' },
  { prompt: 'typography art', description: 'タイポグラフィックアート風' },
  { prompt: 'op art', description: 'オプアート風' },
  { prompt: 'kawaii', description: 'かわいい系' },
  { prompt: 'stained glass window', description: 'ステンドグラス風' },
  { prompt: 'kaleidoscopic', description: '万華鏡のような' },
];

// Context & Details の例 (構図・アングル)
export const contextCompositionExamples: ExampleItem[] = [
  { prompt: 'the whole body', description: '引きで全身を写した画像' },
  { prompt: 'close up', description: '寄りの画像' },
  { prompt: 'from above', description: '上からの画像' },
  { prompt: 'from below', description: '下からの画像' },
  { prompt: 'back view', description: '後ろからの画像' },
  { prompt: 'side view', description: '横からの画像、横顔' },
  { prompt: 'wide shot', description: '広角' },
  { prompt: 'panorama', description: 'パノラマ' },
  { prompt: 'long shot', description: '遠景' },
  { prompt: 'fisheye lens', description: '魚眼レンズ' },
  { prompt: '24mm lens', description: '広角レンズ' },
];

// Context & Details の例 (色調)
export const contextColorExamples: ExampleItem[] = [
  { prompt: 'vivid color', description: '鮮やかな色' },
  { prompt: 'neon color', description: '蛍光色調' },
  { prompt: 'Iridescent', description: '虹色の' },
  { prompt: 'dark', description: '濃い色' },
  { prompt: 'light', description: '薄い色' },
  { prompt: 'transparent', description: '透明' },
];

// Context & Details の例 (照明)
export const contextLightingExamples: ExampleItem[] = [
  { prompt: 'sun light', description: '太陽光' },
  { prompt: 'moon light', description: '月光' },
  { prompt: 'strong light', description: '強い光' },
  { prompt: 'backlighting', description: '逆光' },
  { prompt: 'spotlight', description: 'スポットライト' },
  { prompt: 'stage lights', description: 'ステージライト' },
  { prompt: 'f/2.8', description: 'レンズの明るさ' },
];