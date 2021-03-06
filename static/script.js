var now = new Date();

$('.n-calendar').append(Calendar.generate({
    start: {
        month: now.getMonth() - 1,
        year: now.getFullYear()
    },
    end: {
        month: now.getMonth() + 5,
        year: now.getFullYear()
    },
    classes: 'cf',
    type: 'list',
    monthlabels: true,
    nogaps: true
}));

var O = {};

O.calendarSlider = function() {
    var cont = $('#n-calendar'),
        calendar = cont.find('.calendar-list'),
        control = cont.find('.controls'),
        slider = control.find('.slider'),
        labels = calendar.find('li > strong'),
        l_height = labels.eq(0).height();
        
    var s_height = slider.height(),
        max = control.height() - s_height,
        max_calend = calendar.height() - cont.height(),
        offset = control.offset().top,
        q = max_calend / max,
        mouse_spd = 20;

    var checkPosition = function(pos) {
        return Math.min(Math.max(pos, 0), max);
    };
    
    var stickyLabels = function(top) {
        $.each(labels, function(key, el) {
            el.style.marginBottom = Math.min(el.parentNode.offsetTop + top - l_height, 0) + 'px';
        });
    };
    
    stickyLabels(0);
        
    slider.draggable({
        addClasses: false,
        axis: 'y',
        containment: 'parent'
    });
    
    slider.bind('drag', function (e, ui) {
        var top = -(slider[0].offsetTop * q);

        calendar.css({top: top});
        stickyLabels(top);
    });
    
    control.bind('click', function(e) {
        var m = checkPosition(e.pageY - offset - (s_height / 2));

        slider.animate({top: m}, {duration: 200, queue: false});
        calendar.animate({top: -m * q}, {duration: 200, queue: false, step: function(top) {
            stickyLabels(top);
        }});
        
    });
    
    cont.bind('mousewheel', function(e, d) {
        e.preventDefault();
        var m = checkPosition((d > 0) ? (slider[0].offsetTop - mouse_spd) : (slider[0].offsetTop + mouse_spd));

        slider.css({top: m}).trigger('drag');
    });
};


O.calendarSlider();