import AuthStore from './authStore';

export default function initializeStores() {
    return {
      authStore:new AuthStore()
    }
  }
  