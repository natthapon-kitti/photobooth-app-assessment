export interface ImageValidationResult {
    isValid: boolean
    error?: string
    compressedImage?: string
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_DIMENSION = 4096 // 4K resolution
export const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"]

export function validateImage(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return { isValid: false, error: "Image size must be less than 10MB" }
    }

    // Check file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
        return { isValid: false, error: "Only JPEG, PNG, and WebP images are supported" }
    }

    return { isValid: true }
}

export function compressImage(imageUrl: string, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.crossOrigin = "anonymous"
        img.onload = () => {
            try {
                // Calculate new dimensions
                let { width, height } = img

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height)
                    width *= ratio
                    height *= ratio
                }

                canvas.width = width
                canvas.height = height

                if (!ctx) {
                    reject(new Error("Could not get canvas context"))
                    return
                }

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height)
                const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)
                resolve(compressedDataUrl)
            } catch (error) {
                reject(error)
            }
        }

        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = imageUrl
    })
}

export function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, "") // Remove potential HTML tags
        .substring(0, 500) // Limit length
}

export function generateThumbnail(imageUrl: string): Promise<string> {
    return compressImage(imageUrl, 300, 300, 0.7)
}

export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}
