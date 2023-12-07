import { ProductType } from '@/src/types/Product';

type ViewsItem = Record<ProductType, Record<string, boolean>>;

const defaultViewsItem: ViewsItem = {
  'houses-and-lots': {},
  commercial: {},
  flats: {},
};

const PAGE_VIEWS_KEY = 'pageViews';
const CONTACT_VIEWS_KEY = 'contactViews';

export const handlePageViews = async (type: ProductType, id: string) => {
  const storedItem = localStorage.getItem(PAGE_VIEWS_KEY);

  const parsedItem = storedItem ? (JSON.parse(storedItem) as ViewsItem) : defaultViewsItem;

  if (!parsedItem[type][id]) {
    const updatedItem: ViewsItem = { ...parsedItem, [type]: { ...parsedItem[type], [id]: true } };

    await fetch('/api/views', {
      method: 'POST',
      body: JSON.stringify({
        type,
        id,
        updateType: 'product',
      }),
    });

    localStorage.setItem(PAGE_VIEWS_KEY, JSON.stringify(updatedItem));
  }
};

export const handleContactsViews = async (type: ProductType, id: string) => {
  const storedItem = localStorage.getItem(CONTACT_VIEWS_KEY);

  const parsedItem = storedItem ? (JSON.parse(storedItem) as ViewsItem) : defaultViewsItem;

  if (!parsedItem[type][id]) {
    const updatedItem: ViewsItem = { ...parsedItem, [type]: { ...parsedItem[type], [id]: true } };

    await fetch('/api/views', {
      method: 'POST',
      body: JSON.stringify({
        type,
        id,
        updateType: 'contacts',
      }),
    });

    localStorage.setItem(CONTACT_VIEWS_KEY, JSON.stringify(updatedItem));
  }
};
