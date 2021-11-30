import CategoryModel from '@/models/CategoryModel';
import StructureModel from '@/models/StructureModel';
import { BACKEND_URL } from '@/settings';
import { reactive, computed } from 'vue'

interface ForumConfigState {
  forumConfigReady: boolean;
  title: string;
  structure: StructureModel;
  categories: {[id: number]: CategoryModel}
}

const forumConfigState: ForumConfigState = reactive({
  forumConfigReady: false,
  title: "",
  structure: new StructureModel(),
  categories: {}
})

let fetching = false;

function fetchForumConfig() {
  if(fetching) return;
  fetching = true;
  fetch(BACKEND_URL + "/assets/config.json").then(data => data.json()).then(data => {
    forumConfigState.title = data.title;
    forumConfigState.structure = data.structure;
    forumConfigState.forumConfigReady = true;
    let categories = {};
    for(const section of forumConfigState.structure.sections) {
      for(const category of section.categories) {
        categories[category.id] = category;
      }
    }
    forumConfigState.categories = categories;
  });
}

const category = id => computed(() => {
  if (!forumConfigState.forumConfigReady) {
    fetchForumConfig();
    return {}
  } else {
    return forumConfigState.categories[id];
  }
});

const structure = computed(() => {
  if (!forumConfigState.forumConfigReady) {
    fetchForumConfig();
    return []
  } else {
    return forumConfigState.structure;
  }
});

const title = computed(() => {
  if (!forumConfigState.forumConfigReady) {
    fetchForumConfig();
    return "";
  } else {
    return forumConfigState.title;
  }
});

export function useForumConfig() {
  return {
    title,
    structure,
    category: category
  };
};
