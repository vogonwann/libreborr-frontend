export interface BookResult {
    kind: string
    totalItems: number
    items: Item[]
  }
  
  export interface Item {
    kind: string
    id: string
    etag: string
    selfLink: string
    volumeInfo: VolumeInfo
    saleInfo: SaleInfo
    accessInfo: AccessInfo
  }
  
  export interface VolumeInfo {
    authors: string[]
    title: string
    subtitle?: string
    description?: string
    imageLinks?: ImageLinks
    publishedDate: string
    industryIdentifiers?: IndustryIdentifier[]
    readingModes: ReadingModes
    printType: string
    categories?: string[]
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary?: PanelizationSummary
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
    added?: boolean
  }

  export interface ImageLinks {
    smallThumbnail: string
    thumbnail: string
  }
  
  export interface IndustryIdentifier {
    type: string
    identifier: string
  }
  
  export interface ReadingModes {
    text: boolean
    image: boolean
  }
  
  export interface PanelizationSummary {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
  }
  
  export interface SaleInfo {
    country: string
    saleability: string
    isEbook: boolean
  }
  
  export interface AccessInfo {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string
    epub: Epub
    pdf: Pdf
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
  }
  
  export interface Epub {
    isAvailable: boolean
  }
  
  export interface Pdf {
    isAvailable: boolean
  }
  