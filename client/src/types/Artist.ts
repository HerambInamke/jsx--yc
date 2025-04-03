export interface Artist {
  id: string
  name: string
  image: string
  colorDot: 'red' | 'blue' | 'yellow'
  isFavorite?: boolean
}