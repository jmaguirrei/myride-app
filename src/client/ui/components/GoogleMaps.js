

export default (client, id) => {

  const initialLatLon = { lat: -33.4, lng: -70.5 };

  return client.hoc({

    id,

    actions(props, store) {
      return {
        onclick: () => {
          window.navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log("latitude, longitude", latitude, longitude);
            console.log(store.get('mapObject'));
          });
        },
      };
    },


    mounted(props, store) {

      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map-wrapper'), {
          center: initialLatLon,
          zoom: 12,
        });
        // store.set({ mapObject: map }, { dynamic: true });
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

