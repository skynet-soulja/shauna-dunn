export const useCategory = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const cookie = useCookie('category', { expires: tomorrow });

  cookie.value = cookie.value || 'All';

  return useState('category', () => cookie.value);
}

export const updateCategory = (newCategory: string) => {
  const cookie = useCookie('category');
  const category = useCategory();

  cookie.value = newCategory;
  category.value = cookie.value;
}
