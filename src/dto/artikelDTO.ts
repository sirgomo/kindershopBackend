export class ArtikelDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly brand: string;
    readonly model: string;
    readonly sku: string;
    readonly ean: string;
    readonly availability: string;
    readonly weight: number;
    readonly dimensions: string;
    readonly images: string;
    readonly relatedProducts: string;
    readonly reviews: string;
    readonly rating: number;
    readonly categories: number[];
}
