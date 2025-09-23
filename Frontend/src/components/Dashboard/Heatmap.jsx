import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Kerala coordinates (approximate center)
const KERALA_CENTER = [10.8505, 76.2711];
const KERALA_BOUNDS = [
  [8.0, 74.0], // Southwest coordinates
  [13.0, 78.0]  // Northeast coordinates
];

const Heatmap = () => {
  const [healthCenters, setHealthCenters] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Mock health center data for Kerala districts
    const mockData = [
      {
        id: 1,
        name: 'Thiruvananthapuram Medical College',
        district: 'Thiruvananthapuram',
        lat: 8.5241,
        lng: 76.9366,
        cases: 125,
        capacity: 200,
        type: 'Major Hospital'
      },
      {
        id: 2,
        name: 'Kottayam Medical College',
        district: 'Kottayam',
        lat: 9.5916,
        lng: 76.5222,
        cases: 89,
        capacity: 150,
        type: 'Medical College'
      },
      {
        id: 3,
        name: 'Kozhikode Medical College',
        district: 'Kozhikode',
        lat: 11.2588,
        lng: 75.7804,
        cases: 156,
        capacity: 180,
        type: 'Medical College'
      },
      {
        id: 4,
        name: 'Ernakulam General Hospital',
        district: 'Ernakulam',
        lat: 9.9816,
        lng: 76.2999,
        cases: 78,
        capacity: 120,
        type: 'General Hospital'
      },
      {
        id: 5,
        name: 'Kannur District Hospital',
        district: 'Kannur',
        lat: 11.8745,
        lng: 75.3704,
        cases: 45,
        capacity: 100,
        type: 'District Hospital'
      },
      {
        id: 6,
        name: 'Palakkad District Hospital',
        district: 'Palakkad',
        lat: 10.7867,
        lng: 76.6548,
        cases: 67,
        capacity: 90,
        type: 'District Hospital'
      }
    ];
    setHealthCenters(mockData);
  }, []);

  const getIntensity = (cases, capacity) => {
    const ratio = cases / capacity;
    if (ratio >= 0.8) return { color: '#ff4444', intensity: 0.8 };
    if (ratio >= 0.6) return { color: '#ff8844', intensity: 0.6 };
    if (ratio >= 0.4) return { color: '#ffaa44', intensity: 0.4 };
    return { color: '#44aa88', intensity: 0.2 };
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={KERALA_CENTER}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        maxBounds={KERALA_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {healthCenters.map((center) => {
          const { color, intensity } = getIntensity(center.cases, center.capacity);
          return (
            <CircleMarker
              key={center.id}
              center={[center.lat, center.lng]}
              radius={15 + (center.cases / 10)}
              fillColor={color}
              color={color}
              weight={2}
              opacity={0.8}
              fillOpacity={intensity}
            >
              <Popup>
                <div>
                  <h6>{center.name}</h6>
                  <p><strong>District:</strong> {center.district}</p>
                  <p><strong>Type:</strong> {center.type}</p>
                  <p><strong>Active Cases:</strong> {center.cases}</p>
                  <p><strong>Capacity:</strong> {center.capacity}</p>
                  <p><strong>Utilization:</strong> {Math.round((center.cases / center.capacity) * 100)}%</p>
                </div>
              </Popup>
              <Tooltip>
                <div>
                  <strong>{center.name}</strong><br />
                  Cases: {center.cases}<br />
                  Utilization: {Math.round((center.cases / center.capacity) * 100)}%
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Heatmap;
