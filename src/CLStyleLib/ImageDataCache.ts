import { CharIcon, SkipChunk, PixelChunk } from "./CharIcon";
import { Palette } from "./Palette";

export class ImageDataCache {
    private readonly cache: Map<CharIcon, Map<string, WeakRef<ImageData>>> = new Map();
  
    private cacheForIcon(icon: CharIcon): Map<string, WeakRef<ImageData>> {
      let result = this.cache.get(icon);
  
      if (result !== undefined) { return result };
  
      result = new Map();
  
      this.cache.set(icon, result);
  
      return result;
    }
  
    getImageData(icon: CharIcon, palette: Uint8ClampedArray): ImageData {
        let cache = this.cacheForIcon(icon);
  
        const key = palette.toString();

        let result = cache.get(key)?.deref();
  
        if (result) { return result; }
        
        result = this.buildImageData(icon, palette);
  
        cache.set(key, new WeakRef(result));
  
        return result;
    }
  
    private buildImageData(icon: CharIcon, palette: Uint8ClampedArray): ImageData {
      let pixelBuffer = new ArrayBuffer(4 * icon.cellWidth * 16 * (icon.cellHeight * 3 + 1))
      let pixelView = new Uint32Array(pixelBuffer);
  
      let pixelIndex = 0;
      for (const chunk of icon.pixelData) {
        if (isSkipChunk(chunk)) {
          pixelIndex += chunk.skip;
        } else {
          const binaryString = chunk.binaryData ?? (chunk.binaryData = window.atob(chunk.data));

          for (let i = 0; i < binaryString.length; i++) {
            let paletteIndex = binaryString.charCodeAt(i);
            let colorIndex = palette[paletteIndex];
            pixelView[pixelIndex] = Palette.classicMacColorsAsInt32[colorIndex];
            pixelIndex++;
          }
        }
      }
  
      return new ImageData(new Uint8ClampedArray(pixelBuffer), icon.cellWidth * 16, icon.cellHeight * 3 + 1);
    }
  }

function isSkipChunk(chunk: PixelChunk): chunk is SkipChunk {
  return !!(chunk as SkipChunk).skip;
}