"use strict";function mudaFonte(o){fontController.map(function(t){var e=parseFloat(window.getComputedStyle(t,null).getPropertyValue("font-size"));"+"==o&&e<20?t.style.fontSize=e+1+"px":"-"==o&&e>8?t.style.fontSize=e-1+"px":"-"!=o&&"+"!=o?console.warn("Você precisa passar - ou +"):console.warn("Limite do tamanho da fonte alcançado")})}var fontController=void 0;document.addEventListener("DOMContentLoaded",function(){fontController=Array.from(document.querySelectorAll(".font-regulator"))});