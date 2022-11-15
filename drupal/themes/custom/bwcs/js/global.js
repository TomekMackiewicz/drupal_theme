/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bwcs = {
    attach: function (context, settings) {

    }
  };

  $(document).ready(function() {
    $('body').addClass('loaded');
    prepareMenu();
    //searchForm();
    initCarousel();
    initCamera();
  });

})(jQuery, Drupal);


function prepareMenu() {
  var menu = document.getElementById('block-mainnavigation');
  var $menu = jQuery(menu);
  var li = $menu.find('li');

  li.mouseenter(function() {
    var childrenMenu = jQuery(this).children('ul:not(#dynamic-search-form-wraper):not(.contextual-links)');
    var flag = false;
    jQuery(this).addClass('hovered');
    var parent = this.parentElement.parentElement.tagName;
    
    if (parent == 'LI' || parent == 'li') {
        flag = true;
    }
    
    if (childrenMenu.length > 0 && !flag) {
      childrenMenu.show();
    } else if (childrenMenu.length > 0 && flag) {
        
        childrenMenu.show(0);
        var left_off = childrenMenu.offset().left;
        // jesli menu bedzie wystawac (chowac sie) poza lewa krawedz to wyswietla je po lewej stronie
        if(left_off + childrenMenu.width() >= jQuery(window).width()) {
            childrenMenu.css({
                'left' : '-100%',
                'top' : '0px',
                'border-left-color' : '#ffffff',
                'border-left-width' : '1px',
                'border-left-style' : 'solid'
            });
        } else {
            childrenMenu.css({
                'left' : '100%',
                'top' : '0px',
                'border-left-color' : '#ffffff',
                'border-left-width' : '1px',
                'border-left-style' : 'solid'
            });                    
        }
    }
  });

  li.mouseleave(function() {
    var childrenMenu = jQuery(this).find('ul:not(#dynamic-search-form-wraper):not(.contextual-links)');
    
    jQuery(this).removeClass('hovered');
    
    if (childrenMenu.length > 0) {
      childrenMenu.hide();
    }
  });
};

// function searchForm() {
//   var menu    = document.getElementById('navigation');
//   var $menu   = jQuery(menu);
  
//   var formularz    = document.getElementById('search-block-form');
//   var $formularz   = jQuery(formularz);
//   var clonedForm   = $formularz.clone(true);
//   clonedForm.css('display', 'block');
  
//   var ulElement    = document.createElement('ul');
//       ulElement.id = 'dynamic-search-form-wraper';
//   var liElement    = document.createElement('li');
//   var $liElement   = jQuery(liElement);
  
//   $liElement.append(clonedForm);
  
//   ulElement.appendChild($liElement[0]);
  
//   var szukaj  = document.getElementById('edit-submit'); //$menu.find('a[title="szukaj"]');
//   var $szukaj = jQuery(szukaj);
//   var parentSzukaj = szukaj.parent();

//   parentSzukaj.append(ulElement);
  
//   $szukaj.click(function(e) {
//       e.preventDefault();
//       ulElement.classList.toggle('show-form');
//   });

// }

function initCarousel() {
  let items = document.querySelectorAll('.carousel .carousel-item')
  items.forEach((el) => {
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.children[0])
          next = next.nextElementSibling
      }
  })
}

function initCamera() {
  if (jQuery('.slider').length) {
    jQuery('.slider').camera();
  }
}