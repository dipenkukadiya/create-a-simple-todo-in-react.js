// indexedDB.js
const DB_NAME = 'todoDB';
const TODO_STORE = 'todos';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(TODO_STORE)) {
        db.createObjectStore(TODO_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const addTodo = (todo) => {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([TODO_STORE], 'readwrite');
    const store = transaction.objectStore(TODO_STORE);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject(event.target.error);
    };

    store.add(todo);
  });
};

const getAllTodos = () => {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([TODO_STORE], 'readonly');
    const store = transaction.objectStore(TODO_STORE);

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Implement similar functions for updating and deleting todos

export { addTodo, getAllTodos };
