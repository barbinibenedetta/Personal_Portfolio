import { projects } from "../Projects/projects.js";

const projectContainer = document.getElementById('project-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentProjectId;

const loadProjects = (num) => {
  for (let i = num - 1; i >= num - 3; i--) {
    let projectName = projects[i].name.replaceAll('_', ' ');
    let imgSrc = `./../Projects/${projects[i].name}/${projects[i].name}_screen.PNG`;

    projectContainer.innerHTML += `
      <div id="row-div" class="row">
        <div class="col image-container">
          <img src="${imgSrc}" alt="${projectName} Preview">
        </div>
        <div class="col-6 description-container d-none d-md-block">
          <h3>${projectName}</h3>
          <p>${projects[i].description}</p>
        </div>
        <div class="col tags-container"></div>
      </div>
      <hr>
    `;

    currentProjectId = i;
  }
}

loadProjects(projects.length);
loadMoreBtn.addEventListener('click', () => {
  if (currentProjectId > 0) {
    loadProjects(currentProjectId);
  } else {
    alert('Woah! You\'ve gone through all my projects! Thanks!\nCome back later for more!');
  }
})