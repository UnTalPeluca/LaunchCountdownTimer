let eSeg = document.getElementById('seconds');
let eMin = document.getElementById('minutes');
let eHrs = document.getElementById('hours');
let eDays = document.getElementById('days');
let seg = 41;
let min = 55;
let hrs = 23;
let days = 8;
doOnce()
function doOnce(){
    setInterval(function(){
        timeUpdate();
    }, 1000);
}
function timeUpdate() {
    if (seg == 0){
        seg = 59
        rotation(eSeg, seg, 'seg')
        if(min == 0){
            min = 59
            rotation(eMin, min, 'min')
            if(hrs == 0){
                hrs = 23
                rotation(eHrs ,hrs, 'hrs')
                if(!days == 0){
                    days--
                    rotation(eDays, days, 'days')
                }
            }else{
                hrs--
                rotation(eHrs, hrs, 'hrs')
            }
        }else{
            min--
            rotation(eMin, min, 'min')
        }
    }else{
        seg--
        rotation(eSeg, seg, 'seg')
    }
}
function rotation(elem, elem2, elem3){
    let bg = elem.querySelector('.bg');
    let top = elem.querySelector('.top');
    let bottom = elem.querySelector('.bottom');
    let bottomSlider = elem.querySelector('.bottom-slider');
    let timer = 0;
    function lerp (start, end, alpha){
        return ((1-alpha/100)*start+(alpha/100)*end)*2+"deg"
    }
    let interval = setInterval(function(){
        function minTwoDigits(eaea) {
            return (eaea < 10 ? '0' : '') + eaea;
        }
        bg.textContent = minTwoDigits(elem2);
        if(timer == 100){
            top.style.transform = 'rotate3d(1,0,0,0deg)';
            bottomSlider.style.transform = 'rotate3d(1,0,0,-90deg)';
            let text = "";
            switch (elem3){
                case 'days':
                    text = 08
                    break;
                case 'hrs':
                    text = 23
                    break;
                default:
                    text = 59
                    break;
            }
            bottom.textContent = minTwoDigits(elem2);
            bottomSlider.textContent = (elem2-1 == -1) ? text : minTwoDigits(elem2-1);
            clearInterval(interval);
        } else{
            timer += 1;
            if (timer >= 50){
                top.style.transform = `rotate3d(1,0,0,0deg)`;
                top.style.border = 'none';
                bottomSlider.style.borderBottom = '1px solid rgba(25, 26, 35, 0.5)';
                bottomSlider.style.transform = `rotate3d(1,0,0,${lerp(-90, 0, timer)})`
                top.textContent = minTwoDigits(elem2);
            }   else{
                top.style.transform = `rotate3d(1,0,0,${1.8*timer}deg)`;
                top.style.borderTop = '1px solid rgba(25, 26, 35, 0.5)';
                bottomSlider.style.border = 'none';
                bottomSlider.style.transform = `rotate3d(1,0,0,-90deg)`
            }
        }
    }, 10); 
}