require(['jquery', 'nouislider'], function ($, noUiSlider) {
    "use strict";
      $(function () {
        var slider = document.getElementById('slider');
        var start_val = document.getElementById('start_val');
        var end_val = document.getElementById('end_val');
        var inputs = [start_val, end_val];
        var sliderDS = document.querySelector('#slider');
        var max = Number(sliderDS.dataset.max);
        var step = Number(sliderDS.dataset.step);

        noUiSlider.create(slider, {
          start: [ 0, max ],
          connect: true,          
          range: {
            'min': 0,
            '1%': [0, step],
            'max': max
          }
        });
        slider.noUiSlider.on('update', function( values, handle ) {
          inputs[handle].value = Math.round(values[handle]);
        });
        function setSliderHandle(i, value) {
          var r = [null,null];
          r[i] = value;
          slider.noUiSlider.set(r);
        }
        
        // Listen to keydown events on the input field.
        inputs.forEach(function(input, handle) {
        
          input.addEventListener('change', function(){
            setSliderHandle(handle, this.value);
          });
        
          input.addEventListener('keydown', function( e ) {        
            var values = slider.noUiSlider.get();
            var value = Number(values[handle]);
            var steps = slider.noUiSlider.steps();
            var step = steps[handle];        
            var position;

            switch ( e.which ) {        
              case 13:
                setSliderHandle(handle, this.value);
                break;        
              case 38:
                position = step[1];
                if ( position === false ) {
                  position = 1;
                }
                if ( position !== null ) {
                  setSliderHandle(handle, value + position);
                }        
                break;        
              case 40:        
                position = step[0];        
                if ( position === false ) {
                  position = 1;
                }        
                if ( position !== null ) {
                  setSliderHandle(handle, value - position);
                }        
                break;
            }
          });
        });
      });
    });
