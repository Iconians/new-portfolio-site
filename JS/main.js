const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const parentDiv = document.getElementById('portfolio-card-div')
const modalsDiv = document.getElementById('pop-up-modals')

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]'


const root = document.documentElement;

// theme 
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// portfolio
const filterLink = document.querySelectorAll(dataFilter)
const portfolioItems = document.querySelectorAll(portfolioData)
const searchBox = document.querySelector('#search')

// modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// const portfolioCards = [
//   {
//     dataItem: 'web',
//     dataOpen: 'web-1',
//     img: '/week 8 image assets/portfolio-1.jpg',
//     div: 'Web Development',
//     h3: 'Food Website',

//   }
// ];

// const createPortFolioCards = (portfolioCards) => {
//    const card = portfolioCards.map(({dataItem, dataOpen, img, div, h3}) => {
//     return (`
      
//     <div class="portfolio-card" data-item="${dataItem}" data-open="${dataOpen}">
//     <div class="card-body">
//       <img src="${img}" alt="portfolio icon">
//       <div class="card-popup-box">
//         <div>${div}</div>
//         <h3>${h3}</h3>
//       </div>
//     </div>
//     </div> 
//   `)
//   }).join('')
//   parentDiv.innerHTML = card
// };

// createPortFolioCards(portfolioCards)

// const portfolioModals = [
//   {
//     id: 'web-1',
//     h3: 'Web Project 1',
//     img: '/week 8 image assets/portfolio-1.jpg',
//     p1S: 'My first awesome website',
//     p2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunna aliqua.',
//     p3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
//   }
// ]

// const createPortFolioModals = (portfolioModals) => {
//   const card = portfolioModals.map(({id, h3, img, p1S, p2, p3}) => {
//    return (`
     
//    <div id="${id}" class="modal" data-animation="slideInOutTop">
//       <div class="modal-dialog">
//         <header class="modal-header">
//           <h3>${h3}</h3>
//           <i class="fas fa-times" data-close></i>
//         </header>
//         <div class="modal-body">
//           <div class="img-wrapper">
//             <img src="${img}" alt="" srcset="">
//           </div>
//           <div class="text-wrapper">
//             <p><strong>${p1S}</strong></p>
//             <p>${p2}</p>
//             <p>${p3}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//  `)
//  }).join('')
//  modalsDiv.innerHTML = card
// };

// createPortFolioModals(portfolioModals)



const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active)
  }
  elm.classList.add(active);
}

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark)
  }else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme)
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function () {
   const tab = this.parentElement.parentElement;
   if (!tab.className.includes(open)) {
     tab.classList.add(open);
   }else {
     tab.classList.remove(open)
   }
});

for (const elm of switcher) {
  elm.addEventListener('click', function (){
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn)
    setTheme(toggle);

  })
};

// searchBox.addEventListener('keyup', (e) =>{
//   const searchInput = e.target.value.toLowerCase().trim();
//   portfolioItems.forEach((card) => {
//     if (card.dataset.item.includes(searchInput)) {
//       card.style.display = 'block';
//     }else {
//       card.style.display = 'none';
//     }
//   })
// })

// for (const link of filterLink) {
//   link.addEventListener('click', function() {
//     setActive(link, '.filter-link');
//     const filter = this.dataset.filter; 
//     portfolioItems.forEach((card) => {
//       if (filter === 'all') {
//         card.style.display = 'block';
//       } else if (card.dataset.item === filter) {
//         card.style.display = 'block';
//       }else {
//         card.style.display = 'none';
//       }
//     })
//   })
// };

// Modal/full site modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener('click', function() {
    const modalId = this.dataset.open;
    console.log(modalId)
    document.getElementById(modalId).classList.add(isVisible);
  })
};

for (const elm of closeModal) {
  elm.addEventListener('click', function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  })
};

// Modal
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueesContent = document.querySelector('ul.marquee-content');


root.style.setProperty('--marquee-elms', marqueesContent.children.length);

for (let i = 0; i < elmsDisplayed; i+= 1) {
  marqueesContent.appendChild(marqueesContent.children[i].cloneNode(true));
}