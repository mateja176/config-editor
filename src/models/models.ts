export interface LocalStorageItem<A> {
  item: A | null;
  setItem: (item: A) => void;
  removeItem: () => void;
}
