let menu = document.querySelector('.tags');
let X = document.querySelector('header .first span');
let cart = document.querySelector('.cart');
let cartImg = document.querySelector('.cart > img');
let content = document.querySelector('.cart .content');
let main_img = document.querySelector('.main-img');
let img = document.querySelectorAll('.product .imgs .holder');
let imgs = Array.from(img);
let product = document.querySelector('.product');
let container = document.querySelector('.container');
let app = document.querySelector('.app');
// active menu in mobile by click
menu.addEventListener('click', function () {
  menu.classList.add('active');
  X.classList.add('close')
});
// make X button to close menu by click 
X.addEventListener('click', function () {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    X.classList.remove('close')
  }
});

// toggle cart content by click
cartImg.addEventListener('click', function () {
  cart.classList.toggle('open');
});
// default image
main_img.innerHTML = imgs[0].innerHTML;
// change the main image
imgs.forEach((image) => {
  // change main-img by clicking on any img
  image.addEventListener('click', (e) => {
    imgs.forEach(ele => {
      ele.classList.remove('active')
    });
    e.currentTarget.classList.add('active');
    main_img.innerHTML = e.currentTarget.innerHTML;
  })
})
// make lightBox by clicking on main-image
main_img.addEventListener('click', function lightBox() {
  app.classList.add('disabled');
  let product2 = document.createElement('div');
  product2.classList.add('product', 'light-box');
  let main_img2 = document.createElement('div');
  main_img2.classList.add('main-img');

  imagesHolder(main_img2);

  product2.appendChild(main_img2);
  let imgs2 = document.createElement('div');
  imgs2.classList.add('imgs', 'd-flex', 'align-items-center');
  product2.appendChild(imgs2);
  let imgs2Array = [];
  for (let i = 1; i <= imgs.length; i++) {
    let holders2 = document.createElement('div');
    if (i === 1) {
      holders2.classList.add('holder', 'active')
    } else {
      holders2.classList.add('holder');
    }
    holders2.innerHTML =
      `<img src="imgs/image-product-${i}.jpg" alt="">`;
    imgs2.appendChild(holders2);
    // make array from images
    imgs2Array.push(holders2);

  }
  buttons(main_img2, product2);
  // change the main image
  imgs2Array.forEach((image, main_imgs) => {
    // change main-img2 by clicking on any img for light box
    image.addEventListener('click', (e) => {
      imgs2Array.forEach(ele => {
        ele.classList.remove('active');
      });
      for (let i = 0; i < main_imgs + 1; i++) {
        removeActive(main_img2);
        main_img2.firstChild.children[i].classList.add('active');
      }
      e.currentTarget.classList.add('active');
    });
  });
  // buttons(main_img2, product2);
  app.appendChild(product2);
});





function buttons(main_img2, product2) {
  let after = document.createElement('span');
  after.classList.add('after');
  after.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  let before = document.createElement('span');
  before.classList.add('before');
  before.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  main_img2.appendChild(after);
  main_img2.appendChild(before);
  let close_box = document.createElement('span');
  close_box.classList.add('close');
  close_box.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  main_img2.appendChild(close_box);
  // close light box by click on close button
  close_box.addEventListener('click', function () {
    app.removeChild(product2);
    app.classList.remove('disabled');
  });
  navBar(after, before, main_img2)
}


// images for light box
function imagesHolder(main_img2) {
  let main_holder = document.createElement('div');
  main_holder.classList.add('main-holder');
  let main_arr = [];
  for (let i = 1; i <= imgs.length; i++) {
    let main_imgs = document.createElement('img');
    main_imgs.setAttribute('src', `imgs/image-product-${i}.jpg`);
    main_imgs.setAttribute('data-id', `${i - 1}`);
    if (i === 1) {
      main_imgs.classList.add('active')
    }
    main_holder.appendChild(main_imgs);
    // make array from images
    main_arr.push(main_imgs);
  }
  main_img2.appendChild(main_holder);

}
// make navbar in light box

function navBar(after, before, main_img2) {
  let imagesArr = Array.from(main_img2.firstChild.children);
  let slideIndex = 1;
  check(imagesArr, after, before, slideIndex, main_img2)
  after.addEventListener('click', function () {
    removeActive(main_img2);
    slideIndex += 1;
    check(imagesArr, after, before, slideIndex, main_img2)
  });
  before.addEventListener('click', function () {
    removeActive(main_img2);
    slideIndex -= 1;
    check(imagesArr, after, before, slideIndex, main_img2)
  });

}
function removeActive(main_img2) {
  let arr = Array.from(main_img2.firstChild.children);
  arr.forEach((e) => {
    e.classList.remove('active');
  })
}
function check(imagesArr, after, before, slideIndex, main_img2) {
  removeActive(main_img2);
  imagesArr[slideIndex - 1].classList.add('active');
  if (slideIndex == 1) {
    before.classList.add('disable');
  } else {
    before.classList.remove('disable');

  } if (slideIndex == 4) {
    after.classList.add('disable');
  } else {
    after.classList.remove('disable');
  }

}
// start cart 
let minus = document.querySelector('.amount .minus');
let plus = document.querySelector('.amount .plus');
let number = document.querySelector('.amount .number');
let add = document.querySelector('.buying .add');
let count = document.querySelector('.cart .count');
count.innerHTML = 0;

let save = 0
if (number.innerHTML == 0) {
  minus.classList.add('disabled');
} else {
  minus.classList.remove('disabled');
}
plus.addEventListener('click', function () {
  save += 1;
  number.innerHTML = save;
  if (number.innerHTML == 0) {
    minus.classList.add('disabled');
  } else {
    minus.classList.remove('disabled');
  }
});
minus.addEventListener('click', function () {
  save -= 1;
  number.innerHTML = save;
  if (number.innerHTML == 0) {
    minus.classList.add('disabled');
  } else {
    minus.classList.remove('disabled');
  }
});
let saving = [];
if (localStorage.getItem("data")) {
  saving = JSON.parse(localStorage.getItem("data"));
}
// add sneaker to  local storage 
add.addEventListener('click', saveData);
add.addEventListener('click', getData);





// add sneaker to  local storage 
function saveData() {
  let num = number.innerHTML;
  if (num != 0) {
    saving.push(num)
    localStorage.setItem('data', JSON.stringify(saving));
  } else { }
  save = 0;
  num = 0;
  number.innerHTML = 0;
  if (number.innerHTML == 0) {
    minus.classList.add('disabled');
  } else {
    minus.classList.remove('disabled');
  }
}

function sneaker() {
  let sneakers = document.createElement('div');
  sneakers.classList.add('sneaker');
  let sneaker_img = document.createElement('img');
  sneaker_img.setAttribute('src', 'imgs/image-product-1-thumbnail.jpg');
  let s_price = document.createElement('div');
  s_price.classList.add('s-price');
  let s_priceP = document.createElement('p');
  s_priceP.innerHTML = 'Fall Limited Edition Sneakers';
  let price = document.createElement('div');
  price.classList.add('price');
  price.textContent = ' $125.00 x ';
  let priceAmount = document.createElement('div');
  priceAmount.classList.add('amount');
  let priceTotal = document.createElement('div');
  priceTotal.classList.add('total');
  for (let i = 0; i < saving.length; i++) {
    priceAmount.innerHTML = `${saving[i]}`
    priceTotal.innerHTML = `$${saving[i] * 125}`

  }
  let priceDelete = document.createElement('div');
  priceDelete.classList.add('delete');
  priceDelete.innerHTML = '<img src="imgs/icon-delete.svg" alt="">';
  content.appendChild(sneakers);
  sneakers.appendChild(sneaker_img);
  sneakers.appendChild(s_price);
  s_price.appendChild(s_priceP);
  s_price.appendChild(price);
  price.appendChild(priceAmount);
  price.appendChild(priceTotal);
  price.appendChild(priceDelete);
  priceDelete.addEventListener('click', function () {
    sneakers.remove();
  })
};
let counting = 0;

function getData() {
  if (document.querySelector('.content .checkout')) {
    document.querySelector('.content .checkout').remove();
  }
  counting += 1;
  count.innerHTML = counting;
  let data = localStorage.getItem('data', saving);
  if (data) {
    let nums = JSON.parse(data)
    saveData(saving)
    sneaker(data);
    checkOut();
    empty.remove()
  }
}







function checkOut() {
  let check = document.createElement('div');
  check.classList.add('checkout');
  check.innerHTML = 'Checkout';
  content.appendChild(check);
};


let empty = document.createElement('div');
empty.classList.add('message-empty');
empty.innerHTML = 'Your Cart is empty';
if (count.innerHTML == 0) {
  if (document.querySelector('.content .checkout')) {
    document.querySelector('.content .checkout').remove();
  }
  content.appendChild(empty);
}

