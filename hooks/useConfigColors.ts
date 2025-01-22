import { useMemo } from 'react';
import config from '@/config';

// Fonction pour convertir un hex en RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Fonction pour convertir RGB en hex
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

// Fonction pour ajuster la luminosité
const adjustBrightness = (hex: string, factor: number) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const newRgb = {
    r: Math.min(255, rgb.r * factor),
    g: Math.min(255, rgb.g * factor),
    b: Math.min(255, rgb.b * factor)
  };

  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

export const useConfigColors = () => {
  const colors = useMemo(() => {
    const { main, accent } = config.colors;

    return {
      // Couleurs principales
      main,
      mainPale: adjustBrightness(main, 1.4),
      mainLight: adjustBrightness(main, 1.2),
      mainDark: adjustBrightness(main, 0.8),
      mainDarker: adjustBrightness(main, 0.6),

      // Couleurs d'accent
      accent,
      accentPale: adjustBrightness(accent, 1.4),
      accentLight: adjustBrightness(accent, 1.2),
      accentDark: adjustBrightness(accent, 0.8),
      accentDarker: adjustBrightness(accent, 0.6),

      // Opacités pour la couleur principale
      mainOpacity10: `${main}1A`,
      mainOpacity20: `${main}33`,
      mainOpacity40: `${main}66`,
      mainOpacity60: `${main}99`,
      mainOpacity80: `${main}CC`,

      // Opacités pour la couleur d'accent
      accentOpacity10: `${accent}1A`,
      accentOpacity20: `${accent}33`,
      accentOpacity40: `${accent}66`,
      accentOpacity60: `${accent}99`,
      accentOpacity80: `${accent}CC`,
    };
  }, []);

  return colors;
};

export type ConfigColors = ReturnType<typeof useConfigColors>; 