import StructureModel from '@/models/StructureModel';
import { BACKEND_URL } from '@/settings';
import { reactive, computed } from 'vue'

interface ForumMetaState {
  forumMetaReady: boolean;
  title: string;
  structure: StructureModel;
}

const forumMetaState: ForumMetaState = reactive({
  forumMetaReady: false,
  title: "",
  structure: new StructureModel()
})

function fetchForumMeta() {
  fetch(BACKEND_URL + "/assets/forum.json").then(data => data.json()).then(data => {
    forumMetaState.title = data.title;
    forumMetaState.structure = data.structure;
    forumMetaState.forumMetaReady = true;
  });
}

const structure = computed(() => {
  if (!forumMetaState.forumMetaReady) {
    fetchForumMeta();
    return []
  } else {
    return forumMetaState.structure;
  }
});

const title = computed(() => {
  if (!forumMetaState.forumMetaReady) {
    fetchForumMeta();
    return "";
  } else {
    return forumMetaState.title;
  }
});

export function useForumMeta() {
  return {
    title,
    structure
  };
};
