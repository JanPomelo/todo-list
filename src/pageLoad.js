'use strict';

const loadHeaderMainHeading = () => {
  const heading = document.createElement('h1');
  heading.innerText = 'Mini-Do';
  heading.classList = ['text-white text-4xl'];
  return heading;
};

const loadHeaderSubHeading = () => {
  const subHeading = document.createElement('h2');
  subHeading.innerText = 'The minimalistic To-Do-List.';
  subHeading.classList = ['text-white text-xl mb-1'];
  return subHeading;
};

const loadHeader = () => {
  // create Header Element
  const header = document.createElement('header');
  // add styling to header
  header.classList = ['bg-black flex flex-col justify-center items-center'];
  // add headerContent to HeaderElement
  header.appendChild(loadHeaderMainHeading());
  header.appendChild(loadHeaderSubHeading());
  return header;
};

const loadMain = () => {
  const main = document.createElement('main');
  return main;
};

const loadFooter = () => {
  const footer = document.createElement('footer');
  return footer;
};

const loadPage = () => {
  const content = document.createElement('div');
  content.id = 'content';
  content.appendChild(loadHeader());
  content.appendChild(loadMain());
  content.appendChild(loadFooter());
  return content;
};
export {loadPage};
