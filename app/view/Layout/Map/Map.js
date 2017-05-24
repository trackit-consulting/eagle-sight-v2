Ext.define('ES.view.Layout.Map.Map', {
    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.map',
    requires: [
        'Ext.layout.container.Fit'
    ],
    layout: 'fit',
    controller: 'map',
    viewModel: 'map',
    center: new google.maps.LatLng(40.350054, -8.5809265),
    mapOptions: {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        styles: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "hue": "#76aee3"
                    },
                    {
                        "saturation": 38
                    },
                    {
                        "lightness": -11
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                        "hue": "#8dc749"
                    },
                    {
                        "saturation": -47
                    },
                    {
                        "lightness": -17
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [{
                        "hue": "#c6e3a4"
                    },
                    {
                        "saturation": 17
                    },
                    {
                        "lightness": -2
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{
                        "hue": "#cccccc"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 13
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [{
                        "hue": "#5f5855"
                    },
                    {
                        "saturation": 6
                    },
                    {
                        "lightness": -31
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": []
            }
        ]
    },
    dockedItems: [{
        xtype: 'routebar',
        titleAlign: 'center',
        title: 'Route Informations',
        dock: 'bottom'
    }],
    addInfoWindow: function(string, lat, lng) {
        var pos = new google.maps.LatLng(lat, lng);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            position: pos,
            title: 'Info',
            map: this.gmap
        });
        infowindow.setContent(string);
        infowindow.open(this.gmap, marker);
        google.maps.event.addListener(infowindow, 'closeclick', function() {
            marker.setMap(null);
        });
        marker.setVisible(false);
    }
});