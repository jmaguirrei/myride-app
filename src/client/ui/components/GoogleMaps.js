

export default (client, id) => {

  const initialLatLon = { lat: -33.4, lng: -70.5 };

  return client.hoc({

    id,

    mounted(props, store) {

      window.initMap = () => {
        const mapWrapper = document.getElementById('map-wrapper');
        store.values.mapObject = new window.google.maps.Map(mapWrapper, {
          center: initialLatLon,
          zoom: 16,
          disableDefaultUI: true,
          clickableIcons: false,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [ { visibility: 'off' } ],
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [ { visibility: 'off' } ],
            },
          ],
        });

        window.navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          store.set({
            'currentDevicePosition.lat': latitude,
            'currentDevicePosition.lng': longitude,
          });
          store.values.mapObject.setCenter({ lat: latitude, lng: longitude });
        });
      };

      const url = `https://maps.googleapis.com/maps/api/js?key=${props.key}&callback=initMap`;
      client.createScript('googlemaps-script', url);

    },

    classes: {
      map: `
        height: 100vh;
      `,
    },

    render({ classes, actions }) {

      return (
        <div id='map-wrapper' class={classes('map')} data-skip-morph>
        </div>
      );
    }

  });

};

