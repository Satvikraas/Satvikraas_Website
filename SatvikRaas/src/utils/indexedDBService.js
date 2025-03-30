const DB_NAME = "ProductDB";
const STORE_NAME = "products";
const DB_VERSION = 1;

// ✅ Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "productId" }); // ✅ Use productId as key
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("❌ IndexedDB error");
  });
};

// ✅ Save products to IndexedDB
export const saveProductsToDB = async (products) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    products.forEach((product) => store.put(product));

    console.log("📝 Saving products to IndexedDB...");
    return tx.complete;
  } catch (error) {
    console.error("❌ Error saving to IndexedDB:", error);
  }
};

// ✅ Get products from IndexedDB
export const getProductsFromDB = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve([]);
    });
  } catch (error) {
    console.error("❌ Error fetching from IndexedDB:", error);
    return [];
  }
};
