import { apiFetch } from '../apiClient';

export async function uploadFile(
  _bucket: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> {
  try {
    const url = await uploadImage(file);
    return { url, error: null };
  } catch (error: any) {
    return { url: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result as string;
        const result = await apiFetch<{ url: string }>('/upload', {
          method: 'POST',
          body: JSON.stringify({ imageBase64: base64Data, filename: file.name }),
        });
        resolve(result.url || base64Data);
      } catch (error) {
        // Stop silently falling back to base64 so we can see the real error in the UI
        console.error('Image upload API failed:', error);
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
