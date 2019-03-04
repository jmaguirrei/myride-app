

export default (client, id) => {
  return client.hoc({

    id,

    actions(props, store) {
      return {
        onclick: () => {
        },
      };
    },


    mounted(props, store) {

      window.initMap = () => {
        const mapWrapper = document.getElementById('map-wrapper');
        store.values.mapObject = new window.google.maps.Map(mapWrapper, {
          center: initialLatLon,
          zoom: 16,
          disableDefaultUI: true
        });
        window.navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
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

    render({ props, classes, actions }) {

      return (
        <div id='map-wrapper' class={classes('map')} onclick={actions.onclick}>
        </div>
      );
    }

  });

};

