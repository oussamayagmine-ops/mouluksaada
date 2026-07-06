export type MenuItem = { name: string; price: string; image?: string }
export type MenuCategory = { id: string; label: string; items: MenuItem[] }

export const MENU: MenuCategory[] = [
  {
    id: 'food',
    label: 'الأكلات المصرية',
    items: [
      { name: 'كشري مصري صغير', price: '15', image: '/images/dish-koshari.png' },
      { name: 'كشري مصري كبير', price: '20', image: '/images/dish-koshari.png' },
      { name: 'كشري شاورما', price: '20' },
      { name: 'كشري كبدة إسكندراني', price: '25' },
      { name: 'ساندويتش كبدة إسكندراني', price: '25' },
      { name: 'ساندويتش فلافل (طعمية)', price: '10' },
      { name: 'ساندويتش شاورما دجاج', price: '20', image: '/images/dish-shawarma.png' },
      { name: 'ساندويتش شاورما دجاج + فريت', price: '25' },
      { name: 'فتة شاورما دجاج + فريت', price: '30' },
      { name: 'طاكوس رويال', price: '35' },
      { name: 'باستيشيو', price: '40' },
      { name: 'طبق فريت', price: '05' },
      { name: 'طبق فلافل', price: '10' },
      { name: 'طبق شاورما مصري', price: '40', image: '/images/dish-shawarma.png' },
      { name: 'طبق ميكس ملوك السعادة', price: '50', image: '/images/dish-mix.png' },
    ],
  },
  {
    id: 'desserts',
    label: 'الحلويات',
    items: [
      { name: 'مهلبية', price: '10' },
      { name: 'مهلبية بالكراميل', price: '10' },
      { name: 'مهلبية بالبيستاش', price: '10' },
      { name: 'أرز بالحليب', price: '10' },
      { name: 'مدلعة كراميل', price: '13' },
      { name: 'هرفوشة بالنوتيلا', price: '13' },
      { name: 'هرمونات السعادة', price: '13' },
      { name: 'الرومانسية لوتس', price: '13' },
    ],
  },
  {
    id: 'drinks',
    label: 'المشروبات',
    items: [
      { name: 'قارورة ماء صغيرة', price: '2' },
      { name: 'قارورة ماء متوسطة', price: '4' },
      { name: 'قارورة ماء كبيرة', price: '8' },
      { name: 'مونادا فانتا', price: '4' },
      { name: 'مونادا كوكا كولا', price: '4' },
      { name: 'مونادا ستار', price: '5' },
    ],
  },
]
