import React, { useEffect, useState } from "react";

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import './styles.css';

import mapMarkerImg from "../../assets/images/map-marker.svg";
import Map from '../../components/Map';
import api from '../../services/api'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("/orphanages").then(({ data }) => {
      setOrphanages(data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita </p>
        </header>

        <footer>
          <strong>Ceará</strong>
          <span>Mulungu</span>
        </footer>
      </aside>

      <Map>
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={happyMapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size="20" color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;