import React, { useState, useEffect } from 'react';
import { FiCpu, FiCopy, FiCheck } from 'react-icons/fi';
import './App.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ★ 1. 各アイテムの型を定義
interface Item {
  id: string;
  title: string;
  description: string;
  value: string;
  placeholder: string;
  isEnabled: boolean;
  layout: 'full' | 'auto';
  type?: 'number' | 'toggle-only' | 'text';
}

const initialItems: Item[] = [
  {
    id: 'subject',
    title: '【主題】Subject',
    description: '描きたいものの中心となる要素を入力します。',
    value: '',
    placeholder: '例: a beautiful princess, a robot cat',
    isEnabled: true,
    layout: 'full',
  },
  {
    id: 'style',
    title: '【画風】Style',
    description: '画像全体のスタイルや画家の名前などを指定します。',
    value: '',
    placeholder: '例: by Studio Ghibli, watercolor painting',
    isEnabled: true,
    layout: 'full',
  },
  {
    id: 'context',
    title: '【補足】Context & Details',
    description: '背景、光、色、構図などの詳細情報を追加します。',
    value: '',
    placeholder: '例: in a sun-drenched meadow, cinematic lighting',
    isEnabled: true,
    layout: 'full',
  },
  {
    id: 'aspect',
    title: '--ar (アスペクト比)',
    description: '画像の縦横比',
    value: '',
    placeholder: '16:9',
    isEnabled: false,
    layout: 'auto',
  },
  {
    id: 'version',
    title: '--v (バージョン)',
    description: 'Midjourneyのバージョン',
    value: '',
    placeholder: '7',
    isEnabled: false,
    layout: 'auto',
  },
  {
    id: 'stylize',
    title: '--s (様式化)',
    description: 'AIの芸術性 (0-1000)',
    value: '',
    placeholder: '100',
    isEnabled: false,
    layout: 'auto',
    type: 'number',
  },
  {
    id: 'styleRaw',
    title: '--style raw',
    description: 'AIの味付けを抑制',
    isEnabled: false,
    layout: 'auto',
    type: 'toggle-only',
    value: '',
    placeholder: ''
  },
  {
    id: 'no',
    title: '--no (ネガティブプロンプト)',
    description: '画像に含めてほしくない要素を指定します。',
    value: '',
    placeholder: '例: people, text, watermark',
    isEnabled: false,
    layout: 'full',
  },
  {
    id: 'cref',
    title: '--cref (キャラクター参照)',
    description: '指定URLの画像の「キャラクター」に似せます。',
    value: '',
    placeholder: '画像のURLを貼り付け',
    isEnabled: false,
    layout: 'full',
  },
  {
    id: 'sref',
    title: '--sref (スタイル参照)',
    description: '指定URLの画像の「画風」に似せます。',
    value: '',
    placeholder: '画像のURLを貼り付け',
    isEnabled: false,
    layout: 'full',
  },
];


function App() {
  // ★ 2. Stateに型を適用
  const [items, setItems] = useState<Item[]>(initialItems);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showScrollButtons, setShowScrollButtons] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButtons && window.pageYOffset > 300) {
        setShowScrollButtons(true);
      } else if (showScrollButtons && window.pageYOffset <= 300) {
        setShowScrollButtons(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollButtons]);

  useEffect(() => {
    const parts: string[] = [];
    items.forEach(item => {
      if (!item.isEnabled) return;
      if (item.type === 'toggle-only') {
        parts.push(`--style raw`);
        return;
      }
      if (item.value) {
        switch (item.id) {
          case 'aspect': parts.push(`--ar ${item.value}`); break;
          case 'version': parts.push(`--v ${item.value}`); break;
          case 'stylize': parts.push(`--s ${item.value}`); break;
          case 'no': case 'cref': case 'sref': parts.push(`--${item.id} ${item.value}`); break;
          default: parts.push(item.value); break;
        }
      }
    });
    setGeneratedPrompt(parts.join(', '));
  }, [items]);

  // ★ 3. 関数の引数に型を適用
  const handleValueChange = (id: string, newValue: string): void => {
    setItems(currentItems => currentItems.map(item =>
      item.id === id ? { ...item, value: newValue } : item
    ));
  };

  const handleToggle = (id: string): void => {
    setItems(currentItems => currentItems.map(item =>
      item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
    ));
  };

  const copyToClipboard = (): void => {
    if (isCopied || !generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => console.error('Copy failed', err));
  };

  const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = (): void => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <div className="container">
      <header>
        <div className="title-wrapper">
          <FiCpu size={32} />
          <h1>Midjourney Prompt Helper</h1>
        </div>
        <p>各項目を編集して、オリジナルのプロンプトを作成しましょう。</p>
      </header>

      <div className="prompt-builder">
        {items.map((item) => (
          <div key={item.id} className={`prompt-item-wrapper layout-${item.layout} ${!item.isEnabled ? 'disabled' : ''}`}>
            <div className="item-content">
              <div className="item-title">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <h3>{item.title}</h3>
                  <div className="item-controls">
                    <label className="switch">
                      <input type="checkbox" checked={item.isEnabled} onChange={() => handleToggle(item.id)} />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                <p>{item.description}</p>
              </div>
              {item.type !== 'toggle-only' && (
                <input
                  type={item.type || 'text'}
                  // ★ 4. イベントハンドラのイベントオブジェクトに型を適用
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(item.id, e.target.value)}
                  value={item.value}
                  disabled={!item.isEnabled}
                  placeholder={item.placeholder}
                  className="item-input"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="output-area">
        <h2>生成されたプロンプト</h2>
        <div className="output-wrapper">
          <textarea
            value={generatedPrompt}
            readOnly
            rows={5}
            placeholder="ここにプロンプトが生成されます..."
          />
          <button
            onClick={copyToClipboard}
            className={`copy-button-icon ${isCopied ? 'copied' : ''}`}
            disabled={!generatedPrompt || isCopied}
            title="プロンプトをコピー"
          >
            {isCopied ? <FiCheck /> : <FiCopy />}
          </button>
        </div>
      </div>

      {showScrollButtons && (
        <div className="scroll-buttons-container">
          <button onClick={scrollToTop} title="一番上へ"><KeyboardArrowUpIcon /></button>
          <button onClick={scrollToBottom} title="一番下へ"><KeyboardArrowDownIcon /></button>
        </div>
      )}
    </div>
  );
}

export default App;