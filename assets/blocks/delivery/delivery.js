(function() {
    if(!$('#map').length) {
        return;
    }
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [59.9386300, 30.3141300],
            zoom: 11
        });

        myPlacemark = new ymaps.Placemark([59.9386300, 30.3141300], {
            hintContent: 'Санкт-Петербург',
            balloonContent: 'Санкт-Петербург'
        }, {
            iconLayout: 'default#image',
            //iconImageHref: 'images/img/balun.png',
            iconImageSize: [30, 41],
            iconImageOffset: [-15, -41]

        });

        myMap.geoObjects.add(myPlacemark);
    }
})();

