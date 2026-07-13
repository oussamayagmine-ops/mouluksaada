export const WHATSAPP_NUMBER = '212771206131'
export const WHATSAPP_MESSAGE = 'السلام عليكم، أريد طلب من مطعم ملوك السعادة المصري'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'المنيو', href: '#menu' },
]
