import React, { useState } from 'react';
import './APIForm.css';

interface APIFormProps {
  model: string;
  setModel: (model: string) => void;
}

const APISelector: React.FC<APIFormProps> = ({ model, setModel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newModel: string) => {
    setModel(newModel);
    setIsOpen(false);
  };

  const getIcon = (modelName: string) => {
    switch (modelName) {
      case 'gpt-4-1106-preview':
        return <div>✨</div>; // Placeholder icon for gpt-4-1106-preview
      case 'gpt-4-vision-preview':
        return <div>🪸</div>; // Placeholder icon for gpt-4-vision-preview
      case 'gpt-4':
        return <div>✍️</div>; // Placeholder icon for gpt-4
      case 'gpt-4-32k':
        return <div></div>; // Placeholder icon for gpt-4-32k
      case 'gpt-3.5-turbo':
        return <div>⚡</div>; // Icon for gpt-3.5-turbo
      default:
        return <div>❓</div>; // Default icon for unknown model
    }
  };

  return (
    <div className="api-selector-container">
      <button type="button" onClick={handleClick} className="model-select">
        <div>{getIcon(model)}</div>
        <span className="model-name">{model}</span>
        <span className="model-select-arrow">
          {/* SVG icon for arrow */}
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-token-text-tertiary">
            <path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </button>
      {isOpen && (
        <div role="menu" aria-orientation="vertical" className="dropdown-menu">
          <div role="menuitem" className="dropdown-item" onClick={() => handleSelect('gpt-3.5-turbo')}>
            <span className="model-name">Varsayılan: gpt-3.5-turbo</span>
            <div className="menuitem-description">
              Geliştirilmiş performans ve doğruluk için tasarlanmış GPT-3.5'in son sürümü. Maksimum 1.024 çıktı belirteci döndürür.
            </div>
          </div>
          <div className="dropdown-separator"></div> {/* Separator line */}
          <div role="menuitem" className="dropdown-item" onClick={() => handleSelect('gpt-4-1106-preview')}>
            gpt-4-1106-preview
            <div className="menuitem-description">
              Geliştirilmiş komut takibi, JSON modu, tekrarlanabilir çıktılar, paralel fonksiyon çağırma ve daha fazlasına sahip en yeni GPT-4 modeli. Maksimum 4.096 çıktı belirteci döndürür.
            </div>
          </div>
          <div className="dropdown-separator"></div> {/* Separator line */}
          <div role="menuitem" className="dropdown-item" onClick={() => handleSelect('gpt-4-vision-preview')}>
            gpt-4-vision-preview
            <div className="menuitem-description">
              Diğer tüm GPT-4 Turbo özelliklerine ek olarak görüntüleri anlama yeteneği. Maksimum 4.096 çıktı belirteci döndürür.
            </div>
          </div>
          <div className="dropdown-separator"></div> {/* Separator line */}
          <div role="menuitem" className="dropdown-item" onClick={() => handleSelect('gpt-4')}>
            gpt-4
            <div className="menuitem-description">
              Mevcut gpt-4-0613'e işaret etmektedir. Karmaşık problem çözme için gelişmiş yetenekler.
            </div>
          </div>
          <div className="dropdown-separator"></div> {/* Separator line */}
          <div role="menuitem" className="dropdown-item" onClick={() => handleSelect('gpt-4-32k')}>
            gpt-4-32k
            <div className="menuitem-description">
              Daha kapsamlı etkileşimler için ideal olan 32.768 jetona kadar genişletilmiş bağlam penceresi.
            </div>
          </div>
          {/* Diğer modeller için seçenekler ekleyin */}
        </div>
      )}
    </div>
  );
};

export default APISelector;
