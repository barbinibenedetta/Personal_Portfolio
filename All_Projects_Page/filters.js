import { projects } from "../Projects/projects.js";

const select = document.getElementById('language');

export const languageFilter = () => {
  if (select.value === 'all') {
    return projects
  }

  const filteredArr = projects.filter(project => project.tag.some(tag => tag === select.value));

  // only the projects that have the tag specified in the select 
  // element are added to the filtered array
  return filteredArr;
}