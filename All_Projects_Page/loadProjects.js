import { projects } from "../Projects/projects.js";
import { languageFilter } from "./filters.js";

const projectContainer = document.getElementById('project-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const select = document.getElementById('language');

let currentProjectId;
let currentArray = [...projects];

// since the projects start with id = 1, position in the array is
// one less. In fact later we use projects.length as an argument.
const loadProjects = (num, arr) => {
  for (let i = num - 1; i >= num - 3; i--) {
    let projectName = arr[i].name.replaceAll('_', ' ');
    let imgSrc = `./../Projects/${arr[i].name}/${arr[i].name}_screen.PNG`;

    projectContainer.innerHTML += `
      <div id="row-div" class="row">
        <div class="col image-container">
          <img src="${imgSrc}" alt="${projectName} Preview">
        </div>
        <div class="col-6 description-container d-none d-md-block">
          <h3>${projectName}</h3>
          <p>${arr[i].description}</p>
        </div>
        <div class="col tags-container"></div>
      </div>
      <hr>
    `;

    currentProjectId = i;
  }
}

// loads the project when the page first loads
loadProjects(projects.length, projects);

//loads the more projects from the array currently examined (original or filtered)
loadMoreBtn.addEventListener('click', () => {
  if (currentProjectId > 0) {
    loadProjects(currentProjectId, currentArray);
  } else {
    alert('Woah! You\'ve gone through all my projects! Thanks!\nCome back later for more!');
  }
});

select.addEventListener('change', () => {
  currentArray = languageFilter();

  projectContainer.innerHTML = '';

  loadProjects(currentArray.length, currentArray);
});