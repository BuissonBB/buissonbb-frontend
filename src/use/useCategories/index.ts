import { reactive, computed } from 'vue'

import app from '@/feathers-client'

const categories = computed(() => {
    return [{
        title: 'Minecraft'
    }];
});

export function useCategories () {
  return {
    categories
  };
};
